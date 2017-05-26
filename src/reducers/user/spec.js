import * as actionCreators from '../../actions/user';
import * as sessionActionCreators from '../../actions/session';
import * as followingActionCreators from '../../actions/following';
import user from './index';

describe('user reducer', () => {
  describe('MERGE_FOLLOWINGS', () => {
    it('merges followings to list', () => {
      const followings = [1, 2, 3];
      const action = actionCreators.mergeFollowings(followings);

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
      const userId = 2;
      const action = followingActionCreators.removeFromFollowings(userId);
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
  describe('MERGE_ACTIVITIES', () => {
    it('merges activities from a list', () => {
      const activities = ['foo', 'bar'];
      const action = actionCreators.mergeActivities(activities);
      const expectedState = {
        followings: [],
        activities: ['baz', 'foo', 'bar'],
        followers: [],
        favorites: []
      };

      const previousState = {
        followings: [],
        activities: ['baz'],
        followers: [],
        favorites: []
      };
      expect(user(previousState, action)).to.eql(expectedState);
    });
  });
  describe('MERGE_FOLLOWERS', () => {
    it('merges followers from a list', () => {
      const followers = ['Jack', 'Jill', 'Lebron'];
      const action = actionCreators.mergeFollowers(followers);
      const expectedState = {
        followings: [],
        activities: [],
        followers: ['Kyrie', 'Jack', 'Jill', 'Lebron'],
        favorites: []
      };

      const previousState = {
        followings: [],
        activities: [],
        followers: ['Kyrie'],
        favorites: []
      };
      expect(user(previousState, action)).to.eql(expectedState);
    });
  });
  describe('MERGE_FAVORITES', () => {
    it('merges favorites from a list', () => {
      const favorites = ['Jack', 'Jill', 'Lebron'];
      const action = actionCreators.mergeFavorites(favorites);
      const expectedState = {
        followings: [],
        activities: [],
        followers: [],
        favorites: ['Kyrie', 'Jack', 'Jill', 'Lebron']
      };

      const previousState = {
        followings: [],
        activities: [],
        followers: [],
        favorites: ['Kyrie']
      };
      expect(user(previousState, action)).to.eql(expectedState);
    });
  });
  describe('RESET_SESSION', () => {
    it('resets the session to initialState', () => {
      const action = sessionActionCreators.resetSession();
      const previousState = {
        followings: [],
        activities: [],
        followers: [],
        favorites: ['FOO'],
        typeReposts: {},
        typeTracks: { 0: 'Bar' }
      };
      const expectedState = {
        followings: [],
        activities: [],
        followers: [],
        favorites: [],
        typeReposts: {},
        typeTracks: {}
      };
      expect(user(previousState, action)).to.eql(expectedState);
    });
  });
});
