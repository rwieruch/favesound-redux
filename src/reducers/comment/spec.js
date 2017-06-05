import * as actionCreators from '../../actions/comments';
import comment from './index';

describe('comment reducer', () => {
  describe('OPEN_COMMENTS', () => {
    it('returns the open comments if they exist', () => {
      const trackId = 15;
      const action = actionCreators.setOpenComments(trackId);
      const previousState = {
        trackId: 15,
        openComments: { 0: 'Good Song!', 1: 'I agree!' },
      };
      const expectedState = {
        trackId: 15,
        openComments: { 0: 'Good Song!', 1: 'I agree!', 15: true },
      };
      expect(comment(previousState, action)).to.eql(expectedState);
    });
  });
  describe('MERGE_COMMENTS', () => {
    it('merges the comments', () => {
      const comments = ['Third Comment', 'Fourth'];
      const trackId = 15;
      const action = actionCreators.mergeComments(comments, trackId);

      const previousState = {
        trackId: 15,
        comments: { 0: 'First', 1: 'Second comment!' },
      };
      const expectedState = {
        trackId: 15,
        comments: { 0: 'First', 1: 'Second comment!', 15: ['Third Comment', 'Fourth'] },
      };
      expect(comment(previousState, action)).to.eql(expectedState);
    });
  });
});
