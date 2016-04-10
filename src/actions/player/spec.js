import * as actions from './index';
import * as actionTypes from '../../constants/actionTypes';

describe('setActiveTrack()', () => {

  it('creates an action to set an active track', () => {
    const activeTrackId = 4;
    const expectedAction = {
      type: actionTypes.SET_ACTIVE_TRACK,
      activeTrackId
    };

    expect(actions.setActiveTrack(activeTrackId)).to.eql(expectedAction);
  });

});