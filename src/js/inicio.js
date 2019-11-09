let apps = document.getElementsByClassName('apps');
let exp = document.getElementById('exp');

for(let i = 0; i < apps.length; i++){
  apps[i].addEventListener("click", function expandir(){
    exp.style.left = `${this.offsetLeft}px`;
    exp.style.top = `${this.offsetTop}px`;
    exp.style.display = "flex";
    setTimeout(function(){exp.style.display='none'},2000)
  })
}
