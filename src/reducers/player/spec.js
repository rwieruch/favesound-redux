import * as actionTypes from '../../constants/actionTypes';
import player from './index';

describe('player reducer', () => {

  describe('RESET_PLAYLIST', () => {

    it('resets a player', () => {
      const action = {
        type: actionTypes.RESET_PLAYLIST
      };

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
      const action = {
        type: actionTypes.SET_ACTIVE_TRACK,
        activeTrackId: 1
      };

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
      const action = {
        type: actionTypes.SET_ACTIVE_TRACK,
        activeTrackId: 3
      };

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
      const action = {
        type: actionTypes.RESET_ACTIVE_TRACK
      };

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
      const action = {
        type: actionTypes.SET_IS_PLAYING,
        isPlaying: true
      };

      const previousState = {
        activeTrackId: 1,
        isPlaying: false,
        playlist: [1, 2, 3]
      };

      const expectedState = {
        activeTrackId: 1,
        isPlaying: true,
        playlist: [1, 2, 3]
      };

      expect(player(previousState, action)).to.eql(expectedState);
    });

  });

  describe('SET_TRACK_IN_PLAYLIST', () => {

    it('sets a track in playlist', () => {
      const action = {
        type: actionTypes.SET_TRACK_IN_PLAYLIST,
        trackId: 3
      };

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
      const action = {
        type: actionTypes.REMOVE_TRACK_FROM_PLAYLIST,
        trackId: 2
      };

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

});
