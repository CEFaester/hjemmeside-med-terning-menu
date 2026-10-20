const cube = document.getElementById('cube');
const scene = document.querySelector('.scene');
const allPages = document.querySelectorAll('.page-content');

let currentBaseX = 0;
let currentBaseY = 0;
let currentBaseZ = 0;

let mouseOffsetX = 0;
let mouseOffsetY = 0;

function showContent(targetId) {
  allPages.forEach(page => {
    page.classList.remove('is-active');
  });
  document.getElementById(targetId).classList.add('is-active');
}

function getRandomTilt() {
  return (Math.random() * 16) - 16; 
}

function getRandomSpins() {
  const spins = [-360, 0, 360];
  return spins[Math.floor(Math.random() * spins.length)];
}

function updateCubeTransform() {
  const finalX = currentBaseX + mouseOffsetY;
  const finalY = currentBaseY + mouseOffsetX;
  
  cube.style.transform = `translateZ(calc(var(--half-size) * -1)) rotateX(${finalX}deg) rotateY(${finalY}deg) rotateZ(${currentBaseZ}deg)`;
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

  currentBaseX = targetX + getRandomTilt();
  currentBaseY = targetY + getRandomTilt();
  currentBaseZ = getRandomTilt(); 

  cube.style.transition = 'transform 1.4s ease-in-out';
  updateCubeTransform();
  
  showContent(`content-${targetFace}`);
}

function returnToMenu() {
  let targetX = 0 + getRandomSpins();
  let targetY = 0 + getRandomSpins();
  
  currentBaseX = targetX + getRandomTilt();
  currentBaseY = targetY + getRandomTilt();
  currentBaseZ = getRandomTilt();

  cube.style.transition = 'transform 1.4s ease-in-out';
  updateCubeTransform();
}


scene.addEventListener('mousemove', (e) => {
  const rect = scene.getBoundingClientRect();
  
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const percentX = (e.clientX - centerX) / (rect.width / 2);
  const percentY = (e.clientY - centerY) / (rect.height / 2);
  
  const maxTilt = 12; 
  
  mouseOffsetX = percentX * maxTilt;
  mouseOffsetY = -percentY * maxTilt; 
  
  cube.style.transition = 'transform 0.1s ease-out';
  updateCubeTransform();
});

scene.addEventListener('mouseleave', () => {
  mouseOffsetX = 0;
  mouseOffsetY = 0;
  
  cube.style.transition = 'transform 0.5s ease-out';
  updateCubeTransform();
});

returnToMenu();