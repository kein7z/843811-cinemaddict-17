import { generateCardFilm } from '../mock/film.js';
import { generateComment } from '../mock/comments.js';

export default class CardFilmModel {
  films = Array.from({ length: 5 }, generateCardFilm);
  comment = Array.from({ length: 5 }, generateComment);

  getCom = () => this.comment;
  getFilms = () => this.films;
}
