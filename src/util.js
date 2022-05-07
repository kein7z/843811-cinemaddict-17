import dayjs from 'dayjs';

const humanizeDateRelease = (releaseDate, format) => dayjs(releaseDate).format(format);

const getRandomInt = (minNumber, maxNumber) => {
  if (minNumber >= 0 && maxNumber > minNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }
};
const getRundomArrayElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

const getRuntimeFilm = (mins) => {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
};

export { humanizeDateRelease, getRandomInt, getRundomArrayElement, getRuntimeFilm };

