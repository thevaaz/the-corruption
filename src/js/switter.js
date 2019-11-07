let personagemID = document.body.id.split('id').join('');
(function loading(){
  let fade = 9;
  let loadingTO = setTimeout(function(){
    setInterval(function(){
      document.getElementById('loading').style.opacity = '0.'+fade;
      fade--;
      if(fade <= 1){
        document.getElementById('loading').style.display = 'none';
      }
    }, 25);
  },1500);
})();
(function carregarPerfil(){
  let nome = document.getElementById('nome');
  let foto = document.getElementById('foto');
  foto.backgroundImage = `url('${personagem[personagemID].foto}')`;
  nome.innerHTML = personagem[personagemID].nome;
})();
(function carregarPostagens(){
  let linhaDoTempo = document.getElementById('linha-do-tempo');
  let postagem = JSON.parse(localStorage.getItem('postagem'+personagemID));
  linhaDoTempo.innerHTML = `<div class="post">
    <div class="post-top">
      <div class="foto"></div>
      <div class="nome">${personagem[personagemID].nome}</div>
      <div class="data">${postagem[0].horario}</div>
    </div>
    <div class="post-bottom">
      ${postagem[0].conteudo}
    </div>
    <div class="container-comentarios">
      <div class="contador">Comentarios:<span class="quantidade"> ${postagem[0].comentarios}</span></div>
      <div class="comentarios"></div>
    </div>
  </div>` + linhaDoTempo.innerHTML;
})();
