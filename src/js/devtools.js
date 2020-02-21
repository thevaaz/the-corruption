let devTools = document.createElement("div");
let devButton = document.createElement("div");
let devStyle = document.createElement("link");
devStyle.rel = "stylesheet";
devStyle.href = "/src/css/devtools.css";
devTools.className = "dev-tool";
devButton.className = "dev-button";
devButton.addEventListener("click", function(){
  devTools.style.display = "grid";
  this.style.display = "none";
})
devTools.innerHTML = `<strong>Digite o id do personagem a baixo</strong>
<input type="text" id="update">`
document.head.appendChild(devStyle);
document.body.appendChild(devButton);
document.body.appendChild(devTools);
document.getElementById("update").addEventListener("keyup", function(){
  if(personagem[this.value]){
    loadPerfil(this.value);
  }
  if(this.value === "fechar"){
    this.value = "";
    devTools.style.display = "none";
    devButton.style.display = "block";
  }
});