function loadPerfil(personagemId = new URL(window.location).searchParams.get("personagemId")){
  document.getElementsByClassName("profile-picture")[0].style.backgroundImage = `url("${personagem[personagemId].foto}")`;
  document.getElementsByClassName("profile-name")[0].innerHTML = personagem[personagemId].nome;
  document.getElementsByClassName("profile-age")[0].innerHTML = `Idade: ${personagem[personagemId].idade}`;
  document.getElementsByClassName("profile-birth-day")[0].innerHTML = `Aniversário: ${personagem[personagemId].aniversario}`;
  document.getElementsByClassName("profile-about")[0].innerHTML = personagem[personagemId].switter.descrição;
}
loadPerfil();

function loadPosts(){
  let posts = personagem[personagemId].switter.posts.sort((a, b) => b.data - a.data);
  posts.forEach(post => {
    let data = new Date(Number(post.data))
    let dia = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
    let mes = (data.getMonth() + 1) < 10 ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1);
    let ano = data.getFullYear();

    document.getElementsByClassName("feed")[0].appendChild(create("div", {className:"post", appendChild:[
      create("div", {className:"profile-info", appendChild:[
        create("div", {className:"profile-picture", style:`background-image:url("${personagem[personagemId].foto}");`}),
        create("div", {className:"post-info", appendChild:[create("div", {className:"profile-name", innerHTML:personagem[personagemId].nome}),
        create("div", {className:"post-date", innerHTML:`${dia}/${mes}/${ano}`})]})
      ]}),
      create("div", {className:"post-content", innerHTML:post.conteudo})
    ]}))
  })
}
loadPosts();