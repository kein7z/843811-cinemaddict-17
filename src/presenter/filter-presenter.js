import { render, replace, remove } from '../framework/render';
import FilterView from '../view/filter-view';
import { FilterType, UpdateType } from '../const';
import { filter } from '../const';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filmModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, filmModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#filmModel = filmModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#filmModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filmModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  get filters() {
    const films = this.#filmModel.films;
    return [
      {
        type: FilterType.ALL,
        name: 'All',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}

