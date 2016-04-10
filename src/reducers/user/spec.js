import * as actionTypes from '../../constants/actionTypes';
import user from './index';

describe('user reducer', () => {

  describe('MERGE_FOLLOWINGS', () => {

    it('merges followings to list', () => {
      const followings = [1, 2, 3];

      const action = {
        type: actionTypes.MERGE_FOLLOWINGS,
        followings
      };

      const expectedState = {
        followings: [4, 1, 2, 3],
        activities: [],
        followers: [],
        favorites: []
      };

      const previousState = {
        followings: [4],
        activities: [],
        followers: [],
        favorites: []
      };

      expect(user(previousState, action)).to.eql(expectedState);
    });

  });

  describe('REMOVE_FROM_FOLLOWINGS', () => {

    it('removes a following from list of followings', () => {
      const followings = [1, 2, 3];

      const action = {
        type: actionTypes.REMOVE_FROM_FOLLOWINGS,
        userId: 2
      };

      const expectedState = {
        followings: [1, 3],
        activities: [],
        followers: [],
        favorites: []
      };

      const previousState = {
        followings: [1, 2, 3],
        activities: [],
        followers: [],
        favorites: []
      };

      expect(user(previousState, action)).to.eql(expectedState);
    });

  });

});
