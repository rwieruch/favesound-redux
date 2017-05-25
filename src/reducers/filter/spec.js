import * as actionCreators from '../../actions/filter';
import filter from './index';

describe('filter reducer', () => {
  describe('FILTER_DURATION', () => {
    it('sets the filter by duration', () => {
      const filterType = 'FILTER_DURATION_MIX';
      const action = actionCreators.filterDuration(filterType);
      const previousState = {
        isPlaying: true,
        volume: 11,
        durationFilterType: 'FILTER_DURATION_TRACK',
      };
      const expectedState = {
        isPlaying: true,
        volume: 11,
        durationFilterType: 'FILTER_DURATION_MIX',
      };
      expect(filter(previousState, action)).to.eql(expectedState);
    });
  });
  describe('FILTER_NAME', () => {
    it('sets the filter by name', () => {
      const filterNameQuery = 'Dani Masi';
      const action = actionCreators.filterName(filterNameQuery);
      const previousState = {
        isPlaying: true,
        volume: 11,
        filterNameQuery: 'Kanye West',
      };
      const expectedState = {
        isPlaying: true,
        volume: 11,
        filterNameQuery: 'Dani Masi',
      };
      expect(filter(previousState, action)).to.eql(expectedState);
    });
  });
});
