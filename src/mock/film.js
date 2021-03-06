import { getRundomArrayElement, getRuntimeFilm, getRandomInt, getRandomReleaseDate } from '../util';
import { nanoid } from 'nanoid';
const POSTERS_AND_TITLES_FILMS = [
  {
    title: 'made-for-each-other',
    poster: './images/posters/made-for-each-other.png'
  },
  {
    title: 'popeye-meets-sinbad',
    poster: './images/posters/popeye-meets-sinbad.png'
  },
  {
    title: 'sagebrush-trail',
    poster: './images/posters/sagebrush-trail.jpg'
  },
  {
    title: 'santa-claus-conquers-the-martians',
    poster: './images/posters/santa-claus-conquers-the-martians.jpg'
  },
  {
    title: 'the-dance-of-life',
    poster: './images/posters/the-dance-of-life.jpg'
  },
  {
    title: 'the-great-flamarion',
    poster: './images/posters/the-great-flamarion.jpg'
  },
  {
    title: 'the-man-with-the-golden-arm',
    poster: './images/posters/the-man-with-the-golden-arm.jpg'
  },
];

const descriptions = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

export const generateCardFilm = () => {
  const posterAndTitleFilm = getRundomArrayElement(POSTERS_AND_TITLES_FILMS);
  const description = descriptions.split('.');

  return {
    filmId: nanoid(),
    comments: Array.from({length: 5}, () => getRandomInt(1, 100)),
    filmInfo: {
      title: posterAndTitleFilm.title,
      alternativeTitle: posterAndTitleFilm.title,
      totalRating: getRandomInt(0, 10),
      poster: posterAndTitleFilm.poster,
      ageRating: getRandomInt(1, 18),
      director: 'Tom Ford',
      writers: [
        'Takeshi Kitano',
        ' Heinz Herald',
        ' Richard Weil'
      ],
      actors: [
        'Morgan Freeman',
        ' Mary Beth Hughes',
        ' Dan Duryea'
      ],
      release: {
        date: getRandomReleaseDate(),
        releaseCountry: 'Finland'
      },
      runtime: getRuntimeFilm((getRandomInt(50, 180))),
      genre: ['Comedy'],
      description: getRundomArrayElement(description)
    },
    userDetails: {
      watchlist: true,
      alreadyWatched: false,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: false
    }
  };
};
