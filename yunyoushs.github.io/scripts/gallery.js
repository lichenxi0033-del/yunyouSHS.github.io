// 交互式画廊 Lightbox
(function () {
  const grid = document.querySelector('.gallery-grid');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const btnClose = document.querySelector('.lightbox-close');
  const btnPrev = document.querySelector('.lightbox-prev');
  const btnNext = document.querySelector('.lightbox-next');

  if (!grid || !lightbox || !lightboxImage) return;

  const items = Array.from(grid.querySelectorAll('.gallery-item'));
  let currentIndex = -1;

  function openAt(index) {
    if (index < 0 || index >= items.length) return;
    currentIndex = index;
    const trigger = items[currentIndex];
    const full = trigger.getAttribute('data-full');
    const alt = trigger.querySelector('img')?.getAttribute('alt') || '';
    lightboxImage.src = full;
    lightboxImage.alt = alt.replace('缩略图', '大图');
    lightboxCaption.textContent = alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.removeAttribute('src');
    document.body.style.overflow = '';
    currentIndex = -1;
  }

  function showNext(delta) {
    if (currentIndex === -1) return;
    const next = (currentIndex + delta + items.length) % items.length;
    openAt(next);
  }

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.gallery-item');
    if (!btn) return;
    const index = items.indexOf(btn);
    openAt(index);
  });

  btnClose?.addEventListener('click', close);
  btnPrev?.addEventListener('click', () => showNext(-1));
  btnNext?.addEventListener('click', () => showNext(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      close();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'ArrowRight') showNext(1);
  });
})();


