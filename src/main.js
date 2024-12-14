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

const getImages = async event => {
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
    
    try {
        const data = await fetchImages(search.value.trim());
            
                if (data.hits.length === 0) {
                    return iziToast.info({
                        position: 'topRight',
                        message:
                            'Sorry, there are no images matching your search query. Please try again!',
                    });
                }
                createMarkup(data.hits);
               if (data.hits.length === 15)  loadMoreBtn.classList.remove('hidden');

            }
            .catch(error =>
                iziToast.error({ position: 'topRight', message: error.message })
            )
            .finally(() => loader.classList.add('hidden'));
    };
loadMoreBtn.addEventListener('click', async () => {
  page += 1;
    loader.classList.remove('hidden');
    loadMoreBtn.classList.add('hidden');

    try {
        const data = await fetchImages(search.value.trim());
        createMarkup(data.hits);
        if (data.hits.length === 15) loadMoreBtn.classList.remove('hidden');
        else {
            iziToast.info({
                position: 'topRight',
                title: 'End of results',
                        message:
                            'We're sorry, but you've reached the end of search results.',
                    });

        }
    }
  }
 
