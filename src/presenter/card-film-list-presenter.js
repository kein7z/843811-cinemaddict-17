import { remove, render } from '../framework/render';
import SectionFilmsView from '../view/films-card-view/section-films-view';
import SectionFilmsListView from '../view/films-card-view/section-films-list-view';
import FilmsListContainerView from '../view/films-card-view/films-list-container-view';
import ShowMoreButton from '../view/films-card-view/show-more-button-view';
import ListEmptyView from '../view/list-empty-view';
import FilmPresenter from './film-presenter';
import SortView from '../view/sort-view';
import { sortFilmRating, sortFilmDate } from '../util';
import { SortType, UserAction, UpdateType } from '../const';
import { filter } from '../const';

const FILM_COUNT_PER_STEP = 5;

export default class SectionFilmsPresenter {
  #sectionFilmsComponent = new SectionFilmsView();
  #sectionFilmsList = new SectionFilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButton();
  #listEmpty = new ListEmptyView();

  #sortComponent = null;
  #filmsListContainer = null;
  #cardFilmModel = null;
  #comment = null;
  #popupContainer = null;
  #filterModel = null;

  #currentSortType = SortType.DEFAULT;
  #renderFilmCount = FILM_COUNT_PER_STEP;
  #filmPresenter = new Map();

  constructor(filmsListContainer, cardFilmModel, comment, popupContainer, filterModel) {
    this.#filmsListContainer = filmsListContainer;
    this.#cardFilmModel = cardFilmModel;
    this.#comment = comment;
    this.#popupContainer = popupContainer;
    this.#filterModel = filterModel;

    this.#cardFilmModel.addObserver(this.#handleModelEvent);
    this.#comment.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    const filterType = this.#filterModel.filter;
    const films = this.#cardFilmModel.films;
    const filteredFilms = filter[filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE_SORT:
        return filteredFilms.sort(sortFilmDate);
      case SortType.RATING_SORT:
        return filteredFilms.sort(sortFilmRating(this.#cardFilmModel.films));
    }

    return filteredFilms;
  }

  get comments() {
    return this.#comment;

  }

  init = () => {
    this.#renderSectionFilmsList();
  };

  #handleViewAction = (actionType, updateType, updateFilm, updateComment = false) => {
    switch (actionType) {
      case UserAction.ADD_COMMENT:
        this.comments.addComment(updateType, updateComment, updateFilm);
        this.#cardFilmModel.updateFilm(updateType, updateFilm);
        break;

      case UserAction.DELETE_COMMENT:
        this.comments.deleteComment(updateType, updateComment, updateFilm);
        this.#cardFilmModel.updateFilm(updateType, updateFilm);
        break;

      case UserAction.UPDATE_FILM:
        this.#cardFilmModel.updateFilm(updateType, updateFilm);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.filmId).init(data, this.comments.comment);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderSectionFilmsList();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetRenderedFilmCount: true, resetSortType: true });
        this.#renderSectionFilmsList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderSectionFilmsList();
  };

  #handleShowMoreButtonClick = () => {
    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderFilmCount + FILM_COUNT_PER_STEP);
    const film = this.films.slice(this.#renderFilmCount, newRenderedFilmCount);
    this.#renderFilms(film);
    this.#renderFilmCount = newRenderedFilmCount;

    if (this.#renderFilmCount >= filmCount) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }

  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetPopup());
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#sortComponent, this.#filmsListContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderSectionFilmsList = () => {
    this.#renderSort();
    render(this.#sectionFilmsComponent, this.#filmsListContainer);
    render(this.#sectionFilmsList, this.#sectionFilmsComponent.element);
    render(this.#filmsListContainerComponent, this.#sectionFilmsList.element);

    const filmCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmCount, this.#renderFilmCount));

    if (filmCount === 0) {
      this.#renderListEmty();
      return;
    }

    for (let i = 0; i < Math.min(films.length, this.#renderFilmCount); i++) {
      this.#renderFilm(films[i]);
    }

    if (filmCount > this.#renderFilmCount) {
      this.#rendershowMoreButton();

      this.#showMoreButtonComponent.setShowMoreButtonClickHandler(this.#handleShowMoreButtonClick);
    }
  };

  #renderListEmty = () => {
    render(this.#listEmpty, this.#filmsListContainer);
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsListContainerComponent.element, this.#handleViewAction, this.#popupContainer, this.#handleModeChange);
    filmPresenter.init(film, this.comments.comment);
    this.#filmPresenter.set(film.filmId, filmPresenter);
  };

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  };

  #rendershowMoreButton = () => {
    render(this.#showMoreButtonComponent, this.#sectionFilmsList.element);
  };

  #clearBoard = ({ resetRenderedFilmCount = false, resetSortType = false } = {}) => {
    const filmCount = this.films.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#showMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this.#renderFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this.#renderFilmCount = Math.min(filmCount, this.#renderFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };
}
