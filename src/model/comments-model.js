import { generateComment } from '../mock/comments.js';

export default class CommentModel {
  comment = Array.from({ length: 5 }, generateComment);

  getCom = () => this.comment;
}
