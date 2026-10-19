const cube = document.getElementById('cube');
const allPages = document.querySelectorAll('.page-content');


function showContent(targetId) {
  allPages.forEach(page => {
    page.classList.remove('is-active');
  });
  
  document.getElementById(targetId).classList.add('is-active');
}


function goToPage(targetFace, event) {
  event.stopPropagation(); 
  
  let rotateX = 0;
  let rotateY = 0;

  switch (targetFace) {
    case 'front': rotateX = 0;    rotateY = 0;    break;
    case 'right': rotateY = -90;  break;
    case 'back':  rotateY = -180; break;
    case 'left':  rotateY = 90;   break;
    case 'top':   rotateX = -90;  break;
    case 'bottom':rotateX = 90;   break;
  }

  cube.style.transform = `translateZ(calc(var(--half-size) * -1)) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  showContent(`content-${targetFace}`);
}

function returnToMenu() {
  cube.style.transform = `translateZ(calc(var(--half-size) * -1)) rotateX(0deg) rotateY(0deg)`;
}