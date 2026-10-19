const cube = document.getElementById('cube');
const allPages = document.querySelectorAll('.page-content');

function showContent(targetId) {
  allPages.forEach(page => {
    page.classList.remove('is-active');
  });
  document.getElementById(targetId).classList.add('is-active');
}

function getRandomTilt() {
  return (Math.random() * 16) - 18; 
}

function getRandomSpins() {
  const spins = [-360, 0, 360];
  return spins[Math.floor(Math.random() * spins.length)];
}

function goToPage(targetFace, event) {
  if (event) {
    event.stopPropagation(); 
  }
  
  let baseRotateX = 0;
  let baseRotateY = 0;

  switch (targetFace) {
    case 'front':  baseRotateX = 0;    baseRotateY = 0;    break;
    case 'right':  baseRotateX = 0;    baseRotateY = -90;  break;
    case 'back':   baseRotateX = 0;    baseRotateY = -180; break;
    case 'left':   baseRotateX = 0;    baseRotateY = 90;   break;
    case 'top':    baseRotateX = -90;  baseRotateY = 0;    break;
    case 'bottom': baseRotateX = 90;   baseRotateY = 0;    break;
  }

  let targetX = baseRotateX + getRandomSpins();
  let targetY = baseRotateY + getRandomSpins();

  let finalX = targetX + getRandomTilt();
  let finalY = targetY + getRandomTilt();
  let finalZ = getRandomTilt(); 

  cube.style.transform = `translateZ(calc(var(--half-size) * -1)) rotateX(${finalX}deg) rotateY(${finalY}deg) rotateZ(${finalZ}deg)`;
  
  showContent(`content-${targetFace}`);
}

function returnToMenu() {
  let targetX = 0 + getRandomSpins();
  let targetY = 0 + getRandomSpins();
  
  let finalX = targetX + getRandomTilt();
  let finalY = targetY + getRandomTilt();
  let finalZ = getRandomTilt();

  cube.style.transform = `translateZ(calc(var(--half-size) * -1)) rotateX(${finalX}deg) rotateY(${finalY}deg) rotateZ(${finalZ}deg)`;
}

returnToMenu();