import throttle from 'lodash.throttle';

import { onSearch, onLoadMore, btnLoadMore } from './js/onSearching';

//===========================================================================

const form = document.querySelector('.search-form');

//==================================================================================

form.addEventListener('submit', onSearch);
//  btnLoadMore.addEventListener('click', onLoadMore);
window.addEventListener(
  'scroll',
  throttle(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight - clientHeight === Number.parseInt(scrollTop)) {
      onLoadMore();
    }
  }),
  500
);
