document.addEventListener("DOMContentLoaded", () => {
  // Only add event listener if toggle exists
  const toggle = document.getElementById("toggle");
  if (toggle) {
    toggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode");
    });
  }


  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function animateOutline() {
    // Move outline towards the real cursor with easing
    outlineX += (mouseX - outlineX) * 0.04;
    outlineY += (mouseY - outlineY) * 0.04;

    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateOutline);
  }

  animateOutline();


  const redirectBtn = document.getElementById('redirectBtn');
  if (redirectBtn) {
    redirectBtn.addEventListener('click', () => {
      window.location.href = 'home.html';
    });
  }
gsap.registerPlugin(ScrollTrigger);

const shape = document.querySelector('.spinning-shape');

// Infinite spin variables
let baseSpin = 360;
let boostedSpin = 960;
let spinDuration = 10;
let spinTween;
let resetTimeout;

// Start default spin
function startSpin(speed = baseSpin, duration = spinDuration) {
  if (spinTween) spinTween.kill();
  spinTween = gsap.to(shape, {
    rotationX: "+=" + speed,
    rotationY: "+=" + speed,
    duration: duration,
    ease: "linear",
    repeat: -1
  });
}

// Initial spin
startSpin();

// Smooth movement handlers
const smoothX = gsap.quickTo(shape, "x", { duration: 0.5, ease: "power3.out" });
const smoothZ = gsap.quickTo(shape, "rotationZ", { duration: 0.5, ease: "power3.out" });

// ScrollTrigger scroll-linked behavior
ScrollTrigger.create({
  trigger: document.body,
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: (self) => {
    const progress = self.progress;

    // Left-right motion
    const SCROLL_SENSITIVITY = 0.7;
    const scrollFactor = progress * Math.PI * SCROLL_SENSITIVITY;
    const sineOffset = Math.sin(scrollFactor);
    const x = sineOffset * (window.innerWidth / 2 - 100);
    smoothX(x);

    // Z rotation
    const zBoost = sineOffset * 180;
    smoothZ(zBoost);

    // Detect scroll speed
    const velocity = Math.abs(ScrollTrigger.getVelocity());

    if (velocity > 100) {
      // Increase spin temporarily
      startSpin(boostedSpin, 3); // faster, shorter loop

      // Reset back to base spin after scroll stops
      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => {
        startSpin(); // restore base speed
      }, 300); // wait 300ms of no scroll
    }
  }
});



});

