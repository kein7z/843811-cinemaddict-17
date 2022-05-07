import {getRandomInt, getRundomArrayElement, } from '../util.js';

const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';
const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];
const COMMENT_AUTHORS = [
  'Joe Haworth',
  'Lukas Haas',
  'John Doe',
  'Tim Macoveev',
  'Neil Patrick Harris',
];

export const generateComment = () => (
  {
    commentId: getRandomInt(1,5),
    author: getRundomArrayElement(COMMENT_AUTHORS),
    comment: `${TEXT.split('. ')[getRandomInt(0, TEXT.split('. ').length - 1)]}.`,
    commentDate: '2019-05-12T17:12:32.554Z',
    emotion: getRundomArrayElement(EMOTIONS)
  }
);
