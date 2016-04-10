import * as actions from './index';
import * as actionTypes from '../../constants/actionTypes';

describe('setPaginateLink()', () => {

  it('creates an action to set a paginate link', () => {
    const nextHref = '/foo';
    const paginateType = 'FOO_PAGINATE';
    const expectedAction = {
      type: actionTypes.SET_PAGINATE_LINK,
      nextHref,
      paginateType
    };

    expect(actions.setPaginateLink(nextHref, paginateType)).to.eql(expectedAction);
  });

});