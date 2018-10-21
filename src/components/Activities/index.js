import PropTypes from 'prop-types';
import React from 'react';
import map from '../../services/map';
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
  activeDateSort
}) {
  const matchedEntities = getMatchedEntities(ids, entities);
  const filteredEntities = matchedEntities.filter(activeFilter);
  const sortedDateEntities = activeDateSort(filteredEntities);
  const sortedEntities = activeSort(sortedDateEntities);
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
  ids: PropTypes.array,
  entities: PropTypes.object,
  activeFilter: PropTypes.func,
  activeSort: PropTypes.func,
  activeDateSort: PropTypes.func,
};

export default withLoadingSpinner(withFetchOnScroll(Activities));
