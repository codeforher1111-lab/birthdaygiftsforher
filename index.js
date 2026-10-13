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

  // Load the correct song for this page
  const rootPrefix = window.location.pathname.includes('/pages/')
    ? '../'
    : '';

  const index = Number(document.body.dataset.song || 0);
  audio.src = rootPrefix + 'assets/audio/' +
    birthdayConfig.songs[index];

  audio.load();

  // Try automatic playback
  window.addEventListener('load', async () => {
    try {
      await audio.play();
      button.textContent = '♫ Music: On';
    } catch (error) {
      button.textContent = '♫ Tap to Start Music';
    }
  });

  // Music button: play or pause
  button.addEventListener('click', async () => {
    if (audio.paused) {
      try {
        await audio.play();
        button.textContent = '♫ Music: On';
      } catch (error) {
        button.textContent = '♫ Tap to Start Music';
      }
    } else {
      audio.pause();
      button.textContent = '♫ Music: Off';
    }
  });
})();


// EDIT THIS FILE to change how the welcome page behaves.
document.getElementById('herName').textContent = birthdayConfig.herName;
