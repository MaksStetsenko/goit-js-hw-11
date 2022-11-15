import axios from 'axios';
import Notiflix from 'notiflix';

//=======================================================================

MAIN_URL = 'https://pixabay.com/api/';
MAIN_KEY = '31303332-4f5dcdea9771597556020029f';
MAIN_PARAM = '&image_type=photo&orientation=horizontal&safesearch=true';

//=======================================================================

export default class PixabayAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
    this.totalHits = 0;
  }
  async fetchImages() {
    const response = await axios.get(
      `${MAIN_URL}?key=${MAIN_KEY}&q=${this.searchQuery}${MAIN_PARAM}&per_page=40&page=${this.page}`
    );

    if (!response.data.hits) {
      throw Error(response.statusText);
    }

    if (response.data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try another search query.'
      );
    } else this.incrementPage();
    this.totalHits = response.data.totalHits;
    return response.data.hits;
  }

  getIMGNum() {
    return this.perPage * this.page;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
