// pixabay-api.js
import axios from 'axios';

//  API-ключ вставлен прямо в код
const API_KEY = '51718020-504e1b86ae47f9489a580fda2';
const API_URL = 'https://pixabay.com/api/';

axios.defaults.baseURL = API_URL;

/**
 * HTTP-запит до Pixabay за ключовим словом.
 * @param {string} query - Пошуковий запит
 * @param {number} page - Номер сторінки (за замовчуванням 1)
 * @param {number} perPage - Кількість зображень на сторінку (за замовчуванням 40)
 * @returns {Promise<Object>} - Дані з Pixabay API
 */
export function getImagesByQuery(query, page = 1, perPage = 40) {
  return axios
    .get('', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage
      }
    })
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
}
