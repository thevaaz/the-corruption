let containerChoices = document.getElementsByClassName("container-choices")
let escolhas = document.getElementsByClassName("choices");
let containerMessage = document.getElementById("container-message");
let escrita = document.getElementById("escrita");
let textBar = document.getElementsByClassName("text-bar")[0];
let enviar = document.getElementsByClassName("send-button")[0];
let containerTextBar = document.getElementsByClassName("container-text-bar")[0];
let url = new URL(window.location);
let personagemId = url.searchParams.get("personagemId");

function loadConversa(){
  document.getElementsByClassName("app-name")[0].innerHTML = personagem[personagemId].nome;
  document.getElementsByClassName("profile-picture")[0].style.backgroundImage = `url('${personagem[personagemId].foto}')`;
  document.getElementById("info").addEventListener("click", () => {
    window.location.href = "./perfil.html?personagemId=" + personagemId;
  });
  enviar.addEventListener("click", enviarMensagens)
  textBar.addEventListener("click", mostrarEscolhas);
  for(let i = 0; i < escolhas.length; i++){
    escolhas[i].addEventListener("click", escolherMensagem);
  }
}

function loadMensagens(){
  personagem[personagemId].save.ultimosDialogos.forEach(mensagem => {
    //lado 0 direita, lado 1 esquerda.
    if(mensagem.lado === 1){
      containerMessage.appendChild(create("div", {className:"right",appendChild:[
        create("span", {className:"msg right",innerHTML:mensagem.texto})
      ]}));
    }else if(mensagem.lado === 0){
      containerMessage.appendChild(create("div", {className:"left",appendChild:[
        create("span", {className:"msg left",innerHTML:mensagem.texto})
      ]}));
    }
    containerMessage.scrollBy(0, containerMessage.offsetHeight);
  });
}

function mostrarEscolhas(){
  containerChoices[0].classList.toggle("hidden");
  containerTextBar.classList.toggle("hidden");
}

function escolherMensagem(){
  escrita.setAttribute("data-choice", this.getAttribute("data-choice"));
  escrita.innerHTML = this.innerHTML;
  mostrarEscolhas();
}

function enviarMensagens() {
  let escolha = escrita.getAttribute("data-choice");

  if(!personagem[personagemId].dialogos.fim){
    containerMessage.appendChild(create("div", {className:"right",appendChild:[
      create("span", {className:"msg right",innerHTML:escrita.innerText})
    ]}));
    containerMessage.scrollBy(0, containerMessage.offsetHeight);
    
    setTimeout(() => {
      for(let i in personagem[personagemId].dialogos.resposta[escolha]){
        containerMessage.appendChild(create("div", {className:"left",appendChild:[
          create("span", {className:"msg left",innerHTML:personagem[personagemId].dialogos.resposta[escolha][i]})
        ]}));
        containerMessage.scrollBy(0, containerMessage.offsetHeight);
        personagem[personagemId].dialogos = personagem[personagemId].dialogos.continuação[escolha];
        carregarEscolhas();
      }
    }, 1500);
    escrita.innerHTML = "";
  }else{
    alert("Acabou");
  }
}

function carregarEscolhas(){
  escolhas[0].innerHTML = personagem[personagemId].dialogos.escolhas[0];
  escolhas[1].innerHTML = personagem[personagemId].dialogos.escolhas[1];
}

carregarEscolhas();
loadConversa();
loadMensagens();
