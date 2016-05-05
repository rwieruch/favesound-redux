import * as actionTypes from '../../constants/actionTypes';

export function setRequestInProcess(inProcess, requestType) {
  return {
    type: actionTypes.SET_REQUEST_IN_PROCESS,
    requestType,
    inProcess
  };
}
