import * as actionTypes from '../../constants/actionTypes';
import toggle from './index';

describe('toggle reducer', () => {

  describe('SET_TOGGLED', () => {

    it('sets something to toggled', () => {
      const TOGGLE_TYPE = 'FOO_TOGGLE';

      const action = {
        type: actionTypes.SET_TOGGLED,
        toggleType: TOGGLE_TYPE
      }

      const expectedState = {
        [TOGGLE_TYPE]: true
      };

      expect(toggle(undefined, action)).to.eql(expectedState);
    });

    it('sets something to untoggled, when it was toggled before', () => {
      const TOGGLE_TYPE = 'FOO_TOGGLE';

      const action = {
        type: actionTypes.SET_TOGGLED,
        toggleType: TOGGLE_TYPE
      }

      const previousState = {
        [TOGGLE_TYPE]: true
      }

      const expectedState = {
        [TOGGLE_TYPE]: false
      };

      expect(toggle(previousState, action)).to.eql(expectedState);
    });

  });

});
