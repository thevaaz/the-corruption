function novaHora() {
  function pad(s) {
    return (s < 10) ? '0' + s : s;
  }
  var date = new Date();
  return [date.getHours(), date.getMinutes()].map(pad).join(':');
}
var personagem = {
  "3266820":{
    "nome":"Allison",
    "id":"326-6820",
    "idade":"27",
    "imagem":"../src/imagens/allison-avatar.jpg",
    "janela":"",
    "dialogos":[
      {
        "atual":"0",
        "op":["Olá tudo bem?","Oi"],
        "rs":["Quem é você? Estou bem sim obrigada por perguntar","Oi, quem é você?"],
        "nx":["1","1"],
        "noticia":"",
        "callback":["",""],
        "con":["",""]
      },
      {
        "atual":"1",
        "op":["Sou eu Miguel, preciso conversar sobre algo importante você tem um tempo?","Miguel, não lembra de mim?"],
        "rs":["Tenho 5 minutos antes da reunião começar, pode falar","Ah! Oiii, me diz, o que precisa?"],
        "nx":["2","3"],
        "noticia":"",
        "callback":["",""],
        "con":["",""]
      },
      {
        "atual":"2",
        "op":["Em cinco minutos não vai ser possivel, podemos conversar depois que acabar o espediente?","Longa historia, quando sair podemos conversar sobre isso em um jantar, o que acha?"],
        "rs":["Podemos, sim um jantar?","Isso está estranho... Tudo bem, Mas primeiro me diz sobre o que se trata"],
        "nx":["4","5"],
        "noticia":"",
        "callback":["",""],
        "con":["",""]
      },
      {
        "atual":"3",
        "op":["Estava pensando sobre o que você me disse no elevador, talvez eu precise seguir em frente","Você estava certa!"],
        "rs":["Que bom! Se precisar de mim estou aqui ;)","Eu sempre estou, mas do que está falando?"],
        "nx":["7","5"],
        "noticia":"",
        "callback":["",""],
        "con":["",""]
      },
      {
        "atual":"4",
        "op":["Um jantar seria ótimo, a que horas?","Otimo! Te pego as 19 hrs, tudo bem pra você?"],
        "rs":["As 19 hrs","Tudo bem sim, vou estar pronta."],
        "nx":["6","6"],
        "noticia":"",
        "callback":[function(){
          localStorage.setItem("postagem3266820", `[{
            "conteudo":"Ansiosa para o jantar com Miguel 😍",
            "horario":"${novaHora()}",
            "comentarios":"0"
          }]`);
          document.getElementById("notificacao").style.display="block";
        },
        function(){
          localStorage.setItem("postagem3266820", `[{
            "conteudo":"Ansiosa para o jantar com Miguel 😍",
            "horario":"${novaHora()}",
            "comentarios":"0"
          }]`);
          document.getElementById("notificacao").style.display="block"
        }],
        "con":["",""]
      },
      {
        "atual":"5",
        "op":["É sobre o que você me disse no elevador, estava pensando... Quer sair pra jantar?","Você estava certa tenho que seguir em frente, convidei uma garota pra sair hoje"],
        "rs":["Então finalmente vai seguir meu conselho... Adoraria sair pra jantar :)","Ah... Que bom pra você..."],
        "nx":["6","6"],
        "noticia":"",
        "callback":[function(){
          localStorage.setItem("postagem3266820", `[{
            "conteudo":"Ansiosa para o jantar com Miguel 😍",
            "horario":"${novaHora()}",
            "comentarios":"0"
          }]`);
          document.getElementById("notificacao").style.display="block"
        },""],
        "con":["",""]
      },
      {
        "atual":"6",
        "op":["&nbsp;","&nbsp;"],
        "rs":["",""],
        "nx":["fim","fim"],
        "noticia":"", 
        "callback":["",""], 
        "con":["",""] 
      },
      {
        "atual":"7",
        "op":["Então... Estava pensando, gostaria de sair pra fazer alguma coisa?","Obrigado :)"],
        "rs":["Claro, que tal um jantar?",""],
        "nx":["4","6"],
        "noticia":"",
        "callback":["",""],
        "con":["",""]
      },
    ],
    "switter":{
      "postagens":[
          "Jantar com Miguel foi incrivel!"
      ]
    }
  }
};
