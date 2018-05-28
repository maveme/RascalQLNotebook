$(document).ready(function () {
  var form = new QLrt.FormWidget({ name: "binary", submitCallback: persist});
  
  var q$9 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return true; }
  )).appendTo(form);
  var x_1_10 = new QLrt.SimpleFormElementWidget({
    name: "x_1_10", 
    label: "Is the number between 1 and 10",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$9);
  
  var q$10 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10]; },
    function (x_1_10) { return (true && x_1_10); }
  )).appendTo(form);
  var x_1_5 = new QLrt.SimpleFormElementWidget({
    name: "x_1_5", 
    label: "Is the number between 1 and 5",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$10);
  
  var q$11 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_1_5]; },
    function (x_1_10, x_1_5) { return ((true && x_1_10) && x_1_5); }
  )).appendTo(form);
  var x_1_3 = new QLrt.SimpleFormElementWidget({
    name: "x_1_3", 
    label: "Is the number between 1 and 3",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$11);
  
  var q$12 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_1_5, x_1_3]; },
    function (x_1_10, x_1_5, x_1_3) { return (((true && x_1_10) && x_1_5) && x_1_3); }
  )).appendTo(form);
  var x_1_2 = new QLrt.SimpleFormElementWidget({
    name: "x_1_2", 
    label: "Is the number between 1 and 2",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$12);
  
  var q$13 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_1_5, x_1_3, x_1_2]; },
    function (x_1_10, x_1_5, x_1_3, x_1_2) { return ((((true && x_1_10) && x_1_5) && x_1_3) && x_1_2); }
  )).appendTo(form);
  var answer_1_2 = new QLrt.SimpleFormElementWidget({
    name: "answer_1_2", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 1; }
  )) 
  }).appendTo(q$13);
  
  var q$14 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_1_5, x_1_3, x_1_2]; },
    function (x_1_10, x_1_5, x_1_3, x_1_2) { return ((((true && x_1_10) && x_1_5) && x_1_3) && !(x_1_2)); }
  )).appendTo(form);
  var answer_2_3 = new QLrt.SimpleFormElementWidget({
    name: "answer_2_3", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 2; }
  )) 
  }).appendTo(q$14);
  
  var q$15 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_1_5, x_1_3]; },
    function (x_1_10, x_1_5, x_1_3) { return (((true && x_1_10) && x_1_5) && !(x_1_3)); }
  )).appendTo(form);
  var x_3_4 = new QLrt.SimpleFormElementWidget({
    name: "x_3_4", 
    label: "Is the number between 3 and 4",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$15);
  
  var q$16 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_1_5, x_1_3, x_3_4]; },
    function (x_1_10, x_1_5, x_1_3, x_3_4) { return ((((true && x_1_10) && x_1_5) && !(x_1_3)) && x_3_4); }
  )).appendTo(form);
  var answer_3_4 = new QLrt.SimpleFormElementWidget({
    name: "answer_3_4", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 3; }
  )) 
  }).appendTo(q$16);
  
  var q$17 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_1_5, x_1_3, x_3_4]; },
    function (x_1_10, x_1_5, x_1_3, x_3_4) { return ((((true && x_1_10) && x_1_5) && !(x_1_3)) && !(x_3_4)); }
  )).appendTo(form);
  var answer_4_5 = new QLrt.SimpleFormElementWidget({
    name: "answer_4_5", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 4; }
  )) 
  }).appendTo(q$17);
  
  var q$18 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_1_5]; },
    function (x_1_10, x_1_5) { return ((true && x_1_10) && !(x_1_5)); }
  )).appendTo(form);
  var x_5_7 = new QLrt.SimpleFormElementWidget({
    name: "x_5_7", 
    label: "Is the number between 5 and 7",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$18);
  
  var q$19 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_1_5, x_5_7]; },
    function (x_1_10, x_1_5, x_5_7) { return (((true && x_1_10) && !(x_1_5)) && x_5_7); }
  )).appendTo(form);
  var x_5_6 = new QLrt.SimpleFormElementWidget({
    name: "x_5_6", 
    label: "Is the number between 5 and 6",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$19);
  
  var q$20 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_1_5, x_5_7, x_5_6]; },
    function (x_1_10, x_1_5, x_5_7, x_5_6) { return ((((true && x_1_10) && !(x_1_5)) && x_5_7) && x_5_6); }
  )).appendTo(form);
  var answer_5_6 = new QLrt.SimpleFormElementWidget({
    name: "answer_5_6", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 5; }
  )) 
  }).appendTo(q$20);
  
  var q$21 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_1_5, x_5_7, x_5_6]; },
    function (x_1_10, x_1_5, x_5_7, x_5_6) { return ((((true && x_1_10) && !(x_1_5)) && x_5_7) && !(x_5_6)); }
  )).appendTo(form);
  var answer_6_7 = new QLrt.SimpleFormElementWidget({
    name: "answer_6_7", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 6; }
  )) 
  }).appendTo(q$21);
  
  var q$22 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_1_5, x_5_7]; },
    function (x_1_10, x_1_5, x_5_7) { return (((true && x_1_10) && !(x_1_5)) && !(x_5_7)); }
  )).appendTo(form);
  var x_7_8 = new QLrt.SimpleFormElementWidget({
    name: "x_7_8", 
    label: "Is the number between 7 and 8",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$22);
  
  var q$23 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_1_5, x_5_7, x_7_8]; },
    function (x_1_10, x_1_5, x_5_7, x_7_8) { return ((((true && x_1_10) && !(x_1_5)) && !(x_5_7)) && x_7_8); }
  )).appendTo(form);
  var answer_7_8 = new QLrt.SimpleFormElementWidget({
    name: "answer_7_8", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 7; }
  )) 
  }).appendTo(q$23);
  
  var q$24 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_1_5, x_5_7, x_7_8]; },
    function (x_1_10, x_1_5, x_5_7, x_7_8) { return ((((true && x_1_10) && !(x_1_5)) && !(x_5_7)) && !(x_7_8)); }
  )).appendTo(form);
  var x_8_9 = new QLrt.SimpleFormElementWidget({
    name: "x_8_9", 
    label: "Is the number between 8 and 9",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$24);
  
  var q$25 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_1_5, x_5_7, x_7_8, x_8_9]; },
    function (x_1_10, x_1_5, x_5_7, x_7_8, x_8_9) { return (((((true && x_1_10) && !(x_1_5)) && !(x_5_7)) && !(x_7_8)) && x_8_9); }
  )).appendTo(form);
  var answer_8_9 = new QLrt.SimpleFormElementWidget({
    name: "answer_8_9", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 8; }
  )) 
  }).appendTo(q$25);
  
  var q$26 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_1_5, x_5_7, x_7_8, x_8_9]; },
    function (x_1_10, x_1_5, x_5_7, x_7_8, x_8_9) { return (((((true && x_1_10) && !(x_1_5)) && !(x_5_7)) && !(x_7_8)) && !(x_8_9)); }
  )).appendTo(form);
  var answer_9_10 = new QLrt.SimpleFormElementWidget({
    name: "answer_9_10", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 9; }
  )) 
  }).appendTo(q$26);
  
  var q$27 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10]; },
    function (x_1_10) { return (true && !(x_1_10)); }
  )).appendTo(form);
  var x_10_15 = new QLrt.SimpleFormElementWidget({
    name: "x_10_15", 
    label: "Is the number between 10 and 15",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$27);
  
  var q$28 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15]; },
    function (x_1_10, x_10_15) { return ((true && !(x_1_10)) && x_10_15); }
  )).appendTo(form);
  var x_10_12 = new QLrt.SimpleFormElementWidget({
    name: "x_10_12", 
    label: "Is the number between 10 and 12",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$28);
  
  var q$29 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15, x_10_12]; },
    function (x_1_10, x_10_15, x_10_12) { return (((true && !(x_1_10)) && x_10_15) && x_10_12); }
  )).appendTo(form);
  var x_10_11 = new QLrt.SimpleFormElementWidget({
    name: "x_10_11", 
    label: "Is the number between 10 and 11",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$29);
  
  var q$30 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15, x_10_12, x_10_11]; },
    function (x_1_10, x_10_15, x_10_12, x_10_11) { return ((((true && !(x_1_10)) && x_10_15) && x_10_12) && x_10_11); }
  )).appendTo(form);
  var answer_10_11 = new QLrt.SimpleFormElementWidget({
    name: "answer_10_11", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 10; }
  )) 
  }).appendTo(q$30);
  
  var q$31 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15, x_10_12, x_10_11]; },
    function (x_1_10, x_10_15, x_10_12, x_10_11) { return ((((true && !(x_1_10)) && x_10_15) && x_10_12) && !(x_10_11)); }
  )).appendTo(form);
  var answer_11_12 = new QLrt.SimpleFormElementWidget({
    name: "answer_11_12", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 11; }
  )) 
  }).appendTo(q$31);
  
  var q$32 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15, x_10_12]; },
    function (x_1_10, x_10_15, x_10_12) { return (((true && !(x_1_10)) && x_10_15) && !(x_10_12)); }
  )).appendTo(form);
  var x_12_13 = new QLrt.SimpleFormElementWidget({
    name: "x_12_13", 
    label: "Is the number between 12 and 13",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$32);
  
  var q$33 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15, x_10_12, x_12_13]; },
    function (x_1_10, x_10_15, x_10_12, x_12_13) { return ((((true && !(x_1_10)) && x_10_15) && !(x_10_12)) && x_12_13); }
  )).appendTo(form);
  var answer_12_13 = new QLrt.SimpleFormElementWidget({
    name: "answer_12_13", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 12; }
  )) 
  }).appendTo(q$33);
  
  var q$34 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15, x_10_12, x_12_13]; },
    function (x_1_10, x_10_15, x_10_12, x_12_13) { return ((((true && !(x_1_10)) && x_10_15) && !(x_10_12)) && !(x_12_13)); }
  )).appendTo(form);
  var x_13_14 = new QLrt.SimpleFormElementWidget({
    name: "x_13_14", 
    label: "Is the number between 13 and 14",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$34);
  
  var q$35 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15, x_10_12, x_12_13, x_13_14]; },
    function (x_1_10, x_10_15, x_10_12, x_12_13, x_13_14) { return (((((true && !(x_1_10)) && x_10_15) && !(x_10_12)) && !(x_12_13)) && x_13_14); }
  )).appendTo(form);
  var answer_13_14 = new QLrt.SimpleFormElementWidget({
    name: "answer_13_14", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 13; }
  )) 
  }).appendTo(q$35);
  
  var q$36 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15, x_10_12, x_12_13, x_13_14]; },
    function (x_1_10, x_10_15, x_10_12, x_12_13, x_13_14) { return (((((true && !(x_1_10)) && x_10_15) && !(x_10_12)) && !(x_12_13)) && !(x_13_14)); }
  )).appendTo(form);
  var answer_14_15 = new QLrt.SimpleFormElementWidget({
    name: "answer_14_15", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 14; }
  )) 
  }).appendTo(q$36);
  
  var q$37 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15]; },
    function (x_1_10, x_10_15) { return ((true && !(x_1_10)) && !(x_10_15)); }
  )).appendTo(form);
  var x_15_17 = new QLrt.SimpleFormElementWidget({
    name: "x_15_17", 
    label: "Is the number between 15 and 17",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$37);
  
  var q$38 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15, x_15_17]; },
    function (x_1_10, x_10_15, x_15_17) { return (((true && !(x_1_10)) && !(x_10_15)) && x_15_17); }
  )).appendTo(form);
  var x_15_16 = new QLrt.SimpleFormElementWidget({
    name: "x_15_16", 
    label: "Is the number between 15 and 16",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$38);
  
  var q$39 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15, x_15_17, x_15_16]; },
    function (x_1_10, x_10_15, x_15_17, x_15_16) { return ((((true && !(x_1_10)) && !(x_10_15)) && x_15_17) && x_15_16); }
  )).appendTo(form);
  var answer_15_16 = new QLrt.SimpleFormElementWidget({
    name: "answer_15_16", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 15; }
  )) 
  }).appendTo(q$39);
  
  var q$40 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15, x_15_17, x_15_16]; },
    function (x_1_10, x_10_15, x_15_17, x_15_16) { return ((((true && !(x_1_10)) && !(x_10_15)) && x_15_17) && !(x_15_16)); }
  )).appendTo(form);
  var answer_16_17 = new QLrt.SimpleFormElementWidget({
    name: "answer_16_17", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 16; }
  )) 
  }).appendTo(q$40);
  
  var q$41 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15, x_15_17]; },
    function (x_1_10, x_10_15, x_15_17) { return (((true && !(x_1_10)) && !(x_10_15)) && !(x_15_17)); }
  )).appendTo(form);
  var x_17_18 = new QLrt.SimpleFormElementWidget({
    name: "x_17_18", 
    label: "Is the number between 17 and 18",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$41);
  
  var q$42 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15, x_15_17, x_17_18]; },
    function (x_1_10, x_10_15, x_15_17, x_17_18) { return ((((true && !(x_1_10)) && !(x_10_15)) && !(x_15_17)) && x_17_18); }
  )).appendTo(form);
  var answer_17_18 = new QLrt.SimpleFormElementWidget({
    name: "answer_17_18", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 17; }
  )) 
  }).appendTo(q$42);
  
  var q$43 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15, x_15_17, x_17_18]; },
    function (x_1_10, x_10_15, x_15_17, x_17_18) { return ((((true && !(x_1_10)) && !(x_10_15)) && !(x_15_17)) && !(x_17_18)); }
  )).appendTo(form);
  var x_18_19 = new QLrt.SimpleFormElementWidget({
    name: "x_18_19", 
    label: "Is the number between 18 and 19",
    valueWidget: new QLrt.BooleanValueWidget() 
  }).appendTo(q$43);
  
  var q$44 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15, x_15_17, x_17_18, x_18_19]; },
    function (x_1_10, x_10_15, x_15_17, x_17_18, x_18_19) { return (((((true && !(x_1_10)) && !(x_10_15)) && !(x_15_17)) && !(x_17_18)) && x_18_19); }
  )).appendTo(form);
  var answer_18_19 = new QLrt.SimpleFormElementWidget({
    name: "answer_18_19", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 18; }
  )) 
  }).appendTo(q$44);
  
  var q$45 = new QLrt.ConditionalGroupWidget(new QLrt.LazyValue(
    function () { return [x_1_10, x_10_15, x_15_17, x_17_18, x_18_19]; },
    function (x_1_10, x_10_15, x_15_17, x_17_18, x_18_19) { return (((((true && !(x_1_10)) && !(x_10_15)) && !(x_15_17)) && !(x_17_18)) && !(x_18_19)); }
  )).appendTo(form);
  var answer_19_20 = new QLrt.SimpleFormElementWidget({
    name: "answer_19_20", 
    label: "The answer is",
    valueWidget: new QLrt.IntegerValueWidget(new QLrt.LazyValue(
    function () { return []; },
    function () { return 19; }
  )) 
  }).appendTo(q$45);
  
  $('#QL-content').append(form.domElement());
  form.activate();
  function persist(data) {
     localStorage['QL-persist'] = JSON.stringify(data);
  }
});