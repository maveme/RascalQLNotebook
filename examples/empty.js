$(document).ready(function () {
  var form = new QLrt.FormWidget({ name: "taxOfficeExample", submitCallback: persist});
  
  $('#QL-content').append(form.domElement());
  form.activate();
  function persist(data) {
     localStorage['QL-persist'] = JSON.stringify(data);
  }
});