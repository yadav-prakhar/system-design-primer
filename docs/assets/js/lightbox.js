(function() {
  'use strict';

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Image viewer');
  lightbox.innerHTML = `
    <div class="lightbox-overlay"></div>
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close image viewer">&times;</button>
      <div class="lightbox-loader">Loading...</div>
      <img class="lightbox-image" alt="" />
      <div class="lightbox-caption"></div>
    </div>
  `;

  document.body.appendChild(lightbox);

  const overlay = lightbox.querySelector('.lightbox-overlay');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const image = lightbox.querySelector('.lightbox-image');
  const caption = lightbox.querySelector('.lightbox-caption');
  const loader = lightbox.querySelector('.lightbox-loader');

  let isOpen = false;

  function open(src, alt) {
    isOpen = true;
    image.style.display = 'none';
    loader.style.display = 'block';
    caption.textContent = alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    const img = new Image();
    img.onload = function() {
      image.src = src;
      image.style.display = 'block';
      loader.style.display = 'none';
    };
    img.onerror = function() {
      loader.textContent = 'Failed to load image';
    };
    img.src = src;
    closeBtn.focus();
  }

  function close() {
    isOpen = false;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    image.src = '';
  }

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);

  document.addEventListener('keydown', function(e) {
    if (isOpen && e.key === 'Escape') {
      close();
    }
  });

  function init() {
    const diagrams = document.querySelectorAll('img.diagram');
    diagrams.forEach(function(img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function() {
        open(img.src, img.alt);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
