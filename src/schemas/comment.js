import { normalize, Schema, arrayOf } from 'normalizr';
import userSchema from './user';

let commentSchema = new Schema('comments');

commentSchema.define({
  user: userSchema
});

export default commentSchema;