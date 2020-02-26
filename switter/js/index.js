function loadPosts(){
  let postagens = []
  
  config.personagensConhecidos.forEach(conhecido => {
    console.log(conhecido);
    personagem[conhecido].switter.posts.forEach(post => {
      post.id = conhecido;
      postagens.push(post);
    });
  });

  let posts = postagens.sort((a, b) => b.data - a.data);
  posts.forEach(post => {
    let data = new Date(Number(post.data));
    let dia = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
    let mes = (data.getMonth() + 1) < 10 ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1);
    let ano = data.getFullYear();

    document.getElementsByClassName("feed")[0].appendChild(create("div", {className:"post", appendChild:[
      create("div", {className:"profile-info", appendChild:[
        create("div", {className:"profile-picture", style:`background-image:url("${personagem[post.id].foto}");`}),
        create("div", {className:"post-info", appendChild:[create("div", {className:"profile-name", innerHTML:personagem[post.id].nome}),
        create("div", {className:"post-date", innerHTML:`${dia}/${mes}/${ano}`})]})
      ]}),
      create("div", {className:"post-content", innerHTML:post.conteudo})
    ]}))
  })
}
loadPosts();