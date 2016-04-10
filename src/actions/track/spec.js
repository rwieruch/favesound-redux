import * as actions from './index';
import * as actionTypes from '../../constants/actionTypes';

describe('removeFromFavorites()', () => {

  it('creates an action to remove a track from favorites', () => {
    const trackId = 7;
    const expectedAction = {
      type: actionTypes.REMOVE_FROM_FAVORITES,
      trackId
    };

    expect(actions.removeFromFavorites(trackId)).to.eql(expectedAction);
  });

});