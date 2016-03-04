import { normalize, Schema, arrayOf } from 'normalizr';

let track = new Schema('tracks');
let user = new Schema('users');

track.define({
  user
});

export const trackSchema = track;
export const userSchema = user;