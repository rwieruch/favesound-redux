import { normalize, Schema, arrayOf } from 'normalizr';

let track = new Schema('tracks');
let user = new Schema('users');
let comment = new Schema('comments');

track.define({
  user
});

comment.define({
    user
});

export const trackSchema = track;
export const userSchema = user;
export const commentSchema = comment;
