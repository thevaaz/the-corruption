const fs = require('fs');

fs.writeFile("/workspace/the-corruption/teste.js", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 

// Or
//fs.writeFileSync('/tmp/test-sync');

class Game{
  constructor(id){
    this.id = id;
  }
  start(){
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "/src/js/personagens.json", false);
    ajax.send();
    this.personagem = JSON.parse(ajax.responseText);
    ajax.open("GET", "/src/js/config.json", false);
    ajax.send();
    this.config = JSON.parse(ajax.responseText);
    localStorage.setItem("personagens", this.personagem);
    localStorage.setItem("config", this.config);
  }
}