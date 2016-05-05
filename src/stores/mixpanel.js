import mixpanel from 'rn-redux-mixpanel';

import {
  SET_USER,
  MERGE_ACTIVITIES,
  MERGE_FOLLOWINGS,
  MERGE_FOLLOWERS,
  MERGE_FAVORITES,
  MERGE_GENRE_ACTIVITIES,
  MERGE_ENTITIES,
  SET_PAGINATE_LINK,
  SET_TOGGLED,
  RESET_TOGGLED,
  SET_REQUEST_IN_PROCESS,
  SYNC_ENTITIES
} from '../constants/actionTypes';

const blacklist = [
  MERGE_ACTIVITIES,
  MERGE_FOLLOWINGS,
  MERGE_FOLLOWERS,
  MERGE_FAVORITES,
  MERGE_GENRE_ACTIVITIES,
  MERGE_ENTITIES,
  SET_PAGINATE_LINK,
  SET_TOGGLED,
  RESET_TOGGLED,
  SET_REQUEST_IN_PROCESS,
  SYNC_ENTITIES
];

export default mixpanel({

  ignoreAction: (action) => {
    return blacklist.indexOf(action.type) > -1;
  },

  token: 'b36e27047a8724f0977edc36dbf8477d',

  selectEventName: (action) => action.type,

  selectDistinctId: (action, state) => {
    if (state.session && state.session.user && state.session.user.permalink) {
      return state.session.user.permalink;
    } else {
      return 'NO_USER';
    }
  },

  selectUserProfileData: (action, state) => {
    let user;

    if (state.session.user) {
      user = state.session.user;
    }

    if (action.type === SET_USER) {
      user = action.user;
    }

    if (user) {
      return generateUserData(user);
    }
  }
});

function generateUserData(user) {
  return {
    $permalink: user.permalink,
    $permalink_url: user.permalink_url,
    $username: user.username
  };
}
