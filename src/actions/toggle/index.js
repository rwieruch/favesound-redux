import * as actionTypes from '../../constants/actionTypes';

export function setToggle(toggleType) {
  return {
    type: actionTypes.SET_TOGGLED,
    toggleType
  };
}

export function resetToggle(toggleType) {
  return {
    type: actionTypes.RESET_TOGGLED,
    toggleType
  };
}
