import { remove, render } from '../framework/render';
import SectionFilmsView from '../view/films-card-view/section-films-view';
import SectionFilmsListView from '../view/films-card-view/section-films-list-view';
import FilmsListContainerView from '../view/films-card-view/films-list-container-view';
import ShowMoreButton from '../view/films-card-view/show-more-button-view';
import ListEmptyView from '../view/list-empty-view';
import FilmPresenter from './film-presenter';
import { updateItem } from '../util';


const FILM_COUNT_PER_STEP = 5;

export default class SectionFilmsPresenter {
  #sectionFilmsComponent = new SectionFilmsView();
  #sectionFilmsList = new SectionFilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButton();
  #listEmpty = new ListEmptyView();

  #filmsListContainer = null;
  #cardFilmModel = null;
  #comment = null;
  #cardFilmModels = null;
  #comments = null;
  #popupContainer = null;

  #renderFilmCount = FILM_COUNT_PER_STEP;
  #filmPresenter = new Map();

  constructor(filmsListContainer, cardFilmModel, comment, popupContainer) {
    this.#filmsListContainer = filmsListContainer;
    this.#cardFilmModel = cardFilmModel;
    this.#comment = comment;
    this.#popupContainer = popupContainer;
  }

  init = () => {
    this.#cardFilmModels = [...this.#cardFilmModel.films];
    this.#comments = [...this.#comment.comment];

    this.#renderSectionFilmsList();
  };

  #renderSectionFilmsList = () => {
    render(this.#sectionFilmsComponent, this.#filmsListContainer);
    render(this.#sectionFilmsList, this.#sectionFilmsComponent.element);
    render(this.#filmsListContainerComponent, this.#sectionFilmsList.element);

    if (this.#cardFilmModels.every((film) => film.all)) {
      this.#renderListEmty();
    } else {
      for (let i = 0; i < Math.min(this.#cardFilmModels.length, FILM_COUNT_PER_STEP); i++) {
        this.#renderFilm(this.#cardFilmModels[i]);
      }

      if (this.#cardFilmModels.length > FILM_COUNT_PER_STEP) {
        this.#rendershowMoreButton();

        this.#showMoreButtonComponent.setShowMoreButtonClickHandler(this.#handleShowMoreButtonClick);
      }
    }
  };

  #handleShowMoreButtonClick = () => {
    this.#renderFilms();

    this.#renderFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderFilmCount >= this.#cardFilmModels.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetPopup());
  };

  #renderListEmty = () => {
    render(this.#listEmpty, this.#filmsListContainer);
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsListContainerComponent.element, this.#handleFilmChange, this.#popupContainer, this.#handleModeChange);
    filmPresenter.init(film, this.#comments);
    this.#filmPresenter.set(film.filmId, filmPresenter);
  };

  #renderFilms = () => {
    this.#cardFilmModels
      .slice(this.#renderFilmCount, this.#renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));
  };

  #rendershowMoreButton = () => {
    render(this.#showMoreButtonComponent, this.#sectionFilmsList.element);
  };

  #handleFilmChange = (updateFilm) => {
    this.#cardFilmModels = updateItem(this.#cardFilmModels, updateFilm);
    this.#filmPresenter.get(updateFilm.filmId).init(updateFilm, this.#comments);
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };
}

