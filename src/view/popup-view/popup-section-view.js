import { humanizeDateRelease } from '../../util.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { EMOTIONS } from '../../mock/comments.js';

const createPopupSectionTemplate = (films) => {
  const { poster, ageRating, title, alternativeTitle, totalRating, director, writers, actors, release, runtime, description } = films.film.filmInfo;
  const date = release.date !== null
    ? humanizeDateRelease(release.date, 'DD MMMM YYYY')
    : '';

  const createEmojiListTemplate = (currentEmotion) => EMOTIONS.map((emotion) => `<input
  class="film-details__emoji-item visually-hidden"
  name="comment-emoji"
  type="radio"
  id="emoji-${emotion}"
  value="${emotion}"
  ${currentEmotion === emotion ? 'checked' : ''}
>
<label
  class="film-details__emoji-label"
  for="emoji-${emotion}"
  >
  <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
</label>`).join('');

  const createNewCommentTemplate = (commentText, emotion) => {
    const emojiImageTemplate = emotion ? `<img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">` : '';
    const userComment = commentText ? commentText : '';
    const emojiListTemplate = createEmojiListTemplate(emotion);

    return `<div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">${emojiImageTemplate}</div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${userComment}</textarea>
      </label>

      <div class="film-details__emoji-list">
        ${emojiListTemplate}
      </div>
    </div>`;
  };

  return (`<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tbody><tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">USA</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">Drama</span>
                <span class="film-details__genre">Film-Noir</span>
                <span class="film-details__genre">Mystery</span></td>
            </tr>
          </tbody></table>

          <p class="film-details__film-description">
          ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${films.film.userDetails.watchlist ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${films.film.userDetails.alreadyWatched ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${films.film.userDetails.favorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${films.film.comments.length}</span></h3>

        ${films.commentsCount > 0 ? '<ul class="film-details__comments-list"></ul>' : ''}
        ${createNewCommentTemplate(films.comment, films.emotion)}
      </div>
      </section>
    </div>
  </form>
</section>`);
};

export default class PopupSectionView extends AbstractStatefulView {

  constructor(film, commentsCount) {
    super();
    this._state = PopupSectionView.parseFilmToState(film, commentsCount);
    this.#setInnerHandlers();
  }

  get template() {
    return createPopupSectionTemplate(this._state);
  }

  get commentsContainerNode() {
    return this.element.querySelector('.film-details__comments-list');
  }

  static parseFilmToState = (film, commentsCount) => {
    const state = {
      film: { ...film },
      commentsCount: commentsCount,
      emotion: null,
      comment: null,
    };

    return state;
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

  #createTemplateComment = () => (
    {
      author: 'Roman Pokidov',
      comment: this._state.comment,
      commentDate: '2019',
      commentId: null,
      emotion: this._state.emotion
    }
  );

  #emojiClickHandler = (evt) => {
    evt.preventDefault();
    const scroll = this.element.scrollTop;
    this.updateElement({
      emotion: evt.target.value,
    });
    this._callback.renderComments();
    this.element.scrollTo(0, scroll);
  };

  #inputHandler = (evt) => {
    evt.preventDefault();
    this._setState({ comment: evt.target.value });
  };

  #onKeydown = (evt) => {
    if (evt.ctrlKey && evt.key === 'Enter') {
      this.updateElement({ ...this._state });
      this._callback.addCommentUserKeydown(this.#createTemplateComment());
    }
  };

  setOnAddCommentUserKeydown = (callback) => {
    this._callback.addCommentUserKeydown = callback;
    this.element.querySelector('.film-details__comment-input').addEventListener('keydown', this.#onKeydown);
  };

  setClickClosePopupHandler = (callback) => {
    this._callback.clickClosePopup = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickClosePopup);
  };

  setClickAddToWatchlistHandler = (callback) => {
    this._callback.clickAddToWatchlist = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#Watchlist);
  };

  setClickAlreadyWatchedHandler = (callback) => {
    this._callback.clickAlreadyWatched = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#AlreadyWatched);
  };

  setClickAddToFavoritesHandler = (callback) => {
    this._callback.clickAddToFavorites = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#Favorites);
  };

  setOnRenderComment = (callback) => {
    this._callback.renderComments = callback;
  };

  #clickClosePopup = (evt) => {
    evt.preventDefault();
    this._callback.clickClosePopup();
  };

  #Watchlist = (evt) => {
    evt.preventDefault();
    this._callback.clickAddToWatchlist();
  };

  #AlreadyWatched = (evt) => {
    evt.preventDefault();
    this._callback.clickAlreadyWatched();
  };

  #Favorites = (evt) => {
    evt.preventDefault();
    this._callback.clickAddToFavorites();

  };

  update = (film, commentsCount) => {
    this.updateElement({ ...this._state, film: { ...film }, commentsCount: commentsCount });
    this._callback.renderComments();
  };

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((emojiItem) => emojiItem.addEventListener('change', this.#emojiClickHandler));
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickClosePopup);
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#inputHandler);
    this.setClickAddToWatchlistHandler(this._callback.clickAddToWatchlist);
    this.setClickAlreadyWatchedHandler(this._callback.clickAlreadyWatched);
    this.setClickAddToFavoritesHandler(this._callback.clickAddToFavorites);
    this.setOnAddCommentUserKeydown(this._callback.addCommentUserKeydown);
    this.setOnRenderComment(this._callback.renderComments);
    this.setClickClosePopupHandler(this._callback.clickClosePopup);
  };
}
