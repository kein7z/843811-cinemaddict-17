import { generateCardFilm } from '../mock/film.js';

export default class CardFilmModel {
  films = Array.from({ length: 5 }, generateCardFilm);
  getFilms = () => this.films;
}
