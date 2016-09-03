import React from 'react';
import map from '../../services/map';
import filter from 'lodash/fp/filter';
import withFetchOnScroll from '../../components/withFetchOnScroll';
import withLoadingSpinner from '../../components/withLoadingSpinner';
import { TrackStreamContainer } from '../../components/Track';
import { TrackExtensionContainer } from '../../components/TrackExtension';

function Activity({
  activity,
  idx
}) {
  return (
    <li>
      <TrackStreamContainer activity={activity} idx={idx} />
      <TrackExtensionContainer activity={activity} />
    </li>
  );
}

function getMatchedEntities(ids, entities) {
  return map((id) => entities[id], ids);
}

function Activities({
  ids,
  entities,
  activeFilter,
  activeSort,
}) {
  const matchedEntities = getMatchedEntities(ids, entities);
  const filteredEntities = filter(activeFilter, matchedEntities);
  const sortedEntities = activeSort(filteredEntities);

  return (
    <div>
      <div>
        <ul>
          {map((activity, idx) => {
            const activityProps = { activity, idx };
            return <Activity key={idx} { ...activityProps } />;
          }, sortedEntities)}
        </ul>
      </div>
    </div>
  );
}

Activities.propTypes = {
  ids: React.PropTypes.array,
  entities: React.PropTypes.object,
  activeFilter: React.PropTypes.func,
  activeSort: React.PropTypes.func,
};

export default withLoadingSpinner(withFetchOnScroll(Activities));
