import React from 'react';
import FetchOnScroll from '../components/FetchOnScroll';
import { TrackContainer } from '../components/Track';
import { LoadingSpinner } from '../components/LoadingSpinner';

const renderActivity = (entities) => (id, idx) => {
  return (
    <li key={idx}>
      <TrackContainer activity={entities[id]} idx={idx} />
    </li>
  );
};

const renderActivities = (ids, entities) => {
  if (!ids) {
    return;
  }

  return <ul>{ids.map(renderActivity(entities))}</ul>;
};

const Activities = ({ requestInProcess, ids, entities, scrollFunction }) => {
  return (
    <div>
      <div>{renderActivities(ids, entities)}</div>
      <LoadingSpinner isLoading={requestInProcess}/>
    </div>
  );
};

export default FetchOnScroll(Activities);

Activities.propTypes = {
  activities: React.PropTypes.array,
  scrollFunction: React.PropTypes.func
};
