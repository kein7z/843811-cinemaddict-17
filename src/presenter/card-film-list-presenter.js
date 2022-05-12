import SectionFilmsView from '../view/films-card-view/section-films-view';
import SectionFilmsListView from '../view/films-card-view/section-films-list-view';
import FilmsListContainerView from '../view/films-card-view/films-list-container-view';
import CardFilmView from '../view/films-card-view/card-film-view';
import ShowMoreButton from '../view/films-card-view/show-more-button-view';
import PopupSectionView from '../view/popup-view/popup-section-view';
import ListEmptyView from '../view/list-empty-view';
import { render } from '../render.js';

const FILM_COUNT_PER_STEP = 5;

export default class SectionFilmsPresenter {
  #sectionFilmsComponent = new SectionFilmsView();
  #sectionFilmsList = new SectionFilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButton();

  #filmsListContainer = null;
  #cardFilmModel = null;
  #comment = null;
  #cardFilmModels = null;
  #comments = null;

  #renderFilmCount = FILM_COUNT_PER_STEP;

  constructor(filmsListContainer, cardFilmModel, comment) {
    this.#filmsListContainer = filmsListContainer;
    this.#cardFilmModel = cardFilmModel;
    this.#comment = comment;
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
      render(new ListEmptyView(), this.#filmsListContainer);
    } else {
      for (let i = 0; i < Math.min(this.#cardFilmModels.length, FILM_COUNT_PER_STEP); i++) {
        this.#renderFilms(this.#cardFilmModels[i]);
      }

      if (this.#cardFilmModels.length > FILM_COUNT_PER_STEP) {
        render(this.#showMoreButtonComponent, this.#sectionFilmsList.element);

        this.#showMoreButtonComponent.element.addEventListener('click', this.#handleShowMoreButtonClick);
      }
    }
  };

  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#cardFilmModels
      .slice(this.#renderFilmCount, this.#renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilms(film));

    this.#renderFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderFilmCount >= this.#cardFilmModels.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilms = (films) => {
    const cardFilm = new CardFilmView(films);
    const popupSection = new PopupSectionView(films, this.#comments);

    const closePopup = () => {
      document.body.querySelector('.film-details').remove();
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    const openPopup = () => {
      document.body.append(popupSection.element);
      document.addEventListener('keydown', onEscKeyDown);
    };

    cardFilm.element.querySelector('.film-card__link').addEventListener('click', () => {
      if (document.body.querySelector('.film-details')) {
        closePopup();
      }
      openPopup();
    });

    popupSection.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      document.removeEventListener('keydown', onEscKeyDown);
      closePopup();
    });
    render(cardFilm, this.#filmsListContainerComponent.element);
  };
}
