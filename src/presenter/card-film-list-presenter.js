import SectionFilmsView from '../view/films-card-view/section-films-view';
import SectionFilmsListView from '../view/films-card-view/section-films-list-view';
import FilmsListContainerView from '../view/films-card-view/films-list-container-view';
import CardFilmView from '../view/films-card-view/card-film-view';
import ShowMoreButton from '../view/films-card-view/show-more-button-view';
import PopupSectionView from '../view/popup-view/popup-section-view';

import { render } from '../render.js';

export default class SectionFilmsPresenter {
  sectionFilmsComponent = new SectionFilmsView();
  sectionFilmsList = new SectionFilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();

  init = (filmsListContainer, cardFilmModel) => {
    this.filmsListContainer = filmsListContainer;
    this.cardFilmModel = cardFilmModel;

    this.cardFilmModels = [...this.cardFilmModel.getFilms()];
    this.comments = [...this.cardFilmModel.getCom()];

    render(this.sectionFilmsComponent, this.filmsListContainer);
    render(this.sectionFilmsList, this.sectionFilmsComponent.getElement());
    render(this.filmsListContainerComponent, this.sectionFilmsList.getElement());

    for (let i = 0; i < 5; i++) {
      render(new CardFilmView(this.cardFilmModels[i]), this.filmsListContainerComponent.getElement());
    }

    render(new ShowMoreButton(), this.sectionFilmsList.getElement());
    render(new PopupSectionView(this.cardFilmModels[1], this.comments), document.body);
  };

}
