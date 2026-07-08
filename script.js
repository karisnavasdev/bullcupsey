document.addEventListener('DOMContentLoaded', () => {
  const bullImages = [
    'assets/bull1.png', 'assets/bull2.png', 'assets/bull3.png',
    'assets/bull4.png', 'assets/bull5.png', 'assets/bull6.png', 'assets/bull7.png'
  ];

  const artNames = [
    '01 — mooo (classic)',
    '02 — the flex',
    '03 — pure menace',
    '04 — no thoughts, head empty (mood)',
    '05 — send it (no cap)',
    '06 — horny hours only',
    '07 — lfg or ngmi'
  ];

  const copyToasts = [
    'copied. go get horny with gains 🐂',
    'ca copied. now ape responsibly (or dont)',
    '7aD86TAvoXPBAkt7HxGsz3MG8UBdDUvcVeBLouVcpump is in ur clipboard. moo.',
    'paste it. buy it. become the bull.',
    'nice. u copied the funny bull address'
  ];

  const bullQuips = [
    'moo 🐂', 'horn activated', 'cup full', 'send it',
    'bear detected. eliminating.', 'brain empty chart happy',
    'wagmi (probably)', 'this is the way', 'bull run loading...'
  ];

  // Copy CA
  const copyBtn = document.getElementById('copyCa');
  const caText = document.getElementById('caText');
  const toast = document.getElementById('caToast');

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(caText.textContent);
    } catch {
      const range = document.createRange();
      range.selectNode(caText);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
    }
    toast.textContent = copyToasts[Math.floor(Math.random() * copyToasts.length)];
    toast.classList.add('show');
    copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> got it';
    setTimeout(() => {
      toast.classList.remove('show');
      copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';
    }, 2200);
  });

  // Mascot cycle
  const mascot = document.getElementById('heroMascot');
  let idx = 0;

  mascot.addEventListener('click', () => {
    idx = (idx + 1) % bullImages.length;
    mascot.style.opacity = '0';
    mascot.style.transform = 'scale(0.85) rotate(12deg)';
    setTimeout(() => {
      mascot.src = bullImages[idx];
      mascot.style.opacity = '1';
      mascot.style.transform = '';
      mascot.title = bullQuips[idx % bullQuips.length];
    }, 180);
  });

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const header = document.querySelector('.site-header');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', open);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => header.classList.remove('nav-open'));
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => revealObserver.observe(el));

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const pieces = document.querySelectorAll('.gallery-piece');
  let current = 0;

  function showPiece(index) {
    current = index;
    lightboxImg.src = bullImages[current];
    lightboxCaption.textContent = artNames[current];
  }

  pieces.forEach(piece => {
    piece.addEventListener('click', () => {
      showPiece(parseInt(piece.dataset.index));
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const close = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.getElementById('lightboxClose').addEventListener('click', close);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

  document.getElementById('lightboxPrev').addEventListener('click', e => {
    e.stopPropagation();
    showPiece((current - 1 + bullImages.length) % bullImages.length);
  });

  document.getElementById('lightboxNext').addEventListener('click', e => {
    e.stopPropagation();
    showPiece((current + 1) % bullImages.length);
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') showPiece((current - 1 + bullImages.length) % bullImages.length);
    if (e.key === 'ArrowRight') showPiece((current + 1) % bullImages.length);
  });

  window.addEventListener('scroll', () => {
    header.style.background = window.scrollY > 60
      ? 'rgba(8, 8, 15, 0.92)'
      : 'rgba(8, 8, 15, 0.7)';
  }, { passive: true });
});
