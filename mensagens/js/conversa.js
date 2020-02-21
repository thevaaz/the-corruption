(function loadConversa(){
  let url = new URL(window.location);
  let personagemId = url.searchParams.get("personagemId")
  document.getElementsByClassName("app-name")[0].innerHTML = personagem[personagemId].nome;
  document.getElementsByClassName("profile-picture")[0].style.backgroundImage = `url('${personagem[personagemId].foto}')`;
  document.getElementById("info").addEventListener("click", () => {
    window.location.href = "./perfil.html?personagemId=" + personagemId;
  });
})()