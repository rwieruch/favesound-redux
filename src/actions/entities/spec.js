import * as actions from './index';
import * as actionTypes from '../../constants/actionTypes';

describe('mergeEntities()', () => {

  it('creates an action to merge entities', () => {
    const entities = [{ name: 'x', name: 'y' }];
    const expectedAction = {
      type: actionTypes.MERGE_ENTITIES,
      entities
    };

    expect(actions.mergeEntities(entities)).to.eql(expectedAction);
  });

});

describe('syncEntities()', () => {

  it('creates an action to sync an entity', () => {
    const key = 'users';
    const entity = { name: 'x' };
    const expectedAction = {
      type: actionTypes.SYNC_ENTITIES,
      entity,
      key
    };

    expect(actions.syncEntities(entity, key)).to.eql(expectedAction);
  });

});