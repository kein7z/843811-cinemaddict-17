import { humanizeDateRelease } from '../../util.js';
import AbstractView from '../../framework/view/abstract-view.js';

const createNewCardFilm = (film) => {
  const { title, totalRating, genre, description, release, poster, runtime } = film.filmInfo;
  const date = release.date !== null
    ? humanizeDateRelease(release.date, 'YYYY')
    : '';

  return (
    `<article class="film-card" >
  <a class="film-card__link">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <span class="film-card__comments">${film.comments.length} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${film.userDetails.watchlist ? 'film-card__controls-item--active' : ''}" type="button"

    >Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${film.userDetails.alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${film.userDetails.favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
  </div>
</article>`);
};

export default class CardFilmView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createNewCardFilm(this.#film);
  }

  setClickCardFilmHandler = (callback) => {

    this._callback.clickCardFilm = callback;

    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickCardFilmHandler);
  };

  #clickCardFilmHandler = (evt) => {
    evt.preventDefault();

    this._callback.clickCardFilm();
  };

  setClickAddToWatchlistHandler = (callback) => {
    this._callback.clickAddToWatchlist = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#Watchlist);
  };

  setClickAlreadyWatchedHandler = (callback) => {
    this._callback.clickAlreadyWatched = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#AlreadyWatched);
  };

  setClickAddToFavoritesHandler = (callback) => {
    this._callback.clickAddToFavorites = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#Favorites);
  };

  #Watchlist = (evt) => {
    evt.preventDefault();
    this._callback.clickAddToWatchlist();
  };

  #AlreadyWatched = (evt) => {
    evt.preventDefault();
    this._callback.clickAlreadyWatched();
  };

  #Favorites = (evt) => {
    evt.preventDefault();
    this._callback.clickAddToFavorites();

  };
}
