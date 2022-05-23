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

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.filmId === update.filmId);
  if (index === -1) {
    return items;
  }
  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export { humanizeDateRelease, getRandomInt, getRundomArrayElement, getRuntimeFilm, updateItem };

