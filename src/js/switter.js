let personagemID = document.body.id.split('id').join('');
(function loading(){
  let fade = 9;
  setTimeout(function(){
    let loadingTO = setInterval(function(){
      document.getElementById('loading').style.opacity = '0.'+fade;
      fade--;
      if(fade <= 1){
        document.getElementById('loading').style.display = 'none';
        clearInterval(loadingTO);
      }
    }, 25);
  },1500);
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
(function carregarPerfil(){
  let nome = document.getElementById('nome');
  let foto = document.getElementById('foto');
  let fotos = document.getElementsByClassName('foto');
  nome.innerHTML = personagem[personagemID].nome;
  foto.style.backgroundImage = `url('https://app.sollic.com/${personagem[personagemID].imagem}')`;
  for(let i = 0;i < fotos.length;i++){
    fotos[i].style.backgroundImage = `url('https://app.sollic.com/${personagem[personagemID].imagem}')`;
  }
})();
