import dayjs from 'dayjs';

const humanizeDateRelease = (releaseDate, format) => dayjs(releaseDate).format(format);

const getRandomInt = (minNumber, maxNumber) => {
  if (minNumber >= 0 && maxNumber > minNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }
};
const getRundomArrayElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

const getRuntimeFilm = (mins) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
};

const getRandomReleaseDate = (years = 10) => {
  const diffDays = getRandomInt(0, 365 * years);
  const date = dayjs().add(-diffDays, 'day');
  return date.toISOString();
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortFilmDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};

const sortFilmRating = (movies) => {
  movies.sort((movieA, movieB) => movieB.filmInfo.totalRating - movieA.filmInfo.totalRating);
};

export { humanizeDateRelease, getRandomInt, getRundomArrayElement, getRuntimeFilm, sortFilmRating, sortFilmDate, getRandomReleaseDate };

