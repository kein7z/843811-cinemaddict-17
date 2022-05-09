import MainNavigation from './view/main-navigation-view.js';
import { render } from './render.js';
import FilterView from './view/filter-view.js';
import SectionFilmsPresenter from './presenter/card-film-list-presenter.js';
import ProfileView from './view/user-rank-view.js';
import CardFilmModel from './model/films-model.js';
import CommentModel from './model/comments-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const sectionFilms = new SectionFilmsPresenter();
const cardFilmModel = new CardFilmModel();
const commentModel = new CommentModel();

render(new MainNavigation(), siteMainElement);
render(new FilterView(), siteMainElement);
render(new ProfileView(), siteHeaderElement);
render(new ProfileView(), siteHeaderElement);

sectionFilms.init(siteMainElement, cardFilmModel, commentModel);


