$(document).ready(function () {
  var form = new QLrt.FormWidget({ name: "taxOfficeExample", submitCallback: persist});
  
  var q$1 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return true; }
  )).appendTo(form);
  var hasBoughtHouse = new QLrt.SimpleFormElementWidget({
    name: "hasBoughtHouse", 
    label: "Did you buy a house in 2010?",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$1);
  
  var q$3 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return true; }
  )).appendTo(form);
  var hasMaintLoan = new QLrt.SimpleFormElementWidget({
    name: "hasMaintLoan", 
    label: "Did you enter a loan?",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$3);
  
  var q$4 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return true; }
  )).appendTo(form);
  var hasSoldHouse = new QLrt.SimpleFormElementWidget({
    name: "hasSoldHouse", 
    label: "Did you sell a house in 2010?",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$4);
  
  var q$5 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [hasSoldHouse]; },
    function (hasSoldHouse) { return (true && hasSoldHouse); }
  )).appendTo(form);
  var sellingPrice = new QLrt.SimpleFormElementWidget({
    name: "sellingPrice", 
    label: "What was the selling price?",
    valueWidget: new QLrt.MoneyValueWidget() 
  }).appendTo(q$5);
  
  var q$6 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [hasSoldHouse]; },
    function (hasSoldHouse) { return (true && hasSoldHouse); }
  )).appendTo(form);
  var privateDebt = new QLrt.SimpleFormElementWidget({
    name: "privateDebt", 
    label: "Private debts for the sold house:",
    valueWidget: new QLrt.MoneyValueWidget() 
  }).appendTo(q$6);
  
  var q$7 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [hasSoldHouse]; },
    function (hasSoldHouse) { return (true && hasSoldHouse); }
  )).appendTo(form);
  var valueResidue = new QLrt.SimpleFormElementWidget({
    name: "valueResidue", 
    label: "Value residue:",
    valueWidget: new QLrt.MoneyValueWidget(new QLrt.LazyValue(
    function () { return [sellingPrice, privateDebt]; },
    function (sellingPrice, privateDebt) { return (sellingPrice - privateDebt); }
  )) 
  }).appendTo(q$7);
  
  $('#QL-content').append(form.domElement());
  form.activate();
  function persist(data) {
     localStorage['QL-persist'] = JSON.stringify(data);
  }
});