let apps = document.getElementsByClassName('apps');
let exp = document.getElementById('exp');
function pagina(e){
  if(e.getAttribute('data-pagina') == "switter"){
    setTimeout(function(){window.location.href = "/switter/"},320);
  }
  if(e.getAttribute('data-pagina') == "mensagens"){
    setTimeout(function(){window.location.href = "/mensagens/"},320);
  }
  if(e.getAttribute('data-pagina') == "noticias"){
    setTimeout(function(){window.location.href = "/noticias/"},320);
  }
}
window.onload = function sumir(){
  if(!localStorage.getItem("sumiu")){
    document.getElementsByClassName("telafull")[0].style.display="block";
  }
};
for(let i = 0; i < apps.length; i++){
  apps[i].addEventListener("click", function expandir(){
    exp.style.left = `${this.offsetLeft}px`;
    exp.style.top = `${this.offsetTop}px`;
    exp.style.display = "flex";
    setTimeout(function(){exp.style.display='none'},2000)
  })
}
if(document.querySelector(".reveal")){
  (function loadTheCorruption(){
    let duration = 0.8;
    let delay = 0.3;
    let revealText = document.querySelector(".reveal");
    let letters = revealText.textContent.split("");
    let tcLoading = document.getElementsByClassName("tc-loading")[0];
    revealText.textContent = "";
    let middle = letters.filter(e => e !== " ").length / 2;
    let tcOpacity = 9;
    letters.forEach((letter, i) => {
      let span = document.createElement("span");
      span.textContent = letter;
      span.style.animationDelay = `${delay + Math.abs(i - middle) * 0.1}s`;
      revealText.append(span);
    });
    setTimeout(function(){
      let intOp = setInterval(function(){
        tcLoading.style.opacity = '0.'+tcOpacity;
        if(tcOpacity > 0){
          tcOpacity--;
        }else{
          tcLoading.style.display = 'none';
          clearInterval(intOp);
        }
      }, 30);
    }, 3500);
  })();
}
