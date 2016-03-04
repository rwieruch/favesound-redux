import { normalize, Schema, arrayOf } from 'normalizr';
import userSchema from './user';

let trackSchema = new Schema('tracks');

trackSchema.define({
  user: userSchema
});

export default trackSchema;