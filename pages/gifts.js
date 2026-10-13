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

// EDIT THIS FILE to change gift card generation and click behaviour.
const giftContainer = document.getElementById('gifts');
giftContainer.innerHTML = birthdayConfig.gifts.map(g =>
  '<button class="giftcard" aria-expanded="false"><span class="emoji">' + g[1] +
  '</span><strong>' + escapeHtml(g[0]) + '</strong><small>Tap to reveal ✨</small></button>'
).join('');
document.querySelectorAll('.giftcard').forEach((button, index) => {
  button.addEventListener('click', () => {
    const isOpen = button.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
    button.querySelector('small').textContent = isOpen ? birthdayConfig.gifts[index][2] : 'Tap to reveal ✨';
  });
});
