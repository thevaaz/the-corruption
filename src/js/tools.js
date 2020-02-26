function create(elementName, attributes){
  let element = document.createElement(elementName);
  if(attributes !== undefined){
    if (
      attributes.className && element.setAttribute("class", attributes.className),
      attributes.onclick && element.setAttribute("onclick", attributes.onclick),
      attributes.href && element.setAttribute("href", attributes.href),
      attributes.style && element.setAttribute("style", attributes.style),
      attributes.name && element.setAttribute("name", attributes.name),
      attributes.id && element.setAttribute("id", attributes.id),
      attributes.innerHTML && (element.innerHTML = attributes.innerHTML),
      element.value === "" && attributes.value && element.setAttribute("value", attributes.value),
      element.placeholder === "" && attributes.placeholder && element.setAttribute("placeholder", attributes.placeholder),
      attributes.custom && element.setAttribute(attributes.custom[0], attributes.custom[1])
    );
    if(typeof attributes.appendChild == "object"){
      for(let i = 0; i < attributes.appendChild.length; i++){
        element.appendChild(attributes.appendChild[i]);
      }
    }
  }
  return element;
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

function loadPersonagens(){
  var ajax = new XMLHttpRequest();
  ajax.open("GET", "/src/data/personagens.json", false);
  ajax.send();
  personagem = JSON.parse(ajax.responseText);
  localStorage.setItem("personagens", this.personagem);
  console.log(personagem);
}
loadPersonagens();

function loadConfig(){
  var ajax = new XMLHttpRequest();
  ajax.open("GET", "/src/data/config.json", false);
  ajax.send();
  config = JSON.parse(ajax.responseText);
  localStorage.setItem("config", this.config);
  console.log(config);
}
loadConfig();