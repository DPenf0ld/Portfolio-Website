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

    document.getElementById('redirectBtn').addEventListener('click', () => {
    window.location.href = 'home.html';
  });
});

