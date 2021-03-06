
// import debounce from 'lodash.debounce';
import listTpl from '/templates/list-template-markup.hbs';
import cardTpl from '/templates/card-template-markup.hbs';
import { debounce } from 'lodash';
import '/sass/main.scss';
import fetchCountries from '/js/fetchCountries.js';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const search = document.querySelector('.js-form');
const listContainer = document.querySelector('.js-articles');

search.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {

  updatePage();

  const searchQuery = e.target.value;

  fetchCountries(searchQuery)
  .then(countries => {

    if(countries.length > 10) {
      error({
        text: 'Too many matches found. Please enter a more specific query!',
        mode: 'light',
        closer: true,
        hide: true,
        sticker: false,
        delay: 2000,
      });
    }
    if(countries.length <= 10 && countries.length > 1) {
      updatePage(listTpl(countries));
    }
    if(countries.length === 1) {
      updatePage(cardTpl(countries));
    }
  })
  .catch(onFetchError);
}

function updatePage(markup = "") {
listContainer.innerHTML = markup;
}

//добавить список стран
// updatePage(listTpl(countries));

//добавить данные по одной стране
// updatePage(cardTpl(countries));

//очистить разметку страницы
// updatePage();

function onFetchError(err) {
  error({
    text: `${err}`,
    mode: 'dark',
    closer: true,
    hide: true,
    sticker: false,
    delay: 2000,
  })
}