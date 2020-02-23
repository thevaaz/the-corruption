let personagem;
let config;

function abrirModal(){
  let janela = create("div", {className:"popup"});
  let span = create("span", {innerHTML:"Digite um telefone"});
  let input = create("input",{value:"326682"});
  let div = create("a", {innerHTML:"Confirmar"});
  let closeDiv = create("div", {className:"close"});
  
  function close(){
    closeDiv.remove();
    janela.remove();
  }
  input.addEventListener("keyup", function(e){
    if(personagem[this.value] !== undefined){
      novoContato(this.value);
      close();
    }
  });
  div.addEventListener("click", function(){
    novoContato(input.value);
    close();
  });
  closeDiv.addEventListener("click", close);
  janela.appendChild(span);
  janela.appendChild(input);
  janela.appendChild(div);
  document.body.appendChild(closeDiv);
  document.body.appendChild(janela);
  input.focus()
}

(function loadPersonagens(){
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

function novoContato(personagemId){
  if(personagem[personagemId] !== undefined){
    if(document.getElementById("id"+personagemId) === null){
      let chatListItem = create("div",{className:"chat-list-item", id:"id"+personagemId, custom:["data-id", personagemId], appendChild:[
        create("div", {className:"chat-list-profile-image", style:`background-image:url("${personagem[personagemId].foto}")`}),
        create("div", {className:"chat-list-profile-name", innerHTML:personagem[personagemId].nome}),
        create("div", {className:"chat-list-message", innerHTML:"Nenhuma mensagem"}),
        create("div", {className:"chat-list-date"})
      ]});
      chatListItem.addEventListener("click", function(){
        window.location.href = "./conversa.html?personagemId="+personagemId;
      });
      document.getElementById("container").appendChild(chatListItem);
      return "Adicionado";
    }else{
      document.getElementById("id"+personagemId).click()
      return "Já existe";
    }
  }else{
    return "Personagem inexistente";
  }
}