import { User, UserSchema } from './user.model.js';

function setUpModels(sequilize) {
  User.init(UserSchema, User.config(sequilize));
}

export default setUpModels;
