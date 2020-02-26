function loadPerfil(personagemId = new URL(window.location).searchParams.get("personagemId")){
  document.getElementsByClassName("profile-picture")[0].style.backgroundImage = `url("${personagem[personagemId].foto}")`;
  document.getElementsByClassName("profile-name")[0].innerHTML = personagem[personagemId].nome;
  document.getElementsByClassName("profile-age")[0].innerHTML = `Idade: ${personagem[personagemId].idade}`;
  document.getElementsByClassName("profile-birth-day")[0].innerHTML = `Aniversario: ${personagem[personagemId].aniversario}`;
}

loadPerfil()
