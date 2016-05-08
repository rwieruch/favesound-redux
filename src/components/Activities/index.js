import React from 'react';
import map from '../../services/map';
import filter from 'lodash/fp/filter';
import FetchOnScroll from '../../components/FetchOnScroll';
import { TrackStreamContainer } from '../../components/Track';
import { TrackExtensionContainer } from '../../components/TrackExtension';
import { LoadingSpinner } from '../../components/LoadingSpinner';

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
  requestInProcess,
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
      <LoadingSpinner isLoading={requestInProcess || !ids} />
    </div>
  );
}

Activities.propTypes = {
  requestInProcess: React.PropTypes.bool,
  ids: React.PropTypes.array,
  entities: React.PropTypes.object,
  activeFilter: React.PropTypes.func,
  activeSort: React.PropTypes.func,
};

export default FetchOnScroll(Activities);
