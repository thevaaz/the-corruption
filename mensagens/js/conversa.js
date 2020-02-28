let containerChoices = document.getElementsByClassName("container-choices")
let escolhas = document.getElementsByClassName("choices");
let containerMessage = document.getElementById("container-message");
let escrita = document.getElementById("escrita");
let textBar = document.getElementsByClassName("text-bar")[0];
let enviar = document.getElementsByClassName("send-button")[0];
let containerTextBar = document.getElementsByClassName("container-text-bar")[0];

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
    scrollBottom(containerMessage);
  });
}

function mostrarEscolhas(){
  if(escolhas[0] != "" && escolhas[1].innerHTML != ""){
    containerChoices[0].classList.toggle("hidden");
    containerTextBar.classList.toggle("hidden");
  }
}

function escolherMensagem(){
  escrita.setAttribute("data-choice", this.getAttribute("data-choice"));
  escrita.innerHTML = this.innerHTML;
  mostrarEscolhas();
}

function carregarEscolhas(){
  if(personagem[personagemId].dialogos !== null){
    escolhas[0].innerHTML = personagem[personagemId].dialogos.escolhas[0];
    escolhas[1].innerHTML = personagem[personagemId].dialogos.escolhas[1];
  }else{
    escolhas[0].innerHTML = "";
    escolhas[1].innerHTML = "";

  }
}

carregarEscolhas();
loadConversa();
loadMensagens();

function enviarMensagens(){
  let escolha = escrita.getAttribute("data-choice");

  if(personagem[personagemId].dialogos.resposta){
    containerMessage.appendChild(
      create("div", { className: "right", appendChild:[
        create("span", { className: "msg right", innerHTML:escrita.innerText })
      ]})
    );
    scrollBottom(containerMessage);
    let res = 0;
    let timeout = setTimeout(teste, 1500);
    escrita.innerHTML = "";
    function teste(){
      if(personagem[personagemId].dialogos.resposta[escolha][res]){
        containerMessage.appendChild(
          create("div", { className:"left", appendChild:[
            create("span", {
              className:"msg left",
              innerHTML:personagem[personagemId].dialogos.resposta[escolha][res]
            })
          ]})
        );
        scrollBottom(containerMessage);
        timeout = setTimeout(teste, 1500);
        res++;
      }else{
        if(personagem[personagemId].dialogos.continuação){
          personagem[personagemId].dialogos = personagem[personagemId].dialogos.continuação[escolha];
          carregarEscolhas();
          escrita.innerHTML = "Clique aqui para escolher...";
        }else{
          personagem[personagemId].dialogos = null;
          carregarEscolhas();
          escrita.innerHTML = "Não há mais dialogos...";
        }
      }
    }
  }
}


// function enviarMensagens() {
//   let escolha = escrita.getAttribute("data-choice");

//   if(personagem[personagemId].dialogos.continuação){
//     containerMessage.appendChild(create("div", {className:"right",appendChild:[
//       create("span", {className:"msg right",innerHTML:escrita.innerText})
//     ]}));
//     scrollBottom(containerMessage);
//     escolhas[0].innerHTML = "";  
//     escolhas[1].innerHTML = "";
//     let i = 0;
//     let timeout = setTimeout(function teste(){
//       if(personagem[personagemId].dialogos.resposta[escolha][i]){
//         containerMessage.appendChild(create("div", {className:"left",appendChild:[
//           create("span", {className:"msg left",innerHTML:personagem[personagemId].dialogos.resposta[escolha][i]})
//         ]}));
//         scrollBottom(containerMessage);
//         timeout = setTimeout(teste, 1500);
//         i++;
//       }else{
//         personagem[personagemId].dialogos = personagem[personagemId].dialogos.continuação[escolha];
//         carregarEscolhas();
//       }
//     }, 1500);
//     escrita.innerHTML = "Clique aqui para escolher...";
//   }else{
//     alert("Acabou");
//   }
// }