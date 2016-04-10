import * as actionTypes from '../../constants/actionTypes';
import entities from './index';

describe('entities reducer', () => {

  describe('SYNC_ENTITIES', () => {

    it('updates an entity in a list of entities', () => {
      const users = {
        1: { name: 'x' },
        2: { name: 'y' }
      };

      const entity = { id: 1, name: 'foo' };

      const action = {
        type: actionTypes.SYNC_ENTITIES,
        entity,
        key: 'users'
      };

      const expectedState = {
        users: {
          1: { id: 1, name: 'foo' },
          2: { name: 'y' }
        },
        tracks: {}
      };

      const previousState = {
        users,
        tracks: {}
      };

      expect(entities(previousState, action)).to.eql(expectedState);
    });

  });

  describe('MERGE_ENTITIES', () => {

    it('initiates entities, when there are no entities yet', () => {
      const users = {
        1: { name: 'x' },
        2: { name: 'y' }
      };
      const myEntities = { users };

      const action = {
        type: actionTypes.MERGE_ENTITIES,
        entities: myEntities
      };

      const expectedState = {
        users,
        tracks: {}
      };

      expect(entities(undefined, action)).to.eql(expectedState);
    });

    it('merges entities, when there are already entities', () => {
      const users = {
        1: { name: 'x' },
        2: { name: 'y' }
      };
      const myEntities = { users };

      const action = {
        type: actionTypes.MERGE_ENTITIES,
        entities: myEntities
      };

      const expectedState = {
        users: {
          3: { name: 'f' },
          4: { name: 'g' },
          1: { name: 'x' },
          2: { name: 'y' }
        },
        tracks: {}
      };

      const previousUsers = {
        3: { name: 'f' },
        4: { name: 'g' }
      };

      const previousState = {
        users: previousUsers,
        tracks: {}
      }

      expect(entities(previousState, action)).to.eql(expectedState);
    });

    it('merges entities side by side', () => {
      const users = {
        1: { name: 'x' },
        2: { name: 'y' }
      };
      const myEntities = { users };

      const action = {
        type: actionTypes.MERGE_ENTITIES,
        entities: myEntities
      };

      const expectedState = {
        users: {
          3: { name: 'f' },
          4: { name: 'g' },
          1: { name: 'x' },
          2: { name: 'y' }
        },
        tracks: {
          5: { title: 'g' },
          6: { title: 'h' }
        }
      };

      const previousUsers = {
        3: { name: 'f' },
        4: { name: 'g' }
      };

      const previousTracks = {
        5: { title: 'g' },
        6: { title: 'h' }
      };

      const previousState = {
        users: previousUsers,
        tracks: previousTracks
      };

      expect(entities(previousState, action)).to.eql(expectedState);
    });

  });

});
