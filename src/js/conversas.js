window.onload = function janelaConversa(dataId){
  if(!localStorage.getItem(document.body.id)){
    var tel = personagemID();
    var per = personagem[tel];
    document.body.innerHTML += `
      <div class="header preto">
        <button id="voltar" class="btnbarranf" onclick="window.location.href='/mensagens/'"><i class="fas fa-angle-left"></i> <div class="perfilcon" style="background-image: url(${per.imagem});"></div></button>
        <div class="ncon" onclick="document.getElementsByClassName('detalhes')[0].style.visibility='visible'">${per.nome}</div>
      </div>
      <div class="dialogos" id="d${tel}"></div>
      <div class="digitando" id="e${tel}">${personagem[tel].nome} está digitando...</div>
      <div class="barra-de-msg">
        <div class="escbox" id="esc${tel}">
          <a class="esc" data-escolha="0" data-id="${tel}" data-atual="${per.dialogos[0].atual}" data-next="${per.dialogos[0].nx[0]}" onclick="escolher(this)">${per.dialogos[0].op[0]}</a>
          <a class="esc" data-escolha="1" data-id="${tel}" data-atual="${per.dialogos[0].atual}" data-next="${per.dialogos[0].nx[1]}" onclick="escolher(this)">${per.dialogos[0].op[1]}</a>
        </div>
        <div class="barrinha" id='barrinha' onclick='displayEsc()'>Mensagem aqui...</div>
        <div class='botao-de-envio' onclick='enviar()'><i class="fas fa-paper-plane"></i></div>
      </div>
      <div class="detalhes">
        <div class="header preto">
          <button class="btnbarranf" onclick="document.getElementsByClassName('detalhes')[0].style.visibility = 'hidden'">
            <i class="fas fa-angle-left"></i>
            <div class="perfilcon" style="background-image: url(${per.imagem});"></div></button>
          <div class="ncon">${per.nome}</div>
        </div>
        <div class="container-detalhes">
          <div class="imagem-detalhes">
            <div style="background-image: url(${per.imagem});"></div>
          </div>
          <div class="nome-detalhes">${per.nome}</div>
          <div class="mais-detalhes">
            <div><span>Telefone</span><span>${per.id}</span></div>
            <div><span>Idade</span><span>${per.idade} anos</span></div>
          </div>
        </div>
      </div>`;
    localStorage.setItem(document.body.id, document.body.innerHTML);
  }else{
    document.body.innerHTML = localStorage.getItem(document.body.id);
  }
};
