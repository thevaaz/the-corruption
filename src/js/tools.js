let config;
let personagem;
function create(el, atributos){
  let elemento = document.createElement(el);
  
  for(let atributo in atributos){
    if(atributo == "appendChild"){
      atributos[atributo].forEach(child => {
        elemento.appendChild(child);
      });
    }else if(atributo == "addEventListener"){
       elemento.addEventListener(atributos[atributo].event, atributos[atributo].function);
    }else{
      if(elemento[atributo] !== null && elemento[atributo] !== undefined){
        elemento[atributo] = atributos[atributo];
      }
    }
  }
  return elemento;
}
Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for(var i = this.length - 1; i >= 0; i--) {
    if(this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
}
let url = new URL(window.location);
if(url.searchParams.get("personagemId")){
  var personagemId = url.searchParams.get("personagemId");
}

(function loadPersonagens(){
  var ajax = new XMLHttpRequest();
  ajax.open("GET", "/src/data/personagens.json", false);
  ajax.send();
  personagem = JSON.parse(ajax.responseText);
  localStorage.setItem("personagens", this.personagem);
})();

(function loadConfig(){
  var ajax = new XMLHttpRequest();
  ajax.open("GET", "/src/data/config.json", false);
  ajax.send();
  config = JSON.parse(ajax.responseText);
  localStorage.setItem("config", this.config);
})();

function ObjectListener(object, func){
  let savedObject = JSON.stringify(object);
  let listener = setInterval(onChange, 0);
  function onChange(){
    if(savedObject !== JSON.stringify(object)){
      savedObject = JSON.stringify(object)
      func();
      clearInterval(listener);
      listener = setInterval(onChange, 0);
    }
  }
}

function scrollBottom(elemento){
  elemento.scrollBy(0, elemento.offsetHeight)
}
