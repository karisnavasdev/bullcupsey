document.addEventListener('DOMContentLoaded', () => {
  const bullRain = document.querySelector('.bull-rain');
  const emojis = ['🐂', '☕', '📈', '🚀', '💎', '🔥'];
  for (let i = 0; i < 20; i++) {
    const span = document.createElement('span');
    span.textContent = emojis[i % emojis.length];
    span.style.left = `${Math.random() * 100}%`;
    span.style.animationDuration = `${8 + Math.random() * 12}s`;
    span.style.animationDelay = `${Math.random() * 10}s`;
    span.style.fontSize = `${1 + Math.random() * 1.5}rem`;
    bullRain.appendChild(span);
  }

  const copyBtn = document.getElementById('copyCa');
  const caText = document.getElementById('caText');
  const toast = document.getElementById('caToast');

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(caText.textContent);
      toast.classList.add('show');
      copyBtn.querySelector('span').textContent = 'COPIED!';
      setTimeout(() => {
        toast.classList.remove('show');
        copyBtn.querySelector('span').textContent = 'COPY';
      }, 2000);
    } catch {
      const range = document.createRange();
      range.selectNode(caText);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2000);
    }
  });

  const mascot = document.getElementById('heroMascot');
  const bullImages = [
    'assets/bull1.png', 'assets/bull2.png', 'assets/bull3.png',
    'assets/bull4.png', 'assets/bull5.png', 'assets/bull6.png', 'assets/bull7.png'
  ];
  let mascotIndex = 0;

  mascot.addEventListener('click', () => {
    mascotIndex = (mascotIndex + 1) % bullImages.length;
    mascot.style.transform = 'scale(0) rotate(180deg)';
    setTimeout(() => {
      mascot.src = bullImages[mascotIndex];
      mascot.style.transform = '';
    }, 300);
  });

  const burger = document.querySelector('.nav-burger');
  const nav = document.querySelector('.nav');
  burger.addEventListener('click', () => nav.classList.toggle('open'));

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      currentIndex = parseInt(item.dataset.index);
      lightboxImg.src = bullImages[currentIndex];
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.getElementById('lightboxPrev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + bullImages.length) % bullImages.length;
    lightboxImg.src = bullImages[currentIndex];
  });

  document.getElementById('lightboxNext').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % bullImages.length;
    lightboxImg.src = bullImages[currentIndex];
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + bullImages.length) % bullImages.length;
      lightboxImg.src = bullImages[currentIndex];
    }
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % bullImages.length;
      lightboxImg.src = bullImages[currentIndex];
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.about-card, .gallery-item, .token-card, .roadmap-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
