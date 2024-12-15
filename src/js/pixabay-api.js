import axios from 'axios';

const API_KEY = '47393143-e8759780233395bfabd4940e8';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 15,
  });

  const { data } = await axios.get(`${BASE_URL}?${params}`);
  return data;
};
