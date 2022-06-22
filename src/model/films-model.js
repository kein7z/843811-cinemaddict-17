import { generateCardFilm } from '../mock/film.js';
import Observable from '../framework/observable.js';

export default class CardFilmModel extends Observable{
  #films = Array.from({ length: 16 }, generateCardFilm);
  get films() {
    return this.#films;
  }

  updateFilm = (updateType, update) => {
    const index = this.#films.findIndex((item) => item.filmId === update.filmId);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }
    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  };
}
