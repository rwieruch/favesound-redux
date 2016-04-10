import * as actionTypes from '../../constants/actionTypes';
import paginate from './index';

describe('paginate reducer', () => {

  describe('SET_PAGINATE_LINK', () => {

    it('sets a paginate link', () => {

      const PAGINATE_TYPE = 'FOO_PAGINATE';

      const action = {
        type: actionTypes.SET_PAGINATE_LINK,
        nextHref: '/foo',
        paginateType: PAGINATE_TYPE
      }

      const expectedState = {
        [PAGINATE_TYPE]: '/foo'
      };

      expect(paginate(undefined, action)).to.eql(expectedState);
    });

  });

});
