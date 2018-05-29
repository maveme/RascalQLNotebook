define([], function () {
	return {
		onload: function () {
			console.log("QL Language");
			QLrt = {};

			//From the util.js file 
			/**
	 		* Convenience function wrapping $('<... class="...">).
	 		*/
			QLrt.mk = function (tagName, className) {
				var elt = $('<' + tagName + '></' + tagName + '>');
				if (className !== undefined) {
					elt.addClass(className);
				}
				return elt;
			};

			/**
			 * Base type for children.
			 */
			QLrt.Child = function () {

				var parent = null;

				this.setParent = function (parent_) {
					if (parent !== null) {
						throw 'parent cannot be re-set';
					}
					parent = parent_;
				};

				this.appendTo = function (parent_) {
					this.setParent(parent_);
					if (parent.append !== undefined) {
						parent.append(this);
					}
					return this;	// for chaining
				};

				this.signalChange = function () {
					parent.signalChange();
				};

			};


			/**
			 * A class for lazily-evaluated expressions, by default taking care of the
			 * undefined-logic.
			 */
			QLrt.LazyValue = function (dependentValues, expression, funky) {

				this.evaluate = function () {
					var values = dependentValues();
					if (funky) {
						var args = _.map(values, function (wrappedValue) { return (wrappedValue.defined() ? wrappedValue.value() : undefined); });
						return expression.apply(undefined, args);
					}
					if (!_.all(values, function (wrappedValue) { return wrappedValue.defined(); })) {
						return undefined;
					}
					return expression.apply(undefined, _.map(values, function (wrappedValue) { return wrappedValue.value(); }));
				};

			};

			//From the structural-widgets.js file

			/*
			 * Widgets that take care of structure (but not of values).
			 */

			/**
			 * A widget
			 */
			QLrt.FormWidget = function (settings) {

				if (typeof (settings) !== 'object'
					|| settings.name === undefined
					|| settings.submitCallback === undefined
				) {
					throw 'invalid or incomplete settings';
				}

				var outerContainer = QLrt.mk('div', 'formcontainer').hide().append(QLrt.mk('h2').text('Form: ' + settings.name));
				var innerContainer = QLrt.mk('div', 'form').appendTo(outerContainer);
				var submitButton = QLrt.mk('button').prop('disabled', true).append('Submit').appendTo(outerContainer).click(function () {
					settings.submitCallback(asJSON());
				});

				this.domElement = function () {
					return outerContainer;
				};

				var children = [];

				this.append = function (widget) {
					children.push(widget);
					innerContainer.append(widget.domElement());
				};

				var propagatingUpdateLatch = false;

				this.signalChange = function () {
					if (propagatingUpdateLatch) return;

					propagatingUpdateLatch = true;
					_.each(children, function (subWidget) {
						subWidget.update();
					});
					propagatingUpdateLatch = false;

					submitButton.prop('disabled', !complete());
				};

				this.activate = function () {
					this.signalChange();			// initial setting of correct visualization
					outerContainer.show();
				};

				function complete() {
					return _.all(children, function (subWidget) {
						return subWidget.defined();
					});
				}

				function asJSON() {
					var result = {};

					_.each(children, function (subWidget) {
						_.extend(result, subWidget.asJSON());
					});

					return result;
				}

			};


			QLrt.ConditionalGroupWidget = function (lazyValue) {

				QLrt.Child.call(this);

				var container = QLrt.mk('div', 'group');

				this.domElement = function () {
					return container;
				};

				var children = [];

				this.append = function (widget) {
					children.push(widget);
					container.append(widget.domElement());
				};

				this.defined = function () {
					return !lazyValue.evaluate() || _.all(children, function (subWidget) {
						return subWidget.defined();
					});
				};

				this.update = function () {
					var value = lazyValue.evaluate();
					container.toggle(!!value);
					if (value) {
						_.each(children, function (subWidget) {
							subWidget.update();
						});
					}
				};

				this.asJSON = function () {
					var result = {};

					if (!!lazyValue.evaluate()) {
						_.each(children, function (subWidget) {
							_.extend(result, subWidget.asJSON());
						});
					}

					return result;
				};

			};
			QLrt.ConditionalGroupWidget.prototype = Object.create(QLrt.Child.prototype);


			QLrt.SimpleFormElementWidget = function (settings) {

				QLrt.Child.call(this);

				if (typeof (settings) !== 'object'
					|| settings.label === undefined
					|| settings.valueWidget === undefined) {
					throw 'invalid or incomplete settings';
				}

				if (settings.valueWidget instanceof QLrt.Child) {
					settings.valueWidget.appendTo(this);
				}

				var outerContainer = QLrt.mk('div', 'simpleFormElement');
				var usesRadioButtons = settings.valueWidget instanceof QLrt.BooleanValueWidget;
				QLrt.mk(usesRadioButtons ? 'span' : 'label').appendTo(outerContainer).append(settings.label).append(settings.valueWidget.domElement());

				this.domElement = function () {
					return outerContainer;
				};

				this.value = function () {
					return settings.valueWidget.value();
				};

				this.setValue = function (val) {
					return settings.valueWidget.setValue(val);
				};

				this.defined = function () {
					return settings.valueWidget.defined();
				};

				this.update = function () {
					settings.valueWidget.update();
				};

				this.asJSON = function () {
					var result = {};

					if (!settings.valueWidget.computed) {
						result[settings.name] = this.value();
					}

					return result;
				};

			};
			QLrt.SimpleFormElementWidget.prototype = Object.create(QLrt.Child.prototype);

			QLrt.ConditionalFormElementWidget = function (settings) {

				QLrt.Child.call(this);

				if (typeof (settings) !== 'object'
					|| settings.label === undefined
					|| settings.valueWidget === undefined
					|| typeof (settings.lazyValue) !== 'object') {
					throw 'invalid or incomplete settings';
				}

				if (settings.valueWidget instanceof QLrt.Child) {
					settings.valueWidget.appendTo(this);
				}

				var outerContainer = QLrt.mk('div', 'conditionalFormElement');
				QLrt.mk('label').appendTo(outerContainer).append(settings.label).append(settings.valueWidget.domElement());

				this.domElement = function () {
					return outerContainer;
				};

				this.value = function () {
					return settings.valueWidget.value();
				};

				this.setValue = function (val) {
					return settings.valueWidget.setValue(val);
				};

				this.defined = function () {
					return settings.valueWidget.defined();
				};

				this.update = function () {
					var value = settings.lazyValue.evaluate();
					outerContainer.toggle(!!value);
					if (value) {
						settings.valueWidget.update();
					}
				};

				this.asJSON = function () {
					var result = {};

					if (!settings.valueWidget.computed) {
						result[settings.name] = this.value();
					}

					return result;
				};

			};
			QLrt.ConditionalFormElementWidget.prototype = Object.create(QLrt.Child.prototype);

			/** Section widget, contributed by Enrico Persiani (Whole Platform). */
			QLrt.SectionWidget = function (settings) {

				QLrt.Child.call(this);

				if (typeof (settings) !== 'object' || settings.label === undefined) {
					throw 'invalid or incomplete settings';
				}

				var container = QLrt.mk('section').append(QLrt.mk('h1').text(settings.label));

				this.domElement = function () {
					return container;
				};

				var children = [];

				this.append = function (widget) {
					children.push(widget);
					container.append(widget.domElement());
				};

				this.update = function () {
					_.each(children, function (subWidget) {
						subWidget.update();
					});
				};

				this.defined = function () {
					return _.all(children, function (subWidget) {
						return subWidget.defined();
					});
				};

				this.asJSON = function () {
					var result = {};
					_.each(children, function (subWidget) {
						_.extend(result, subWidget.asJSON());
					});
					return result;
				};

			};
			QLrt.SectionWidget.prototype = Object.create(QLrt.Child.prototype);

			/** Text widget, contributed by Enrico Persiani (Whole Platform). */
			QLrt.TextWidget = function (settings) {

				QLrt.Child.call(this);

				if (typeof (settings) !== 'object' || settings.text === undefined) {
					throw 'invalid or incomplete settings';
				}

				var container = QLrt.mk('p').text(settings.text);

				this.domElement = function () {
					return container;
				};

				this.update = function () { };

				this.defined = function () { };

				this.asJSON = function () {
					var result = {};
					return result;
				};

			};
			QLrt.TextWidget.prototype = Object.create(QLrt.Child.prototype);

			//From the value-widgets.js file
			/*
			 * Implementations of ValueWidgets, i.e. widgets which holds and visualize a value.
			 */

			QLrt.BaseValueWidget = function (lazyValue) {

				QLrt.Child.call(this);

				this.createElement = function () {
					throw 'createElement not implemented';
				};

				this.computed = (lazyValue !== undefined);

				var elt = null;

				this.domElement = function () {
					if (elt === null) {
						elt = this.createElement(this.signalChange).prop('disabled', this.computed).change(this.signalChange);
						// this.signalChange is passed as a callback in case the element created doesn't support .change(..)
					}
					return elt;
				};

				this.value = function () {
					return (this.defined() ? this.valueInternal() : undefined);
				};

				this.defined = function () {
					return this.computed || this.definedInternal();
				};

				this.update = function () {
					if (this.computed) {
						this.setValue(lazyValue.evaluate());
					}
				};

				this.setValue = function (val) {
					throw 'setValue not implemented';
				};

				this.valueInternal = function () {
					throw 'valueInternal not implemented';
				};

				this.definedInternal = function () {
					throw 'definedInternal not implemented';
				};

			};
			QLrt.BaseValueWidget.prototype = Object.create(QLrt.Child.prototype);


			QLrt.uniqueId = 0;

			QLrt.BooleanValueWidget = function (lazyValue) {

				QLrt.BaseValueWidget.call(this, lazyValue);

				var selectTrue = null, selectFalse = null;

				this.createElement = function () {
					var span = QLrt.mk('span');
					var currentUniqueId = QLrt.uniqueId++;
					var groupId = 'boolean-widget-uid-' + currentUniqueId;
					selectTrue = mkRadio(groupId, 'true');
					selectFalse = mkRadio(groupId, 'false');
					span.append(selectTrue, mkLabel('true', groupId + '_true'), selectFalse, mkLabel('false', groupId + '_false'));
					return span;
				};

				function mkRadio(groupId, val) {
					return QLrt.mk('input').attr('type', 'radio').attr('name', groupId).attr('id', groupId + '_' + val);
				}

				function mkLabel(labelText, id) {
					return QLrt.mk('label').append(labelText).attr('for', id);
				}

				this.setValue = function (val) {
					selectTrue.prop('checked', val);
					selectFalse.prop('checked', !val);
				};

				this.valueInternal = function () {
					return selectTrue.prop('checked');
				};

				this.definedInternal = function () {
					return selectTrue.prop('checked') || selectFalse.prop('checked');
				};

			};
			QLrt.BooleanValueWidget.prototype = Object.create(QLrt.BaseValueWidget.prototype);


			QLrt.MoneyValueWidget = function (lazyValue) {

				QLrt.BaseValueWidget.call(this, lazyValue);

				this.createElement = function () {
					return QLrt.mk('input').attr('type', 'text').autoNumeric('init');
				};

				this.setValue = function (val) {
					this.domElement().autoNumeric('set', (val === undefined ? '' : val));
				};

				this.valueInternal = function (val) {
					return this.domElement().autoNumeric('get');
				};

				this.definedInternal = function () {
					return (this.valueInternal() !== '');
				};

			};
			QLrt.MoneyValueWidget.prototype = Object.create(QLrt.BaseValueWidget.prototype);


			QLrt.StringValueWidget = function (lazyValue) {

				QLrt.BaseValueWidget.call(this, lazyValue);

				this.createElement = function () {
					return QLrt.mk('input').attr('type', 'text');
				};

				this.setValue = function (val) {
					this.domElement().val(val);
				};

				this.valueInternal = function () {
					return this.domElement().val();
				};

				this.definedInternal = function () {
					return (this.valueInternal() !== '');
				};

			};
			QLrt.StringValueWidget.prototype = Object.create(QLrt.BaseValueWidget.prototype);


			QLrt.EnumValueWidget = function (enumeration, lazyValue) {

				QLrt.BaseValueWidget.call(this, lazyValue);

				var optionElements = {};

				this.createElement = function () {
					var select = QLrt.mk('select', 'enum-widget');

					QLrt.mk('option').append("Make a choice").appendTo(select);

					_.each(enumeration, function (literal) {
						var option = QLrt.mk('option').append(literal).appendTo(select);
						optionElements[literal] = option;
					});

					return select;
				};

				this.setValue = function (val) {
					_.each(optionElements, function (option, literal) {
						option.prop('selected', val === literal);
					});
				};

				this.valueInternal = function () {
					var result = undefined;
					_.each(optionElements, function (option, literal) {
						if (option.prop('selected')) {
							result = literal;
						}
					});
					return result;
				};

				this.definedInternal = function () {
					return (this.valueInternal() !== undefined);
				};

			};
			QLrt.EnumValueWidget.prototype = Object.create(QLrt.BaseValueWidget.prototype);


			QLrt.DateValueWidget = function (lazyValue) {

				QLrt.BaseValueWidget.call(this, lazyValue);

				this.createElement = function () {
					return QLrt.mk('input').attr('type', 'text').datepicker();
				};

				this.setValue = function (val) {
					this.domElement().val(val);
				};

				this.valueInternal = function (val) {
					return this.domElement().val();
				};

				this.definedInternal = function () {
					return (this.valueInternal() !== '');
				};

			};
			QLrt.DateValueWidget.prototype = Object.create(QLrt.BaseValueWidget.prototype);


			QLrt.IntegerValueWidget = function (lazyValue) {

				QLrt.BaseValueWidget.call(this, lazyValue);

				this.createElement = function () {
					return QLrt.mk('input').attr('type', 'number').keypress(checkCharacter);
				};

				var regex = /[0-9]/;

				function checkCharacter(event) {
					var key = String.fromCharCode(event.keyCode);
					if (!regex.test(key)) {
						event.preventDefault();
					}
				}

				this.setValue = function (val) {
					this.domElement().val(val);
				};

				this.valueInternal = function () {
					return this.domElement().val();
				};

				this.definedInternal = function () {
					return (this.valueInternal() !== '');
				};

			};
			QLrt.IntegerValueWidget.prototype = Object.create(QLrt.BaseValueWidget.prototype);


			QLrt.DecimalValueWidget = function (lazyValue) {

				QLrt.BaseValueWidget.call(this, lazyValue);

				this.createElement = function () {
					return QLrt.mk('input').attr('type', 'number').keypress(checkCharacter);
				};

				var regex = /[0-9]|\./;
				var self = this;

				function checkCharacter(event) {
					var key = String.fromCharCode(event.keyCode);
					if (key === '.') {
						var val = self.valueInternal();
						if (val === '') {
							self.setValue('0');
						} else {
							if (!regex.test(key) || (key === '.' && val.indexOf('.') > -1)) {
								event.preventDefault();
							}
						}
					}
				}

				this.setValue = function (val) {
					this.domElement().val(val);
				};

				this.valueInternal = function () {
					return this.domElement().val();
				};

				this.definedInternal = function () {
					return (this.valueInternal() !== '');
				};

			};
			QLrt.DecimalValueWidget.prototype = Object.create(QLrt.BaseValueWidget.prototype);


			QLrt.RangeValueWidget = function (settings, lazyValue) {

				QLrt.BaseValueWidget.call(this, lazyValue);

				var self = this;
				this.createElement = function (changeCallback) {
					var sliderSettings = {
						min: settings.min,
						max: settings.max,
						slide: function (event, ui) {
							changeCallback.call(self);
						}
					};
					if (settings.step !== undefined) {
						sliderSettings.step = settings.step;
					} else {
						if (settings.type === 'integer') {
							sliderSettings.step = 1;
						}
					}
					return QLrt.mk('div').slider(sliderSettings);
				};

				this.setValue = function (val) {
					this.domElement().slider("value", val);
				};

				this.valueInternal = function () {
					return this.domElement().slider("value");
				};

				this.definedInternal = function () {
					return true;
				};

			};
			QLrt.RangeValueWidget.prototype = Object.create(QLrt.BaseValueWidget.prototype);




		}
	};
});
