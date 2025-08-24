import axios from 'axios';

const API_KEY = '51718020-504e1b86ae47f9489a580fda2';
const API_URL = 'https://pixabay.com/api/';

axios.defaults.baseURL = API_URL;

/**
 * Отримує зображення з Pixabay за запитом користувача.
 * @param {string} query - Пошуковий запит.
 * @param {number} page - Номер сторінки.
 * @param {number} perPage - Кількість результатів на сторінку (default: 15).
 * @returns {Promise<Object>} Об'єкт даних з API.
 */
export async function getImagesByQuery(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get('', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}