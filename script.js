const cube = document.getElementById('cube');

function goToPage(targetFace, event) {
  event.stopPropagation(); 
  
  let rotateX = 0;
  let rotateY = 0;

  switch (targetFace) {
    case 'right': rotateY = -90;  break;
    case 'back':  rotateY = -180; break;
    case 'left':  rotateY = 90;   break;
    case 'top':   rotateX = -90;  break;
    case 'bottom':rotateX = 90;   break;
  }

  cube.style.transform = `translateZ(calc(var(--half-size) * -1)) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}


function returnToMenu() {
  cube.style.transform = `translateZ(calc(var(--half-size) * -1)) rotateX(0deg) rotateY(0deg)`;
}