import { Schema } from 'normalizr';
import userSchema from './user';

const trackSchema = new Schema('tracks');

trackSchema.define({
  user: userSchema
});

export default trackSchema;
