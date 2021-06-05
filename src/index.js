import './sass/main.scss';
var debounce = require('lodash.debounce');
import templatePhotoCard from './templates/photo-card.hbs';
import getRefs from './js/get-refs';
import ApiService from './js/api-service';

import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';

const refs = getRefs();

const apiService = new ApiService();

refs.searchQuery.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmit(evt) {
    evt.preventDefault();
      
    apiService.query = evt.currentTarget.elements.query.value;
    
    apiService.resetPage();
    
    apiService.fetchQuery().then(
        data => {
            const photosMarkup = createCardMarkup(data);
            clearArticleContainer();
            moreBtnPresence(data);
            refs.galleryContainer.insertAdjacentHTML('beforeend', photosMarkup);
        }
    ).catch(onError);
}

function onLoadMore() {
    apiService.fetchQuery().then(
        data => {
            const photosMarkup = createCardMarkup(data);
            refs.galleryContainer.insertAdjacentHTML('beforeend', photosMarkup);

            setTimeout(() => {
                refs.loadMoreBtn.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                });
                
            }, 1000);

        }
    ).catch(onError);
}


function createCardMarkup(data) {
  return templatePhotoCard (data);
}


function onError(err) {
    error ({
        title: `${err}`,
        delay: 1500,
        });
}

function clearArticleContainer() {
    refs.galleryContainer.innerHTML = '';
}

function moreBtnPresence(data) {
    //console.log('data.lenth', data.length);
    if ((data.length >= 12)) {
        refs.loadMoreBtn.classList.remove('is-hidden');
    } else {
        refs.loadMoreBtn.classList.add('is-hidden');
    }
}