import React from 'react';
import map from 'lodash/map';
import FetchOnScroll from '../components/FetchOnScroll';
import { TrackStreamContainer } from '../components/TrackContainer';
import { LoadingSpinner } from '../components/LoadingSpinner';

function Activity({ entities, id, idx }) {
  return (
    <li>
      <TrackStreamContainer activity={entities[id]} idx={idx} />
    </li>
  );
}

function Activities({ requestInProcess, ids, entities }) {
  if (!ids) {
    return <LoadingSpinner isLoading={requestInProcess}/>;
  }

  return (
    <div>
      <div>
        <ul>
          {map(ids, (id, idx) => {
            const props = { entities, id, idx };
            return <Activity key={idx} { ...props } />;
          })}
        </ul>
      </div>
      <LoadingSpinner isLoading={requestInProcess}/>
    </div>
  );
}

Activities.propTypes = {
  requestInProcess: React.PropTypes.bool,
  ids: React.PropTypes.array,
  entities: React.PropTypes.object
};

export default FetchOnScroll(Activities);
