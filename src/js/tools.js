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
