import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.getElementById('gallery');
const loaderBackdrop = document.getElementById('loader');

// Ініціалізація SimpleLightbox один раз
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 200
});

/**
 * Додає картки в галерею та оновлює Lightbox.
 * @param {Array} images
 */
export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
      }) => `
      <li class="card">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${escapeHtml(tags)}" loading="lazy" />
        </a>
        <div class="meta">
          <span>Likes: ${likes}</span>
          <span>Views: ${views}</span>
          <span>Comments: ${comments}</span>
          <span>Downloads: ${downloads}</span>
        </div>
      </li>
    `
    )
    .join('');

  // ОДНА операція в DOM
  galleryEl.insertAdjacentHTML('beforeend', markup);

  // Оновити lightbox
  lightbox.refresh();
}

/** Очищає галерею. */
export function clearGallery() {
  galleryEl.innerHTML = '';
}

/** Показати лоадер. */
export function showLoader() {
  loaderBackdrop.classList.add('is-visible');
  loaderBackdrop.setAttribute('aria-hidden', 'false');
}

/** Сховати лоадер. */
export function hideLoader() {
  loaderBackdrop.classList.remove('is-visible');
  loaderBackdrop.setAttribute('aria-hidden', 'true');
}

function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
