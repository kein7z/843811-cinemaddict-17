import { render } from './framework/render.js';
import MainNavigation from './view/main-navigation-view.js';
import FilterView from './view/filter-view.js';
import SectionFilmsPresenter from './presenter/card-film-list-presenter.js';
import ProfileView from './view/user-rank-view.js';
import CardFilmModel from './model/films-model.js';
import CommentModel from './model/comments-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const cardFilmModel = new CardFilmModel();
const commentModel = new CommentModel();
const sectionFilms = new SectionFilmsPresenter(siteMainElement, cardFilmModel, commentModel);

render(new MainNavigation(), siteMainElement);
render(new FilterView(), siteMainElement);
render(new ProfileView(), siteHeaderElement);

sectionFilms.init();


