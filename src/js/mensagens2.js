let character = {
  112233:{
    name:"Allison",
    picture:"",
    message:"",
    save:{
      lastMessage:"Teste"
    },
    dialogue:undefined
  }
}
let message = {
  load:function(){
    let getSave;
    
  },
  popup:function(){
    let janela = create("div", {className:"popup"});
    let span = create("span", {innerHTML:"Digite um telefone"});
    let input = create("input");
    let div = create("a", {innerHTML:"Confirmar"});
    let closeDiv = create("div", {className:"close"});
    
    function close(){
      closeDiv.remove();
      janela.remove();
    }
    input.addEventListener("keyup", function(e){
      if(character[this.value] !== undefined){
        message.novoContato(this.value);
        close();
      }
    });
    div.addEventListener("click", function(){
      message.novoContato(input.value);
      close();
    });
    closeDiv.addEventListener("click", close);
    janela.appendChild(span);
    janela.appendChild(input);
    janela.appendChild(div);
    document.body.appendChild(closeDiv);
    document.body.appendChild(janela);
    input.focus()
  },
  novoContato:function(characterId){
    if(character[characterId] !== undefined){
      if(document.getElementById("id"+characterId) === null){
        let chatListItem = create("div",{className:"chat-list-item", id:"id"+characterId, custom:["data-id", characterId], appendChild:[
          create("div", {className:"chat-list-profile-image", style:`background-image:url("${character[characterId].picture}")`}),
          create("div", {className:"chat-list-profile-name", innerHTML:character[characterId].name}),
          create("div", {className:"chat-list-message", innerHTML:"Nenhuma mensagem"}),
          create("div", {className:"chat-list-date"})
        ]});
        chatListItem.addEventListener("click", function(){
          window.location.href = character[characterId].message
        });
        document.getElementById("container").appendChild(chatListItem);
        return "Adicionado";
      }else{
        document.getElementById("id"+characterId).click()
        return "Já existe";
      }
    }else{
      return "Personagem inexistente"
    }
  },
  chat:function(){
    
  }
}
class Game{
  constructor(id){
    this.id = id;
  }
  start(){
    
  }
}
let game = new Game();
game.start();