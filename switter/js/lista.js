function loadList(){
  config.personagensConhecidos.forEach(id => {
    document.getElementsByClassName("profile-list")[0].appendChild(create("div", {className:"profile", onclick:`window.location.href = "./perfil.html?personagemId=${id}"`, appendChild:[
      create("div", {className:"profile-picture", style:`background-image:url("${personagem[id].foto}")`}),
      create("div", {className:"profile-name", innerHTML:personagem[id].nome})
    ]}))
  });
}
loadList();