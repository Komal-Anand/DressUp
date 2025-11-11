// script.js for Komal Fashion

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for nav links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Category card click scroll
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
      window.scrollTo({ top: document.querySelector('#features').offsetTop, behavior: 'smooth' });
    });
  });

  // CTA button scroll
  const cta = document.querySelector('.cta');
  if (cta) {
    cta.addEventListener('click', function() {
      document.querySelector('#categories').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // --- Slider Logic for Category Sections ---
  const sliders = {
    clothes: 0,
    accessories: 0,
    shoes: 0
  };
  const maxVisible = 3;
  let sliderData = {};

  function updateSlider(category) {
    const items = sliderData[category];
    const start = sliders[category];
    items.forEach((item, idx) => {
      if (idx >= start && idx < start + maxVisible) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  function slideItems(category, dir) {
    const items = sliderData[category];
    const maxIdx = items.length - maxVisible;
    sliders[category] += dir;
    if (sliders[category] < 0) sliders[category] = 0;
    if (sliders[category] > maxIdx) sliders[category] = maxIdx;
    updateSlider(category);
  }

  // Initialize sliders after DOM is ready
  sliderData = {
    clothes: Array.from(document.querySelectorAll('#clothes-slider .slider-item')),
    accessories: Array.from(document.querySelectorAll('#accessories-slider .slider-item')),
    shoes: Array.from(document.querySelectorAll('#shoes-slider .slider-item'))
  };
  ['clothes', 'accessories', 'shoes'].forEach(cat => updateSlider(cat));

  // Arrow button event listeners (for dynamic DOM)
  document.querySelectorAll('.slider-arrow.left').forEach(btn => {
    btn.addEventListener('click', function() {
      const parent = btn.closest('.item-slider');
      if (parent) {
        if (parent.id === 'clothes-slider') slideItems('clothes', -1);
        if (parent.id === 'accessories-slider') slideItems('accessories', -1);
        if (parent.id === 'shoes-slider') slideItems('shoes', -1);
      }
    });
  });
  document.querySelectorAll('.slider-arrow.right').forEach(btn => {
    btn.addEventListener('click', function() {
      const parent = btn.closest('.item-slider');
      if (parent) {
        if (parent.id === 'clothes-slider') slideItems('clothes', 1);
        if (parent.id === 'accessories-slider') slideItems('accessories', 1);
        if (parent.id === 'shoes-slider') slideItems('shoes', 1);
      }
    });
  });

  // CTA button scroll
  var ctaBtn = document.querySelector('.cta');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', function() {
      document.getElementById('clothes-section').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Product popup logic
  document.querySelectorAll('.slider-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      const img = item.querySelector('img').src;
      const name = item.querySelector('.item-name').textContent;
      const price = item.querySelector('.item-price').textContent;
      showProductPopup(img, name, price);
    });
  });
});

// Popup logic
function showProductPopup(img, name, price) {
  let popup = document.getElementById('product-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'product-popup';
    popup.innerHTML = `
      <div class="popup-content">
        <span class="popup-close">&times;</span>
        <img class="popup-img" src="" alt="Product">
        <div class="popup-name"></div>
        <div class="popup-price"></div>
        <button class="popup-cart-btn">Add to Cart</button>
      </div>
    `;
    document.body.appendChild(popup);
    popup.querySelector('.popup-close').onclick = () => popup.style.display = 'none';
    popup.onclick = e => { if (e.target === popup) popup.style.display = 'none'; };
  }
  popup.querySelector('.popup-img').src = img;
  popup.querySelector('.popup-name').textContent = name;
  popup.querySelector('.popup-price').textContent = price;
  popup.style.display = 'flex';
}
