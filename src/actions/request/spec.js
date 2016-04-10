import * as actions from './index';
import * as actionTypes from '../../constants/actionTypes';

describe('setRequestInProcess()', () => {

  it('creates an action to set a toggle', () => {
    const requestType = 'FOO_REQUEST';
    const inProcess = true;
    const expectedAction = {
      type: actionTypes.SET_REQUEST_IN_PROCESS,
      inProcess,
      requestType
    };

    expect(actions.setRequestInProcess(inProcess, requestType)).to.eql(expectedAction);
  });

});