import * as actionTypes from '../../constants/actionTypes';
import session from './index';

describe('session reducer', () => {
  describe('RESET_SESSION', () => {
    it('resets a session', () => {
      const action = {
        type: actionTypes.RESET_SESSION
      };

      const previousState = {
        user: 'foo',
      };

      const expectedState = {
        user: null,
      };

      expect(session(previousState, action)).to.eql(expectedState);
    });
  });

  describe('SET_USER', () => {
    it('sets an user', () => {
      const action = {
        type: actionTypes.SET_USER,
        user: 'shuar'
      };

      const previousState = {
        user: 'foo',
      };

      const expectedState = {
        user: 'shuar',
      };

      expect(session(previousState, action)).to.eql(expectedState);
    });
  });
});
