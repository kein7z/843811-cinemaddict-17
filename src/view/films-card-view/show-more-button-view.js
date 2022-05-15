import AbstractView from '../../framework/view/abstract-view';
const createShowMoreButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreButton extends AbstractView {
  get template() {
    return createShowMoreButtonTemplate();
  }

  setShowMoreButtonClickHandler = (callback) => {

    this._callback.clickShowMoreButton = callback;

    this.element.addEventListener('click', this.#showMoreButtonClickHandler);
  };

  #showMoreButtonClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.clickShowMoreButton();
  };
}
