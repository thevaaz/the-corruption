var block = false;
var load = true;
var estilo = false;
if(document.querySelector(".reveal")){
  (function loadTheCorruption(){
    let duration = 0.8;
    let delay = 0.3;
    let revealText = document.querySelector(".reveal");
    let letters = revealText.textContent.split("");
    let tcLoading = document.getElementsByClassName("tc-loading")[0];
    revealText.textContent = "";
    let middle = letters.filter(e => e !== " ").length / 2;
    let tcOpacity = 9;
    letters.forEach((letter, i) => {
      let span = document.createElement("span");
      span.textContent = letter;
      span.style.animationDelay = `${delay + Math.abs(i - middle) * 0.1}s`;
      revealText.append(span);
    });
    setTimeout(function(){
      let intOp = setInterval(function(){
        tcLoading.style.opacity = '0.'+tcOpacity;
        if(tcOpacity > 0){
          tcOpacity--;
        }else{
          tcLoading.style.display = 'none';
          clearInterval(intOp);
        }
      }, 30);
    }, 3500);
  })();
}
function novaHora() {
  function pad(s) {
    return (s < 10) ? '0' + s : s;
  }
  var date = new Date();
  return [date.getHours(), date.getMinutes()].map(pad).join(':');
}
function personagemID(){
  return document.body.id.split('id').join('');
}
function displayEsc(){
  let escolha = document.getElementById('esc'+personagemID());
  if(!block){
    escolha.style.display = 'grid';
    if(estilo){
      let width = 98;//62
      setInterval(function(){
        if(width > 46){
          width--;
          escolha.style.width = 'calc(100% - ' + width + 'px)';
        }
      },5);
    }else{
      escolha.style.width = 'calc(100% - 46px)';
    }
  }
}
window.onload = function janelaConversa(dataId){
  if(!localStorage.getItem(document.body.id)){
    var tel = personagemID();
    var per = personagem[tel];
    document.body.innerHTML += `
      <div class="header preto">
        <button id="voltar" class="btnbarranf" onclick="window.location.href='/mensagens/'"><i class="fas fa-angle-left"></i> <div class="perfilcon" style="background-image: url(${per.imagem});"></div></button>
        <div class="ncon" onclick="document.getElementsByClassName('detalhes')[0].style.visibility='visible'">${per.nome}</div>
      </div>
      <div class="dialogos" id="d${tel}"></div>
      <div class="digitando" id="e${tel}">${personagem[tel].nome} está digitando...</div>
      <div class="barra-de-msg">
        <div class="escbox" id="esc${tel}">
          <a class="esc" data-escolha="0" data-id="${tel}" data-atual="${per.dialogos[0].atual}" data-next="${per.dialogos[0].nx[0]}" onclick="escolher(this)">${per.dialogos[0].op[0]}</a>
          <a class="esc" data-escolha="1" data-id="${tel}" data-atual="${per.dialogos[0].atual}" data-next="${per.dialogos[0].nx[1]}" onclick="escolher(this)">${per.dialogos[0].op[1]}</a>
        </div>
        <div class="barrinha" id='barrinha' onclick='displayEsc()'>Mensagem aqui...</div>
        <div class='botao-de-envio' onclick='enviar()'><i class="fas fa-paper-plane"></i></div>
      </div>
      <div class="detalhes">
        <div class="header preto">
          <button class="btnbarranf" onclick="document.getElementsByClassName('detalhes')[0].style.visibility = 'hidden'">
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
      </div>`;
    localStorage.setItem(document.body.id, document.body.innerHTML);
  }else{
    document.body.innerHTML = localStorage.getItem(document.body.id);
  }
};
function fechar(){
  let escolha = document.getElementById('esc'+personagemID());
  let barrinha = document.getElementById('barrinha');
  let height = escolha.offsetHeight;
  let width = escolha.offsetWidth;
  if(!block){
    if(estilo){
      escolha.style.color = '#fff';
      let intSize = setInterval(function(){
        if(escolha.offsetHeight > barrinha.offsetHeight){
          height--;
          console.log(height)
          escolha.style.height = `${height}px`;
        }
        if(escolha.offsetWidth > barrinha.offsetWidth){
          width--;
          console.log(width)
          escolha.style.width = `${width}px`;
        }
        if(escolha.offsetWidth <= barrinha.offsetWidth && escolha.offsetHeight <= barrinha.offsetHeight){
          escolha.removeAttribute('style');
          clearInterval(intSize);
        }
      },2)
    }else{
      escolha.removeAttribute('style');
    }
  }
}
function escolher(e){
  let escolha = e.getAttribute('data-escolha');
  let proximo = e.getAttribute('data-next');
  let atual = e.getAttribute('data-atual');
  let barrinha = document.getElementById('barrinha');
  let caixa = document.getElementById('esc'+personagemID());
  let letra = 0;
  let digitando = e.innerHTML.split('');
  
  fechar();
  //caixa.style.display = 'none';
  barrinha.setAttribute('data-escolha', escolha);
  barrinha.setAttribute('data-next', proximo);
  barrinha.setAttribute('data-atual', atual);
  if(estilo){
    barrinha.innerHTML = '';
    setInterval(function(){
      if(letra < digitando.length){
        barrinha.innerHTML += digitando[letra];
        letra++;
      }
    },30);
  }else{
    barrinha.innerHTML = `<div id='texto-barrinha'>${e.innerHTML}</div>`;
  }
}
function enviar(){
  let e = document.getElementById('barrinha');
  let txtBarrinha = document.getElementById('texto-barrinha');
  if(!block){
    var idc = personagemID();
    var esc = e.getAttribute("data-escolha");
    var next = e.getAttribute("data-next");
    var atual = e.getAttribute("data-atual");
    var dialogos = document.getElementById("d"+idc);
    var escbox = document.getElementById("esc"+idc);
    var escrevendo = document.getElementById("e"+idc);
    var resRandom = Math.floor(Math.random() * 3000);
    var barrinha = document.getElementById('barrinha');
    if(next != "fim"){
      window.onbeforeunload = function impedimento(){return 'Miau';};
      document.getElementById('voltar').removeAttribute('onclick');
      dialogos.innerHTML += `<div><span class="msg dir">${txtBarrinha.innerHTML}</span></div>`;
      localStorage.setItem('ult'+idc, document.querySelector(`#d${idc} > div:last-child > span`).innerHTML);
      //document.querySelector(`#${personagem[idc].nome+idc} > span.data`).innerHTML = novaHora();
      barrinha.innerHTML = "Escolha uma opção";
      barrinha.removeAttribute('data-escolha');
      barrinha.removeAttribute('data-next');
      barrinha.removeAttribute('data-atual');
      setTimeout(function(){personagem[idc].dialogos[atual].callback[esc]()}, 3000);
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
        <a class="esc" data-escolha="0" data-id="${idc}" data-atual="${next}" data-next="${personagem[idc].dialogos[next].nx[0]}" onclick="escolher(this)">${personagem[idc].dialogos[next].op[0]}</a>
        <a class="esc" data-escolha="1" data-id="${idc}" data-atual="${next}" data-next="${personagem[idc].dialogos[next].nx[1]}" onclick="escolher(this)">${personagem[idc].dialogos[next].op[1]}</a>`;
        localStorage.setItem('ult'+idc, document.querySelector(`#d${idc} > div:last-child > span`).innerHTML);
        block = false;
        localStorage.setItem(document.body.id, document.body.innerHTML);
        document.getElementById('voltar').setAttribute('onclick', "window.location.href='/mensagens/'");
        window.onbeforeunload = function impedimento(){};
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
const inputEle = document.getElementById('tel');
inputEle.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) {
    addConversa();
  }
});
document.getElementById('tel').addEventListener('keyup', function(){
  if(personagem[this.value.split('-').join('')]){
    addConversa();
  }
});
$("input#tel").mask("999-9999", {"placeholder": " "});
function addConversa(){
  var tel = document.getElementById("tel").value.split('-').join('');
  var aviso = document.getElementById("aviso");

  if(personagem[tel]){
    if(!document.getElementById(personagem[tel].nome + tel)){
      var per = personagem[tel];
      var modal = document.getElementById("modal");
      var container = document.getElementById("container");

      modal.style.display = "none";
      container.innerHTML += `
      <div class="conversas" onclick="paginaPersonagem(this)" id="${per.nome}${tel}" data-id="${tel}">
        <div class="perfil" style="background-image: url(${per.imagem});"></div>
        <span class="nome">${per.nome}</span>
        <span data-id="${tel}" class="mensagem" onload="ultimaMSG(this)">Nenhuma mensagem</span><span class="data"></span>
      </div>`;
      localStorage.setItem(document.body.id, document.body.innerHTML);
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
function paginaPersonagem(e){
  window.location.href = window.location.href + e.getAttribute('data-id');
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
    if(localStorage.getItem(document.body.id)){
      if(localStorage.getItem(document.body.id) !== null || localStorage.getItem(document.body.id) !== '' ){
        document.body.innerHTML = localStorage.getItem(document.body.id);
      }
    }
    let con = document.getElementsByClassName('conversas');
    for(let i = 0; i < con.length; i++){
      let dataID = con[i].getElementsByClassName('mensagem')[0].getAttribute('data-id');
      if(localStorage.getItem('ult'+dataID)){
        con[i].getElementsByClassName('mensagem')[0].innerHTML = localStorage.getItem('ult'+dataID);
      }
    }
  })();
}
