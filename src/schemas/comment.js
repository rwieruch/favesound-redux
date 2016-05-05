import { Schema } from 'normalizr';
import userSchema from './user';

const commentSchema = new Schema('comments');

commentSchema.define({
  user: userSchema
});

export default commentSchema;
