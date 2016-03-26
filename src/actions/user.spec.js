import * as actions from './user';
import * as actionTypes from '../constants/actionTypes';

describe('mergeFollowings()', () => {

  it('should create an action to merge followings', () => {
    const followings = ['x', 'y'];
    const expectedAction = {
      type: actionTypes.MERGE_FOLLOWINGS,
      followings
    };

    expect(actions.mergeFollowings(followings)).to.eql(expectedAction);
  });

});
