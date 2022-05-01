import MainNavigation from './view/main-navigation-view.js';
import { render } from './render.js';
import FilterView from './view/filter-view.js';
import PopupFilmView from './view/popup-film-view.js';
import SectionFilmsPresenter from './presenter/card-film-list-presenter.js';
import ProfileView from './view/user-rank-view.js';

const siteMainElement = document.querySelector('.main');
const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const SectionFilms = new SectionFilmsPresenter();

render(new MainNavigation(), siteMainElement);
render(new FilterView(), siteMainElement);
render(new ProfileView(), siteHeaderElement);
render(new PopupFilmView(), siteBodyElement);
SectionFilms.init(siteMainElement);
