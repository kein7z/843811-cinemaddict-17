import { generateComment } from '../mock/comments.js';
import Observable from '../framework/observable.js';

export default class CommentModel extends Observable {
  #comment = Array.from({ length: 100 }, generateComment);

  get comment() {

    return this.#comment;
  }

  addComment = (updateType, update, film) => {
    update.commentId = this.comment.length + 1;
    film.comments.push(update.commentId);

    this.#comment = [
      ...this.#comment,
      update,
    ];

    this._notify(updateType, film, update);
  };

  deleteComment = (updateType, update, film) => {
    const index = this.#comment.findIndex((comment) => comment.commentId === update.commentId);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#comment = [
      ...this.#comment.slice(0, index),
      ...this.#comment.slice(index + 1),
    ];

    this._notify(updateType, film, update);
  };
}
