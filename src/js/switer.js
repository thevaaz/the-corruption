(function loading(){
  let fade = 9;
  let loadingTO = setTimeout(function(){
    setInterval(function(){
      document.getElementsByClassName('loading')[0].style.opacity = '0.'+fade;
      fade--;
      if(fade <= 1){
        document.getElementsByClassName('loading')[0].style.display = 'none';
      }
    }, 25);
  },1500);
})();
(function carregarPerfil(){
  let nome = document.getElementById('nome');
  let foto = document.getElementById('foto');
  let arr = [{
  "conteudo":"Alguma coisa",
  "horario":"17:42",
  "comentarios":"0"
}];
  nome.innerHTML = personagem[personagemID()].nome;
  foto.style.backgroundImage = `url('https://app.sollic.com/${personagem[personagemID()].imagem}')`;
  localStorage.setItem('postagem3266820', JSON.stringify(arr));
})();
(function carregarPostagens(){
  let linhaDoTempo = document.getElementById('linha-do-tempo');
  let postagem = JSON.parse(localStorage.getItem('postagem'+personagemID()));
  linhaDoTempo.innerHTML = `<div class="post">
    <div class="post-top">
      <div class="foto"></div>
      <div class="nome">${personagem[personagemID()].nome}</div>
      <div class="data">${postagem[0]["horario"]}</div>
    </div>
    <div class="post-bottom">
      ${postagem[0]["conteudo"]}
    </div>
    <div class="container-comentarios">
      <div class="contador">Comentarios:<span class="quantidade"> ${postagem[0]["comentarios"]}</span></div>
      <div class="comentarios"></div>
    </div>
  </div>` + linhaDoTempo.innerHTML;
})();
