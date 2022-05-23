import { remove, render, replace } from '../framework/render';
import CardFilmView from '../view/films-card-view/card-film-view';
import PopupSectionView from '../view/popup-view/popup-section-view';

const Mode = {
  POPUP_CLOSE: 'CLOSE',
  POPUP_OPEN: 'OPEN',
};

export default class FilmPresenter {
  #filmListContainer = null;
  #cardFilmComponent = null;
  #popupSectionComponent = null;
  #changeData = null;
  #film = null;
  #popupContainer = null;
  #changeMode = null;

  #mode = Mode.POPUP_CLOSE;
  constructor(filmListContainer, changeData, popupContainer, changeMode) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#popupContainer = popupContainer;
    this.#changeMode = changeMode;
  }

  init = (film, comment) => {
    this.#film = film;
    const prevCardFilmComponent = this.#cardFilmComponent;
    const prevPopupSectionComponent = this.#popupSectionComponent;

    this.#cardFilmComponent = new CardFilmView(film);
    this.#popupSectionComponent = new PopupSectionView(film, comment);

    this.#cardFilmComponent.setClickCardFilmHandler(() => {
      this.#openPopup();
    });

    this.#popupSectionComponent.setClickClosePopupHandler(() => {
      this.#closePopup();
    });

    this.#cardFilmComponent.setClickAddToWatchlistHandler(this.#handleAddToWatchlistClick);
    this.#cardFilmComponent.setClickAlreadyWatchedHandler(this.#handleAlreadyWatchedClick);
    this.#cardFilmComponent.setClickAddToFavoritesHandler(this.#handleFavoriteClick);

    this.#popupSectionComponent.setClickAddToWatchlistHandler(this.#handleAddToWatchlistClick);
    this.#popupSectionComponent.setClickAlreadyWatchedHandler(this.#handleAlreadyWatchedClick);
    this.#popupSectionComponent.setClickAddToFavoritesHandler(this.#handleFavoriteClick);

    if (prevCardFilmComponent === null || prevPopupSectionComponent === null) {
      render(this.#cardFilmComponent, this.#filmListContainer);
    } else {
      replace(this.#cardFilmComponent, prevCardFilmComponent);
    }

    if (this.#mode === Mode.POPUP_OPEN) {
      replace(this.#popupSectionComponent, prevPopupSectionComponent);
    }

    remove(prevCardFilmComponent);
    remove(prevPopupSectionComponent);

  };

  destroy = () => {
    remove(this.#cardFilmComponent);
    remove(this.#popupSectionComponent);
  };

  resetPopup = () => {
    if (this.#mode !== Mode.POPUP_CLOSE) {
      this.#closePopup();
    }
  };

  #closePopup = () => {
    document.body.querySelector('.film-details').remove();
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.POPUP_CLOSE;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
    }
  };

  #openPopup = () => {
    render(this.#popupSectionComponent, this.#popupContainer);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.POPUP_OPEN;
  };

  #handleFavoriteClick = () => {
    const newUserDetails = { ...this.#film.userDetails, favorite: !this.#film.userDetails.favorite };
    this.#changeData({ ...this.#film, userDetails: newUserDetails });
  };

  #handleAlreadyWatchedClick = () => {
    const newUserDetails = { ...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched };
    this.#changeData({ ...this.#film, userDetails: newUserDetails });
  };

  #handleAddToWatchlistClick = () => {
    const newUserDetails = { ...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist };
    this.#changeData({ ...this.#film, userDetails: newUserDetails });
  };
}
