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
        session: 'bar',
        loginError: 'access_denied'
      };

      const expectedState = {
        loginError: null,
        user: null,
        session: null
      };

      expect(session(previousState, action)).to.eql(expectedState);
    });

  });

  describe('SET_SESSION', () => {

    it('sets a session', () => {
      const action = {
        type: actionTypes.SET_SESSION,
        session: 'koar'
      };

      const previousState = {
        user: 'foo',
        session: 'bar'
      };

      const expectedState = {
        user: 'foo',
        session: 'koar'
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
        session: 'bar'
      };

      const expectedState = {
        user: 'shuar',
        session: 'bar'
      };

      expect(session(previousState, action)).to.eql(expectedState);
    });

  });

});
