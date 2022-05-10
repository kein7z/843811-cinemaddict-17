import { createElement } from '../../render';

const createFilmsListTemplate = () => '<section class="films-list"></section>';

export default class SectionFilmsListView {
  #element = null;
  get template() {
    return createFilmsListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
