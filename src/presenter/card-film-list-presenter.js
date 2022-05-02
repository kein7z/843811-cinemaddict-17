import SectionFilmsView from '../view/section-films-view';
import SectionFilmsListView from '../view/section-films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import CardFilmView from '../view/card-film-view';
import ShowMoreButton from '../view/show-more-button-view';
import {render} from '../render.js';

export default class SectionFilmsPresenter {
  sectionFilmsComponent = new SectionFilmsView();
  sectionFilmsList = new SectionFilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();

  init = (filmsListContainer) => {
    this.filmsListContainer = filmsListContainer;

    render(this.sectionFilmsComponent, this.filmsListContainer);
    render(this.sectionFilmsList, this.sectionFilmsComponent.getElement());
    render(this.filmsListContainerComponent, this.sectionFilmsList.getElement());

    for (let i = 0; i < 5; i++) {
      render(new CardFilmView(), this.filmsListContainerComponent.getElement());
    }

    render(new ShowMoreButton(), this.sectionFilmsList.getElement());
  };
}
