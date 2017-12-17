import * as actionCreators from '../../actions/player';
import player from './index';

describe('player reducer', () => {
  describe('SET_SHUFFLE_MODE', () => {
    it('toggles shuffle mode', () => {
      const action = actionCreators.setIsInShuffleMode();
      const previousState = {
        activeTrackId: 1,
        isPlaying: true,
        playlist: [1, 2, 3],
        isInShuffleMode: false,
      };
      const expectedState = {
        activeTrackId: 1,
        isPlaying: true,
        playlist: [1, 2, 3],
        isInShuffleMode: true,
      };
      expect(player(previousState, action)).to.eql(expectedState);
    });
  });

  describe('SET_REPEAT_MODE', () => {
    it('toggles repeat mode', () => {
      const action = actionCreators.setIsInRepeatMode();
      const previousState = {
        activeTrackId: 1,
        isPlaying: true,
        playlist: [1, 2, 3],
        isInShuffleMode: false,
        isInRepeatMode: false,
      };
      const expectedState = {
        activeTrackId: 1,
        isPlaying: true,
        playlist: [1, 2, 3],
        isInShuffleMode: false,
        isInRepeatMode: true,
      };
      expect(player(previousState, action)).to.eql(expectedState);
    });
  });


  describe('RESET_PLAYLIST', () => {
    it('resets a player', () => {
      const action = actionCreators.emptyPlaylist();
      const previousState = {
        activeTrackId: 1,
        isPlaying: true,
        playlist: [1, 2, 3]
      };

      const expectedState = {
        activeTrackId: 1,
        isPlaying: true,
        playlist: []
      };

      expect(player(previousState, action)).to.eql(expectedState);
    });
  });

  describe('SET_ACTIVE_TRACK', () => {
    it('sets an active track', () => {
      const activeTrackId = 1;
      const action = actionCreators.setActiveTrack(activeTrackId);
      const previousState = {
        activeTrackId: null,
        isPlaying: false,
        playlist: []
      };

      const expectedState = {
        activeTrackId: 1,
        isPlaying: false,
        playlist: []
      };

      expect(player(previousState, action)).to.eql(expectedState);
    });

    it('sets an new active track', () => {
      const activeTrackId = 3;
      const action = actionCreators.setActiveTrack(activeTrackId);
      const previousState = {
        activeTrackId: 2,
        isPlaying: false,
        playlist: []
      };

      const expectedState = {
        activeTrackId: 3,
        isPlaying: false,
        playlist: []
      };

      expect(player(previousState, action)).to.eql(expectedState);
    });
  });
  describe('RESET_ACTIVE_TRACK', () => {
    it('resets an active track', () => {
      const action = actionCreators.deactivateTrack();
      const previousState = {
        activeTrackId: 1,
        isPlaying: true,
        playlist: [1, 2, 3]
      };

      const expectedState = {
        activeTrackId: null,
        isPlaying: true,
        playlist: [1, 2, 3]
      };

      expect(player(previousState, action)).to.eql(expectedState);
    });
  });
  describe('SET_IS_PLAYING', () => {
    it('sets state as playing', () => {
      const isPlaying = 'Ibiza';
      const action = actionCreators.setIsPlaying(isPlaying);

      const previousState = {
        activeTrackId: 1,
        isPlaying: null,
        playlist: [1, 2, 3]
      };

      const expectedState = {
        activeTrackId: 1,
        isPlaying: 'Ibiza',
        playlist: [1, 2, 3]
      };

      expect(player(previousState, action)).to.eql(expectedState);
    });
  });
  describe('SET_TRACK_IN_PLAYLIST', () => {
    it('sets a track in playlist', () => {
      const trackId = 3;
      const action = actionCreators.setTrackInPlaylist(trackId);
      const previousState = {
        activeTrackId: 1,
        isPlaying: false,
        playlist: [1, 2]
      };

      const expectedState = {
        activeTrackId: 1,
        isPlaying: false,
        playlist: [1, 2, 3]
      };

      expect(player(previousState, action)).to.eql(expectedState);
    });
  });
  describe('REMOVE_TRACK_FROM_PLAYLIST', () => {
    it('sets a track in playlist', () => {
      const trackId = 2;
      const action = actionCreators.removeFromPlaylist(trackId);

      const previousState = {
        activeTrackId: 1,
        isPlaying: false,
        playlist: [1, 2, 3]
      };

      const expectedState = {
        activeTrackId: 1,
        isPlaying: false,
        playlist: [1, 3]
      };

      expect(player(previousState, action)).to.eql(expectedState);
    });
  });
  describe('SET_VOLUME', () => {
    it('sets the volume of the active track', () => {
      const newVolume = 20;
      const action = actionCreators.setTrackVolume(newVolume);
      const previousState = {
        activeTrackId: 1,
        volume: 70
      };

      const expectedState = {
        activeTrackId: 1,
        volume: 20
      };
      expect(player(previousState, action)).to.eql(expectedState);
    });
  });
});
