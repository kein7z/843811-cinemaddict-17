import SectionFilmsView from '../view/films-card-view/section-films-view';
import SectionFilmsListView from '../view/films-card-view/section-films-list-view';
import FilmsListContainerView from '../view/films-card-view/films-list-container-view';
import CardFilmView from '../view/films-card-view/card-film-view';
import ShowMoreButton from '../view/films-card-view/show-more-button-view';
import PopupSectionView from '../view/popup-view/popup-section-view';
import { render } from '../render.js';

export default class SectionFilmsPresenter {
  #sectionFilmsComponent = new SectionFilmsView();
  #sectionFilmsList = new SectionFilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();

  #filmsListContainer = null;
  #cardFilmModel = null;
  #comment = null;
  #cardFilmModels = null;
  #comments = null;

  init = (filmsListContainer, cardFilmModel, comment) => {
    this.#filmsListContainer = filmsListContainer;
    this.#cardFilmModel = cardFilmModel;
    this.#comment = comment;

    this.#cardFilmModels = [...this.#cardFilmModel.films];
    this.#comments = [...this.#comment.comment];

    render(this.#sectionFilmsComponent, this.#filmsListContainer);
    render(this.#sectionFilmsList, this.#sectionFilmsComponent.element);
    render(this.#filmsListContainerComponent, this.#sectionFilmsList.element);

    for (let i = 0; i < this.#cardFilmModels.length; i++) {
      this.#renderFilms(this.#cardFilmModels[i]);
    }

    render(new ShowMoreButton(), this.#sectionFilmsList.element);
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
