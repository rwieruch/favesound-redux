import React from 'react';
import map from '../../services/map';
import filter from 'lodash/fp/filter';
import withFetchOnScroll from '../../components/withFetchOnScroll';
import withLoadingSpinner from '../../components/withLoadingSpinner';
import TrackExtension from '../../components/TrackExtension';
import { TrackStreamContainer } from '../../components/Track';

function Activity({
  activity,
  idx
}) {
  return (
    <li>
      <TrackStreamContainer activity={activity} idx={idx} />
      <TrackExtension activity={activity} />
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
          {map((activity, key) => {
            const activityProps = { activity, idx: key, key };
            return <Activity { ...activityProps } />;
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
