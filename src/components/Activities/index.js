import React from 'react';
import map from '../../services/map';
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

function Activities({
  requestInProcess,
  ids,
  entities,
  activeFilter
}) {
  return (
    <div>
      <div>
        <ul>
          {map((id, idx) => {
            const activity = entities[id];
            if (!activeFilter(activity)) { return null; }

            const activityProps = { activity, idx };
            return <Activity key={idx} { ...activityProps } />;
          }, ids)}
        </ul>
      </div>
      <LoadingSpinner isLoading={requestInProcess || !ids} />
    </div>
  );
}

Activities.propTypes = {
  requestInProcess: React.PropTypes.bool,
  ids: React.PropTypes.array,
  entities: React.PropTypes.object
};

export default FetchOnScroll(Activities);
