import axios from 'axios';

const API_KEY = '51718020-504e1b86ae47f9489a580fda2';
const API_URL = 'https://pixabay.com/api/';

axios.defaults.baseURL = API_URL;

export function getImagesByQuery(query, page = 1, perPage = 15) {
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