import * as actionCreators from '../../actions/sort';
import sort from './index';

describe('sort', () => {
  describe('SORT_STREAM', () => {
    it('sets the sort stream if previously null', () => {
      const sortType = 'SORT_FAVORITES';
      const action = actionCreators.sortStream(sortType);
      const previousState = {
        isPlaying: true,
        volume: 11,
        sortType: null
      };
      const expectedState = {
        isPlaying: true,
        volume: 11,
        sortType: 'SORT_FAVORITES'
      };
      expect(sort(previousState, action)).to.eql(expectedState);
    });
    it('sets the sort stream if already set', () => {
      const sortType = 'SORT_FAVORITES';
      const action = actionCreators.sortStream(sortType);
      const previousState = {
        isPlaying: true,
        volume: 11,
        sortType: 'SORT_PLAYS'
      };
      const expectedState = {
        isPlaying: true,
        volume: 11,
        sortType: 'SORT_FAVORITES'
      };
      expect(sort(previousState, action)).to.eql(expectedState);
    });
  });
});
