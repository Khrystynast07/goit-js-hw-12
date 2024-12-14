import axios from 'axios';

const API_KEY = '47393143-e8759780233395bfabd4940e8';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page = 1) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 15,
  });
  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    return response.data.hits;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
};

// export function getImagesService(query) {
//   return fetch(
//     `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
