import * as actionTypes from '../../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TOGGLED:
      return setToggled(state, action.toggleType);
    case actionTypes.RESET_TOGGLED:
      return resetToggled(state, action.toggleType);
  }
  return state;
}

function setToggled(state, toggleType) {
  const toggleObject = {};
  toggleObject[toggleType] = !state[toggleType];
  return Object.assign({}, state, toggleObject);
}

function resetToggled(state, toggleType) {
  const toggleObject = {};
  toggleObject[toggleType] = false;
  return Object.assign({}, state, toggleObject);
}
