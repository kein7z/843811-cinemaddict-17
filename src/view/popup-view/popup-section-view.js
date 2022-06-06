import { humanizeDateRelease } from '../../util.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';

const createPopupSectionTemplate = (films) => {
  const { poster, ageRating, title, alternativeTitle, totalRating, director, writers, actors, release, runtime, description } = films.film.filmInfo;

  const date = release.date !== null
    ? humanizeDateRelease(release.date, 'DD MMMM YYYY')
    : '';

  const createComment = ({ author, comment, commentDate, emotion }) => (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${humanizeDateRelease(commentDate, 'YYYY MM DD H:mm')}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );

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
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${films.filmComments.length}</span></h3>

        <ul class="film-details__comments-list">
        ${films.filmComments.map(createComment).join('')}
      </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
          <img ${films.emotion ? `src="./images/emoji/${films.emotion}.png"` : ' '}  width="72" height="72" >
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${films.commentText ? films.commentText : ''}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${films.emotion === 'smile' ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${films.emotion === 'sleeping' ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${films.emotion === 'puke' ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${films.emotion === 'angry' ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`);
};

export default class PopupSectionView extends AbstractStatefulView {
  #positionScreen = 0;

  constructor(film, filmComments) {
    super();
    this._state = PopupSectionView.parseFilmToState(film, filmComments);
    this.#setInnerHandlers();
  }

  get template() {
    return createPopupSectionTemplate(this._state);
  }

  static parseFilmToState = (film, filmComments, positionScreen) => (
    {
      film,
      filmComments,
      emotion: '',
      commentText: '',
      positionScreen
    }
  );

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.element.scrollTop = this.#positionScreen;
  };

  #emojiClickHandler = (evt) => {
    evt.preventDefault();
    this.#positionScreen = this.element.scrollTop;
    this.updateElement({
      emotion: evt.target.value,
    });
  };

  #commentInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      commentText: evt.target.value,
    });
  };

  setClickClosePopupHandler = (callback) => {
    this._callback.clickClosePopup = callback;
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

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((emojiItem) => emojiItem.addEventListener('change', this.#emojiClickHandler));
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputHandler);
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickClosePopup);
    this.setClickAddToWatchlistHandler(this._callback.clickAddToWatchlist);
    this.setClickAlreadyWatchedHandler(this._callback.clickAlreadyWatched);
    this.setClickAddToFavoritesHandler(this._callback.clickAddToFavorites);
  };

}
