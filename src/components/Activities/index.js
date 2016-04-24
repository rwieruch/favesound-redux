import React from 'react';
import map from '../../services/map';
import FetchOnScroll from '../../components/FetchOnScroll';
import { TrackStreamContainer } from '../../components/Track';
import { TrackExtensionContainer } from '../../components/TrackExtension';
import { LoadingSpinner } from '../../components/LoadingSpinner';

function Activity({ entities, id, idx }) {
  const activity = entities[id];

  return (
    <li>
      <TrackStreamContainer activity={activity} idx={idx} />
      <TrackExtensionContainer activity={activity} />
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
          {map((id, idx) => {
            const props = { entities, id, idx };
            return <Activity key={idx} { ...props } />;
          }, ids)}
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
