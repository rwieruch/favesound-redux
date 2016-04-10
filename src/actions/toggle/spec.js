import * as actions from './index';
import * as actionTypes from '../../constants/actionTypes';

describe('setToggle()', () => {

  it('creates an action to set a toggle', () => {
    const toggleType = 'FOO_TOGGLE';
    const expectedAction = {
      type: actionTypes.SET_TOGGLED,
      toggleType
    };

    expect(actions.setToggle(toggleType)).to.eql(expectedAction);
  });

});

describe('resetToggle()', () => {

  it('creates an action to set a toggle', () => {
    const toggleType = 'FOO_TOGGLE';
    const expectedAction = {
      type: actionTypes.RESET_TOGGLED,
      toggleType
    };

    expect(actions.resetToggle(toggleType)).to.eql(expectedAction);
  });

});