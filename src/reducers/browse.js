import * as actionTypes from '../constants/actionTypes';

const initialState = {
  activitiesByGenre: []
};

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.MERGE_GENRE_ACTIVITIES:
    return mergeActivities(state, action.activities);
  }
  return state;
}

function mergeActivities(state, activities) {
  const activitiesByGenre = [
    ...state.activitiesByGenre,
    ...activities
  ];
  return Object.assign({}, state, { activitiesByGenre });
}
