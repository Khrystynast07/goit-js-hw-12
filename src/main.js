import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';

const form = document.querySelector('.form-search');
export const list = document.querySelector('.image-list');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.button-to-load');

let query = '';
let page = 1;

form.addEventListener('submit', getImages);
loadMoreBtn.addEventListener('click', loadMore);

async function getImages(event) {
  event.preventDefault();

  const { search } = event.currentTarget.elements;
  if (search.value.trim() === '') {
    return iziToast.error({
      position: 'topRight',
      message: 'Please fill in the field',
    });
  }
  list.innerHTML = '';
  page = 1;
  loadMoreBtn.classList.add('hidden');
  loader.classList.remove('hidden');
  query = search.value.trim();
  try {
    const data = await fetchImages(query, page);

    if (data.hits.length === 0) {
      return iziToast.info({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
    createMarkup(data.hits);
    form.reset();
    if (data.hits.length === 15) {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    iziToast.error({ position: 'topRight', message: error.message });
  } finally {
    loader.classList.add('hidden');
  }
}

async function loadMore() {
  page += 1;
  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query, page);
    createMarkup(data.hits);

    if (Math.ceil(data.totalHits / 15) === page) {
      loadMoreBtn.classList.add('hidden');

      iziToast.info({
        position: 'topRight',
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({ position: 'topRight', message: error.message });
  } finally {
    loader.classList.add('hidden');
  }
}
