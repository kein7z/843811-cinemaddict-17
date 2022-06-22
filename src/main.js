import { render } from './framework/render.js';
import SectionFilmsPresenter from './presenter/card-film-list-presenter.js';
import ProfileView from './view/user-rank-view.js';
import CardFilmModel from './model/films-model.js';
import CommentModel from './model/comments-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');
const cardFilmModel = new CardFilmModel();

const commentModel = new CommentModel();
const filterModel = new FilterModel();
const sectionFilms = new SectionFilmsPresenter(siteMainElement, cardFilmModel, commentModel, siteBodyElement, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, cardFilmModel);

render(new ProfileView(), siteHeaderElement);
filterPresenter.init();
sectionFilms.init();
