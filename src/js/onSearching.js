import PixabayAPIService from './pixabayService';
import Notiflix from 'notiflix';
import { createGalleryMarkup, clearGallery } from './createGallery';
import { lightbox } from './lightbox';

export { onSearch, onLoadMore, btnLoadMore };

//=======================================================================

const btnLoadMore = document.querySelector('.btn-load-more');

const pixabayAPIService = new PixabayAPIService();

async function onSearch(event) {
  event.preventDefault();
  pixabayAPIService.query = event.currentTarget.elements.searchQuery.value;
  pixabayAPIService.resetPage();
  clearGallery();

  await pixabayAPIService.fetchImages().then(createGalleryMarkup);
  if (pixabayAPIService.totalHits) {
    Notiflix.Notify.info(
      `Hooray! We found ${pixabayAPIService.totalHits} images.`
    );
  }
  await lightbox.refresh();
  //   btnLoadMore.classList.remove('is-hidden');
}

async function onLoadMore() {
  btnLoadMore.classList.add('is-hidden');
  await pixabayAPIService.fetchImages().then(createGalleryMarkup);
  // await btnLoadMore.classList.remove('is-hidden');
  await lightbox.refresh();
  if (pixabayAPIService.totalHits <= pixabayAPIService.getIMGNum()) {
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
    return;
  }
}
