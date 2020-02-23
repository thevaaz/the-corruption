function loadPerfil(personagemId = new URL(window.location).searchParams.get("personagemId")){
  document.getElementsByClassName("app-name")[0].innerHTML = personagem[personagemId].nome;
  document.getElementById("name").innerHTML = personagem[personagemId].nome;
  document.getElementById("number").innerHTML = personagemId;
  document.getElementById("status").innerHTML = personagem[personagemId].save.ultimoStatus;
  document.getElementById("social-media").innerHTML = `<a href="/switter/perfil.html?personagemId=${personagemId}">Switter</a>`;
  document.getElementsByClassName("profile-picture")[0].style.backgroundImage = `url('${personagem[personagemId].foto}')`;
  document.getElementsByClassName("profile-picture")[1].style.backgroundImage = `url('${personagem[personagemId].foto}')`;
}
loadPerfil()