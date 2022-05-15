import AbstractView from '../../framework/view/abstract-view';

const createFilmsListTemplate = () => '<section class="films-list"></section>';

export default class SectionFilmsListView extends AbstractView{
  get template() {
    return createFilmsListTemplate();
  }
}
