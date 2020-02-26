function loadPosts(){
  personagem[personagemId].switter.posts.forEach(post => {
    document.getElementsByClassName("feed")[0].appendChild(create("div", {className:"post", appendChild:[
      create("div", {className:"profile-info", appendChild:[
        create("div", {className:"profile-picture", style:`background-image:url("${personagem[personagemId].foto}");`}),
        create("div", {className:"profile-name", innerHTML:personagem[personagemId].nome}),
      ]}),
      create("div", {className:"post-content", innerHTML:post.conteudo})
    ]}))
  })
}
loadPosts();