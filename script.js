const cube = document.getElementById('cube');
const scene = document.querySelector('.scene');
const allPages = document.querySelectorAll('.page-content');

let currentBaseX = 0;
let currentBaseY = 0;
let currentBaseZ = 0;

let mouseOffsetX = 0;
let mouseOffsetY = 0;

let currentFace = 'front'; 

function triggerPulse() {
  scene.classList.remove('is-pulsing');
  
  void scene.offsetWidth; 
  
  scene.classList.add('is-pulsing');
}

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

function goToPage(targetFace, event, isSwipe = false) {
  if (event) {
    event.stopPropagation(); 
  }

  if (!isSwipe) {
    triggerPulse();
  }
  
  currentFace = targetFace; 
  
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

  let extraSpinsX = isSwipe ? 0 : getRandomSpins();
  let extraSpinsY = isSwipe ? 0 : getRandomSpins();

  let targetX = baseRotateX + extraSpinsX;
  let targetY = baseRotateY + extraSpinsY;

  currentBaseX = targetX + getRandomTilt();
  currentBaseY = targetY + getRandomTilt();
  currentBaseZ = getRandomTilt(); 

  cube.style.transition = isSwipe ? 'transform 0.6s ease-out' : 'transform 1.4s ease-in-out';
  updateCubeTransform();
  
  showContent(`content-${targetFace}`);
}

function returnToMenu(isSwipe = false) {
  if (!isSwipe) {
    triggerPulse();
  }

  currentFace = 'front';
  
  let extraSpinsX = isSwipe ? 0 : getRandomSpins();
  let extraSpinsY = isSwipe ? 0 : getRandomSpins();
  
  let targetX = 0 + extraSpinsX;
  let targetY = 0 + extraSpinsY;
  
  currentBaseX = targetX + getRandomTilt();
  currentBaseY = targetY + getRandomTilt();
  currentBaseZ = getRandomTilt();

  cube.style.transition = isSwipe ? 'transform 0.6s ease-out' : 'transform 1.4s ease-in-out';
  updateCubeTransform();
  showContent('content-front');
}

// MOUSE TRACKING

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

// TOUCH / SWIPE STYRING (MOBIL)

let touchStartX = 0;
let touchStartY = 0;

scene.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
  
  cube.style.transition = 'transform 0.1s ease-out';
}, {passive: true});

scene.addEventListener('touchmove', (e) => {
  let touchMoveX = e.changedTouches[0].screenX;
  let touchMoveY = e.changedTouches[0].screenY;
  
  let deltaX = touchMoveX - touchStartX;
  let deltaY = touchMoveY - touchStartY;
  
  let tempX = currentBaseX - (deltaY * 0.5); 
  let tempY = currentBaseY + (deltaX * 0.5); 
  
  cube.style.transform = `translateZ(calc(var(--half-size) * -1)) rotateX(${tempX}deg) rotateY(${tempY}deg) rotateZ(${currentBaseZ}deg)`;
}, {passive: true});

scene.addEventListener('touchend', (e) => {
  let touchEndX = e.changedTouches[0].screenX;
  let touchEndY = e.changedTouches[0].screenY;
  
  let deltaX = touchEndX - touchStartX;
  let deltaY = touchEndY - touchStartY;
  
  let threshold = 50; 
  
  if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horisontalt
      if (deltaX > 0) handleSwipeDirection('right');
      else handleSwipeDirection('left');
    } else {
      // Vertikalt
      if (deltaY > 0) handleSwipeDirection('down');
      else handleSwipeDirection('up');
    }
  } else {
    mouseOffsetX = 0;
    mouseOffsetY = 0;
    cube.style.transition = 'transform 0.5s ease-out';
    updateCubeTransform();
  }
});

function handleSwipeDirection(direction) {
  let nextFace = currentFace;
  
  if (currentFace === 'front') {
    if (direction === 'left') nextFace = 'right';
    if (direction === 'right') nextFace = 'left';
    if (direction === 'up') nextFace = 'bottom';
    if (direction === 'down') nextFace = 'top';
  } 
  else if (currentFace === 'right') {
    if (direction === 'left') nextFace = 'back';
    if (direction === 'right') nextFace = 'front';
  }
  else if (currentFace === 'left') {
    if (direction === 'left') nextFace = 'front';
    if (direction === 'right') nextFace = 'back';
  }
  else if (currentFace === 'back') {
    if (direction === 'left') nextFace = 'left';
    if (direction === 'right') nextFace = 'right';
  }
  else if (currentFace === 'top') {
    if (direction === 'down') nextFace = 'back';
    if (direction === 'up') nextFace = 'front';
  }
  else if (currentFace === 'bottom') {
    if (direction === 'down') nextFace = 'front';
    if (direction === 'up') nextFace = 'back';
  }

  if (nextFace === 'front') {
    returnToMenu(true);
  } else {
    goToPage(nextFace, null, true);
  }
}

returnToMenu();