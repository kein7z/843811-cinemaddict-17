import { remove, render, replace } from '../framework/render';
import CardFilmView from '../view/films-card-view/card-film-view';
import PopupSectionView from '../view/popup-view/popup-section-view';
import { UpdateType, UserAction } from '../const';
import CommentCardView from '../view/popup-view/popup-comments-view';

const Mode = {
  POPUP_CLOSE: 'CLOSE',
  POPUP_OPEN: 'OPEN',
};

export default class FilmPresenter {
  #filmListContainer = null;
  #cardFilmComponent = null;
  #popupSectionComponent = null;
  #changeData = null;
  #film = null;
  #comments = null;
  #popupContainer = null;
  #changeMode = null;
  #someComments = null;
  #mode = Mode.POPUP_CLOSE;
  constructor(filmListContainer, changeData, popupContainer, changeMode) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#popupContainer = popupContainer;
    this.#changeMode = changeMode;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;
    this.#someCommentsUpdate();

    const prevCardFilmComponent = this.#cardFilmComponent;
    const prevPopupSectionComponent = this.#popupSectionComponent;

    this.#cardFilmComponent = new CardFilmView(film);
    this.#popupSectionComponent = new PopupSectionView(film, this.#someComments.length);

    this.#cardFilmComponent.setClickCardFilmHandler(this.#openPopup);

    this.#popupSectionComponent.setClickClosePopupHandler(this.#closePopup);

    this.#cardFilmComponent.setClickAddToWatchlistHandler(this.#handleAddToWatchlistClick);
    this.#cardFilmComponent.setClickAlreadyWatchedHandler(this.#handleAlreadyWatchedClick);
    this.#cardFilmComponent.setClickAddToFavoritesHandler(this.#handleFavoriteClick);


    this.#popupSectionComponent.setClickAddToWatchlistHandler(this.#handleAddToWatchlistClick);
    this.#popupSectionComponent.setClickAlreadyWatchedHandler(this.#handleAlreadyWatchedClick);
    this.#popupSectionComponent.setClickAddToFavoritesHandler(this.#handleFavoriteClick);
    this.#popupSectionComponent.setOnRenderComment(this.#renderFilmDetailComments);

    if (prevCardFilmComponent === null || prevPopupSectionComponent === null) {
      render(this.#cardFilmComponent, this.#filmListContainer);
    } else {
      replace(this.#cardFilmComponent, prevCardFilmComponent);
    }

    if (this.#mode === Mode.POPUP_OPEN) {
      replace(this.#popupSectionComponent, prevPopupSectionComponent);
      this.#popupSectionComponent.update(this.#film, this.#someComments.length);
    }

    remove(prevCardFilmComponent);
    remove(prevPopupSectionComponent);

  };

  destroy = () => {
    remove(this.#cardFilmComponent);
    remove(this.#popupSectionComponent);
  };

  resetPopup = () => {
    if (this.#mode !== Mode.POPUP_CLOSE) {
      this.#closePopup();
    }
  };

  #someCommentsUpdate = () => {
    this.#someComments = this.#comments.filter((comment) => this.#film.comments.includes(comment.commentId));
  };

  #closePopup = () => {
    // document.body.querySelectorAll('.film-details__comments-list li').forEach((element) => element.remove()) ;
    // document.body.querySelector('.film-details').remove();
    remove(this.#popupSectionComponent);
    this.#mode = Mode.POPUP_CLOSE;
  };

  #openPopup = () => {
    this.resetPopup();
    render(this.#popupSectionComponent, this.#popupContainer);
    document.addEventListener('keydown', this.#onKeydownClosePopup);
    this.#popupSectionComponent.setOnRenderComment(this.#renderFilmDetailComments);
    this.#renderFilmDetailComments();
    this.#changeMode();
    this.#mode = Mode.POPUP_OPEN;
  };

  #onKeydownClosePopup = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', this.#onKeydownClosePopup);
      this.#closePopup();
    }
  };

  #handleFavoriteClick = () => {
    const newUserDetails = { ...this.#film.userDetails, favorite: !this.#film.userDetails.favorite };
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      { ...this.#film, userDetails: newUserDetails }
    );
  };

  #handleAlreadyWatchedClick = () => {
    const newUserDetails = { ...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched };
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      { ...this.#film, userDetails: newUserDetails }
    );
  };

  #handleAddToWatchlistClick = () => {
    const newUserDetails = { ...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist };
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      { ...this.#film, userDetails: newUserDetails }
    );
  };

  #handleDeleteCommentClick = (commentUpdate) => {
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      { ...this.#film, },
      commentUpdate,
    );
  };

  #handleAddCommentKeydown = (commentUpdate) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      { ...this.#film, },
      commentUpdate,
    );
  };

  #renderFilmDetailComments = () => {
    this.#someCommentsUpdate();
    this.#someComments.forEach((comment) => {
      const commentCardComponent = new CommentCardView(comment);
      this.#popupSectionComponent.setOnAddCommentUserKeydown(this.#handleAddCommentKeydown);
      commentCardComponent.setOnDeleteCommentClick(this.#handleDeleteCommentClick);
      render(commentCardComponent, this.#popupSectionComponent.commentsContainerNode);
    });
  };
}
