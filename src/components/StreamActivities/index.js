import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import Activities from '../../components/Activities';
import { StreamInteractions } from '../../components/StreamInteractions';

function StreamActivities({
  activities,
  requestInProcess,
  nextHref,
  trackEntities,
  onFetchActivities
}) {
  return (
    <div>
      <StreamInteractions />
      <Activities
        requestInProcess={requestInProcess}
        entities={trackEntities}
        ids={activities}
        scrollFunction={() => onFetchActivities(null, nextHref)}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    trackEntities: state.entities.tracks,
    activities: state.user.activities,
    requestInProcess: state.request[requestTypes.ACTIVITIES],
    nextHref: state.paginate[paginateLinkTypes.ACTIVITIES]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchActivities: bindActionCreators(actions.fetchActivities, dispatch)
  };
}

StreamActivities.propTypes = {
  trackEntities: React.PropTypes.object,
  activities: React.PropTypes.array,
  requestInProcess: React.PropTypes.bool,
  nextHref: React.PropTypes.string,
  onFetchActivities: React.PropTypes.func
};

const StreamActivitiesContainer = connect(mapStateToProps, mapDispatchToProps)(StreamActivities);

export {
  StreamActivities,
  StreamActivitiesContainer
};
