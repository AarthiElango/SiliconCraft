// initHighlights.js
import { renderContent } from './cards.js';

document.addEventListener('DOMContentLoaded', () => {
  renderContent('partnerships', 'mous-content');
  renderContent('seminars', 'events-content');
  renderContent('awards', 'awards-content');
});

function renderContent(category, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const data = mouData[category];
  let html = '';
  
  data.forEach((item, index) => {
    const isEven = index % 2 === 0;
    
    html += `
      <div class="row mb-5 ${isEven ? '' : 'flex-row-reverse'}">
        
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          <div id="carousel-${category}-${item.id}" class="carousel slide card overflow-hidden" data-bs-ride="carousel">
            <div class="carousel-inner">
              ${item.images.map((img, imgIndex) => `
                <div class="carousel-item ${imgIndex === 0 ? 'active' : ''}" data-img-src="${img}">
                  <img src="${img}" class="d-block w-100" alt="${item.title}" style="cursor: pointer; object-fit: cover; height: 300px;">
                </div>
              `).join('')}
            </div>
            ${item.images.length > 1 ? `
              <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${category}-${item.id}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carousel-${category}-${item.id}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
              <div class="carousel-indicators">
                ${item.images.map((_, imgIndex) => `
                  <button type="button" data-bs-target="#carousel-${category}-${item.id}" data-bs-slide-to="${imgIndex}" ${imgIndex === 0 ? 'class="active" aria-current="true"' : ''} aria-label="Slide ${imgIndex + 1}"></button>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
        
        <!-- Content Column -->
        <div class="col-12 col-md-8">
          <div class="card border-0 h-100">
            <div class="card-body">
              <h4 class="card-title fw-bold mb-3">${item.title}</h4>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="badge bg-primary">${item.date}</span>
              </div>
              <p class="card-text text-muted">${item.description}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  
  // Add click listeners to carousel images for lightbox
  setupImageClickListeners(containerId);
}

function setupImageClickListeners(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const carouselImages = container.querySelectorAll('.carousel-item img');
  const lightboxModal = new bootstrap.Modal(document.getElementById('imageLightboxModal'));
  const lightboxImage = document.getElementById('lightboxImage');
  
  carouselImages.forEach(img => {
    img.addEventListener('click', function() {
      const src = this.src;
      lightboxImage.src = src;
      lightboxModal.show();
    });
  });
}