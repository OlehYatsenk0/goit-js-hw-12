import './css/styles.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';

const form = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(form);
  query = (formData.get('search-text') || '').trim();

  if (!query) {
    iziToast.warning({
      title: 'Упс…',
      message: 'Введіть пошукове слово.',
      timeout: 2500,
      position: 'topRight'
    });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    const hits = Array.isArray(data?.hits) ? data.hits : [];
    totalHits = data?.totalHits || 0;

    if (hits.length === 0) {
      iziToast.info({
        title: 'Немає збігів',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        timeout: 3000,
        position: 'topRight'
      });
      return;
    }

    createGallery(hits);

    if (totalHits > hits.length) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Сталася помилка під час запиту. Спробуйте пізніше.',
      timeout: 3000,
      position: 'topRight'
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);
    const hits = Array.isArray(data?.hits) ? data.hits : [];

    createGallery(hits);

    const totalPages = Math.ceil(totalHits / 15);
    if (page >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        timeout: 3000,
        position: 'topRight'
      });
    } else {
      showLoadMoreButton();
    }

    const { height: cardHeight } = document
      .querySelector('.gallery li')
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth'
    });
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити більше зображень.',
      timeout: 3000,
      position: 'topRight'
    });
  } finally {
    hideLoader();
  }
});