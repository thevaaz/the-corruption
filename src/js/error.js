window.onerror = function(error, url, line) {
  var csaida = document.createElement("div");
  var cerror = document.createElement("div");
  var curl = document.createElement("div");
  var cline = document.createElement("div");
  var style = document.createElement("style");

  style.innerHTML = ".errcon{background-color:red;color:#fff;font-family:arial;display:block;padding:10px}.errcon div{display:inline}#error { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 200; }"
  document.head.appendChild(style);
  csaida.style.display="grid";
  csaida.setAttribute("onclick","this.parentNode.removeChild(this)")
  csaida.className = "errcon";
  cerror.innerHTML = "Erro: " + error;
  curl.innerHTML = "Url: " + url;
  cline.innerHTML = "Linha: " + line;
  csaida.appendChild(cerror);
  csaida.appendChild(cline);
  csaida.appendChild(curl);
  document.getElementById("error").appendChild(csaida);
};