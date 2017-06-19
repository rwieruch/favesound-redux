import * as actionTypes from '../../constants/actionTypes';
import browse from './index';

describe('browse reducer', () => {

  describe('MERGE_GENRE_ACTIVITIES', () => {

    it('initiates activities by genre, when there are no activities yet', () => {
      const GENRE = 'FOO_GENRE';
      const activities = [{ name: 'x' }, { name: 'y' }];

      const action = {
        type: actionTypes.MERGE_GENRE_ACTIVITIES,
        activities: activities,
        genre: GENRE
      };

      const expectedState = {
        [GENRE]: activities, 
        selectedGenre: null
      };

      expect(browse(undefined, action)).to.eql(expectedState);
    });

    it('merges activities by genre, when there are already activities', () => {
      const GENRE = 'FOO_GENRE';
      const activities = [{ name: 'x' }, { name: 'y' }];

      const action = {
        type: actionTypes.MERGE_GENRE_ACTIVITIES,
        activities: activities,
        genre: GENRE
      };

      const expectedState = {
        [GENRE]: [{ name: 'f' }, { name: 'g' }, { name: 'x' }, { name: 'y' }]
      };

      const previousActivities = [{ name: 'f' }, { name: 'g' }];

      const previousState = {
        [GENRE]: previousActivities
      }

      expect(browse(previousState, action)).to.eql(expectedState);
    });

    it('merges activities by genre side by side', () => {
      const GENRE = 'FOO_GENRE';
      const activities = [{ name: 'x' }, { name: 'y' }];

      const action = {
        type: actionTypes.MERGE_GENRE_ACTIVITIES,
        activities: activities,
        genre: GENRE
      };

      const expectedState = {
        [GENRE]: [{ name: 'x' }, { name: 'y' }],
        'BAR_GENRE': [{ name: 'f' }, { name: 'g' }]
      };

      const previousActivities = [{ name: 'f' }, { name: 'g' }];

      const previousState = {
        'BAR_GENRE': previousActivities
      }

      expect(browse(previousState, action)).to.eql(expectedState);
    });

  });

});
