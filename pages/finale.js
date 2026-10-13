// Page-local helpers: these are intentionally duplicated so each page can be edited independently.
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"\'":'&#39;'}[c]));
}
(function addFloatingDecor() {
  const decor = document.getElementById('decor');
  if (!decor) return;
  for (let i=0; i<22; i++) {
    const item = document.createElement('span');
    item.textContent = ['♡','✦','✧','❀','·'][i % 5];
    item.style.setProperty('--x', ((i*37+7)%100)+'%');
    item.style.setProperty('--s', (12+i%4*4)+'px');
    item.style.setProperty('--t', (9+i%6)+'s');
    item.style.setProperty('--d', (-(i%9))+'s');
    decor.appendChild(item);
  }
})();
(function setupMusic() {
  const audio = document.getElementById('audio');
  const button = document.getElementById('musicButton');
  if (!audio || !button) return;
  let musicOn = false;
  button.addEventListener('click', () => {
    if (!audio.getAttribute('src')) {
      const rootPrefix = window.location.pathname.includes('/pages/') ? '../' : '';
      const index = Number(document.body.dataset.song || 0);
      audio.src = rootPrefix + 'assets/audio/' + birthdayConfig.songs[index];
    }
    if (!musicOn) {
      audio.play().then(() => { musicOn = true; button.textContent = '♫ Music: On'; })
        .catch(() => { button.textContent = '♫ Tap for Music'; });
    } else {
      audio.pause(); musicOn = false; button.textContent = '♫ Music: Off';
    }
  });
})();

// EDIT THIS FILE to change the final birthday page behaviour.
document.getElementById('herName').textContent = birthdayConfig.herName;

const partyButton = document.getElementById("partyButton");
const confettiContainer = document.getElementById("confetti-container");

function celebrateBirthday() {
  if (!partyButton || !confettiContainer) return;

  // Clear previous confetti
  confettiContainer.innerHTML = "";

  // Popper emoji burst
  const popper = document.createElement("div");
  popper.className = "party-popper";
  popper.textContent = "🎉🎊";
  document.body.appendChild(popper);

  setTimeout(() => popper.remove(), 1100);

  // Colourful falling confetti
  const colors = [
    "#ff4f87",
    "#ffd166",
    "#8a5cff",
    "#4ecdc4",
    "#ff914d",
    "#ff70d9",
    "#65a5ff"
  ];

  for (let i = 0; i < 120; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";

    piece.style.left = Math.random() * 100 + "vw";
    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.setProperty(
      "--duration",
      2.5 + Math.random() * 2.5 + "s"
    );

    piece.style.setProperty(
      "--delay",
      Math.random() * 0.8 + "s"
    );

    piece.style.setProperty(
      "--drift",
      (Math.random() - 0.5) * 300 + "px"
    );

    piece.style.setProperty(
      "--rotation",
      Math.random() * 1000 + "deg"
    );

    confettiContainer.appendChild(piece);
  }

  // Clean up after the animation
  setTimeout(() => {
    confettiContainer.innerHTML = "";
  }, 6500);
}

// Celebrate when she taps the button
partyButton?.addEventListener("click", celebrateBirthday);

// Automatic celebration when the final page opens
window.addEventListener("load", () => {
  setTimeout(celebrateBirthday, 500);
});

