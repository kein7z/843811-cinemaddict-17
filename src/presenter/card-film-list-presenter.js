import SectionFilmsView from '../view/films-card-view/section-films-view';
import SectionFilmsListView from '../view/films-card-view/section-films-list-view';
import FilmsListContainerView from '../view/films-card-view/films-list-container-view';
import CardFilmView from '../view/films-card-view/card-film-view';
import ShowMoreButton from '../view/films-card-view/show-more-button-view';
import PopupSectionView from '../view/popup-view/popup-section-view';
import { render } from '../render.js';

const FIRST_ELEMENT = 0;
export default class SectionFilmsPresenter {
  sectionFilmsComponent = new SectionFilmsView();
  sectionFilmsList = new SectionFilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();

  init = (filmsListContainer, cardFilmModel, comment) => {
    this.filmsListContainer = filmsListContainer;
    this.cardFilmModel = cardFilmModel;
    this.comment = comment;

    this.cardFilmModels = [...this.cardFilmModel.getFilms()];
    this.comments = [...this.comment.getCom()];

    render(this.sectionFilmsComponent, this.filmsListContainer);
    render(this.sectionFilmsList, this.sectionFilmsComponent.getElement());
    render(this.filmsListContainerComponent, this.sectionFilmsList.getElement());

    for (let i = 0; i < this.cardFilmModels.length; i++) {
      render(new CardFilmView(this.cardFilmModels[i]), this.filmsListContainerComponent.getElement());
    }

    render(new ShowMoreButton(), this.sectionFilmsList.getElement());
    render(new PopupSectionView(this.cardFilmModels[FIRST_ELEMENT], this.comments), document.body);
    // 0 элемент массива это просто первая карточка в списке, которая упадет в попап, потом там будет тот элемент, на который кликнет пользователь
  };

}
