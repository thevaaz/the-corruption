var block = false;
var load = true;
function novaHora() {
  function pad(s) {
    return (s < 10) ? '0' + s : s;
  }
  var date = new Date();
  return [date.getHours(), date.getMinutes()].map(pad).join(':');
}
function enviar(e){
  if(block === false){
    var idc = e.getAttribute("data-id");
    var esc = e.getAttribute("data-escolha");
    var next = e.getAttribute("data-next");
    var atual = e.getAttribute("data-atual");
    var dialogos = document.getElementById("d"+idc);
    var escbox = document.getElementById("esc"+idc);
    var escrevendo = document.getElementById("e"+idc);
    var resRandom = Math.floor(Math.random() * 5000);

    if(next != "fim"){
      dialogos.innerHTML += `<div><span class="msg dir">${e.innerHTML}</span></div>`;
      document.querySelector(`#${personagem[idc].nome+idc} > span.mensagem`).innerHTML = document.querySelector(`#d${idc} > div:last-child > span`).innerHTML;
      document.querySelector(`#${personagem[idc].nome+idc} > span.data`).innerHTML = novaHora();
      var segundos = personagem[idc].dialogos[atual].rs[esc].length;
      if(personagem[idc].dialogos[atual].rs[esc] && personagem[idc].dialogos[atual].rs[esc] !== ""){
        dialogos.innerHTML += `<div style="display:none"><span class="msg esq">${personagem[idc].dialogos[atual].rs[esc]}</span></div>`;
      }
      setTimeout(function(){
        dialogos.querySelector("div:last-child").style.display = "block";
        escrevendo.style.display = "none";
        dialogos.scrollBy(0, dialogos.offsetHeight);
        escbox.innerHTML = `
        <div class="digitando" id="e${idc}">${personagem[idc].nome} está digitando...</div>
        <a class="esc" data-escolha="0" data-id="${idc}" data-atual="${next}" data-next="${personagem[idc].dialogos[next].nx[0]}" onclick="enviar(this)">${personagem[idc].dialogos[next].op[0]}</a>
        <a class="esc" data-escolha="1" data-id="${idc}" data-atual="${next}" data-next="${personagem[idc].dialogos[next].nx[1]}" onclick="enviar(this)">${personagem[idc].dialogos[next].op[1]}</a>`;
        document.querySelector(`#${personagem[idc].nome+idc} > span.mensagem`).innerHTML = document.querySelector(`#d${idc} > div:last-child > span`).innerHTML;
        block = false;
        localStorage.setItem("save", document.getElementById("body").innerHTML);
      },segundos*60+resRandom);
      setTimeout(function(){
        escrevendo.style.display = "block";
      }, resRandom);
      dialogos.scrollBy(0, dialogos.offsetHeight);
    }else{
      window.alert("Fim do teste, recarregue a pagina para recomeçar.");
    }
  }
  block = true;
}
function janelaConversa(dataId){
  if(!document.getElementById("w" + dataId.getAttribute("data-id"))){
    var tel = dataId.getAttribute("data-id");
    var per = personagem[tel];
    document.body.innerHTML += `
    <div id="w${tel}" class="wincon" style="visibility:visible;">
      <div class="header">
        <button class="btnbarranf" onclick="back(this)"><i class="fas fa-angle-left"></i> <div class="perfilcon" style="background-image: url(${per.imagem});"></div></button>
        <div class="ncon" onclick="document.querySelector('#w${tel} > div.detalhes').style.visibility='visible'">${per.nome}</div>
      </div>
      <div class="dialogos" id="d${tel}"></div>
      <div class="digitando" id="e${tel}">${personagem[tel].nome} está digitando...</div>
      <div class="escbox" id="esc${tel}">
        <a class="esc" data-escolha="0" data-id="${tel}" data-atual="${per.dialogos[0].atual}" data-next="${per.dialogos[0].nx[0]}" onclick="enviar(this)">${per.dialogos[0].op[0]}</a>
        <a class="esc" data-escolha="1" data-id="${tel}" data-atual="${per.dialogos[0].atual}" data-next="${per.dialogos[0].nx[1]}" onclick="enviar(this)">${per.dialogos[0].op[1]}</a>
      </div>
      <div class="detalhes">
        <div class="header">
          <button class="btnbarranf" onclick="back(this)">
            <i class="fas fa-angle-left"></i>
            <div class="perfilcon" style="background-image: url(${per.imagem});"></div></button>
          <div class="ncon">${per.nome}</div>
        </div>
        <div class="container-detalhes">
          <div class="imagem-detalhes">
            <div style="background-image: url(${per.imagem});"></div>
          </div>
          <div class="nome-detalhes">${per.nome}</div>
          <div class="mais-detalhes">
            <div><span>Telefone</span><span>${per.id}</span></div>
            <div><span>Idade</span><span>${per.idade} anos</span></div>
          </div>
        </div>
      </div>
    </div>`;
    localStorage.setItem("save", document.getElementById("body").innerHTML);
  }else{
    document.getElementById("w"+dataId.getAttribute("data-id")).style.visibility = "visible";
  }
}
const inputEle = document.getElementById('tel');
inputEle.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) {
    addConversa();
  }
});
function addConversa(){
  var tel = document.getElementById("tel").value;
  var aviso = document.getElementById("aviso");

  if(personagem[tel]){
    if(!document.getElementById(personagem[tel].nome + tel)){
      var per = personagem[tel];
      var modal = document.getElementById("modal");
      var container = document.getElementById("container");

      modal.style.display = "none";
      container.innerHTML += `
      <div class="conversas" onclick="janelaConversa(this)" id="${per.nome}${tel}" data-id="${tel}">
        <div class="perfil" style="background-image: url(${per.imagem});"></div>
        <span class="nome">${per.nome}</span>
        <span class="mensagem">Nenhuma mensagem</span><span class="data"></span>
      </div>`;
      localStorage.setItem("save", document.getElementById("body").innerHTML);
    }else{
      aviso.innerHTML = "Numero ja foi adicionado!";
      setTimeout(function(){
        aviso.innerHTML = "Digite um numero de telefone";
      },2000);
    }
  }else{
    aviso.innerHTML = "Numero invalido";
    setTimeout(function(){
      aviso.innerHTML = "Digite um numero de telefone";
    },2000);
  }
}
function novaConversa(){
  var modal = document.getElementById("modal");
  var fechar = document.getElementById("cmodal");
  modal.style.display = "block";
  document.getElementById("tel").focus();
  
  fechar.addEventListener("click", function(){
    modal.style.display = "none";
  });
}
function back(e){
  if(e.parentElement.parentElement.style.visibility == "visible"){
    e.parentElement.parentElement.removeAttribute("style");
  }
}
window.onload = function sumir(){
  if(!localStorage.getItem("sumiu")){
    document.getElementsByClassName("telafull")[0].style.display="block";
  }
};
if(load){
  (function load(){
    var dialogos = document.getElementsByClassName("dialogos");
    var jnconversa = document.getElementsByClassName("wincon");
    if(localStorage.getItem("save")){
      document.getElementById("body").innerHTML = localStorage.getItem("save");
    }
    for(let i = 0; i < dialogos.length; i++){
      if(dialogos[i].querySelector("div:last-child")){
        if(dialogos[i].querySelector("div:last-child").style.display != "block"){
          dialogos[i].querySelector("div:last-child").style.display = "block";
        }
      }
    }
    for(let i = 0; i < jnconversa.length; i++){
      if(jnconversa[i] && jnconversa[i].style.display == "block"){
        jnconversa[i].removeAttribute("style");
      }
    }
  })();
}
