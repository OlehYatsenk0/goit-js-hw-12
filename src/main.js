
import './css/styles.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader
} from './js/render-functions.js';

const form = document.getElementById('search-form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(form);
  const query = (formData.get('search-text') || '').trim();

  if (!query) {
    iziToast.warning({
      title: 'Упс…',
      message: 'Введіть пошукове слово.',
      timeout: 2500,
      position: 'topRight'
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      const hits = Array.isArray(data?.hits) ? data.hits : [];

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
    })
    .catch(() => {
      iziToast.error({
        title: 'Помилка',
        message: 'Сталася помилка під час запиту. Спробуйте пізніше.',
        timeout: 3000,
        position: 'topRight'
      });
    })
    .finally(() => {
      hideLoader();
    });
});
