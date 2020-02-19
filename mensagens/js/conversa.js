function loadConversa(){
  let url = new URL(window.location);
  let personagemId = url.searchParams.get("personagemId")
  document.getElementsByClassName("app-name")[0].innerHTML = personagem[personagemId].nome;
}
loadConversa();