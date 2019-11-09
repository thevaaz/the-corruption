var block = false;
var load = true;
var estilo = false;
/*function novaHora() {
  function pad(s) {
    return (s < 10) ? '0' + s : s;
  }
  var date = new Date();
  return [date.getHours(), date.getMinutes()].map(pad).join(':');
}*/
function personagemID(){
  return document.body.id.split('id').join('');
}
(function(){
  var dialogos = document.getElementById("d"+personagemID());
  if(dialogos){
    dialogos.scrollBy(0, dialogos.offsetHeight);
  }
})();
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
          console.log(height);
          escolha.style.height = `${height}px`;
        }
        if(escolha.offsetWidth > barrinha.offsetWidth){
          width--;
          console.log(width);
          escolha.style.width = `${width}px`;
        }
        if(escolha.offsetWidth <= barrinha.offsetWidth && escolha.offsetHeight <= barrinha.offsetHeight){
          escolha.removeAttribute('style');
          clearInterval(intSize);
        }
      },2);
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
      var segundos = personagem[idc].dialogos[atual].rs[esc].length;
      if(personagem[idc].dialogos[atual].rs[esc] && personagem[idc].dialogos[atual].rs[esc] !== ""){
        dialogos.innerHTML += `<div style="display:none"><span class="msg esq">${personagem[idc].dialogos[atual].rs[esc]}</span></div>`;
      }
      setTimeout(function(){
        if(personagem[idc].dialogos[atual].callback[esc] !== ""){
          personagem[idc].dialogos[atual].callback[esc]();
        }
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
