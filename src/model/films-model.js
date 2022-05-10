import { generateCardFilm } from '../mock/film.js';

export default class CardFilmModel {
  #films = Array.from({ length: 5 }, generateCardFilm);
  get films() {
    return this.#films;
  }
}
