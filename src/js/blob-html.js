function newBlob(text){
  var blob = new Blob([text], {type: "HTML"});
  var url = window.URL.createObjectURL(blob);
}