import * as actionTypes from '../../constants/actionTypes';
import request from './index';

describe('request reducer', () => {

  describe('SET_REQUEST_IN_PROCESS', () => {

    it('add a request as in process', () => {
      const REQUEST_TYPE = 'FOO_REQUEST';

      const action = {
        type: actionTypes.SET_REQUEST_IN_PROCESS,
        inProcess: true,
        requestType: REQUEST_TYPE
      }

      const expectedState = {
        [REQUEST_TYPE]: true
      };

      expect(request(undefined, action)).to.eql(expectedState);
    });

    it('add a request as not in process', () => {
      const REQUEST_TYPE = 'FOO_REQUEST';

      const action = {
        type: actionTypes.SET_REQUEST_IN_PROCESS,
        inProcess: false,
        requestType: REQUEST_TYPE
      }

      const expectedState = {
        [REQUEST_TYPE]: false
      };

      expect(request(undefined, action)).to.eql(expectedState);
    });

  });

});
