import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import * as requestTypes from '../constants/requestTypes';
import * as paginateLinkTypes from '../constants/paginateLinkTypes';
import Activities from '../components/Activities';

function StreamActivities({
  activities,
  requestsInProcess,
  paginateLinks,
  trackEntities,
  fetchActivities
}) {
  return (
    <Activities
      requestInProcess={requestsInProcess[requestTypes.ACTIVITIES]}
      entities={trackEntities}
      ids={activities}
      scrollFunction={() => fetchActivities(null, paginateLinks[paginateLinkTypes.ACTIVITIES])}
    />
  );
}

function mapStateToProps(state) {
  return {
    trackEntities: state.entities.tracks,
    activities: state.user.activities,
    requestsInProcess: state.request,
    paginateLinks: state.paginate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchActivities: bindActionCreators(actions.fetchActivities, dispatch)
  };
}

StreamActivities.propTypes = {
  trackEntities: React.PropTypes.object,
  activities: React.PropTypes.array,
  requestsInProcess: React.PropTypes.object,
  paginateLinks: React.PropTypes.object,
  fetchActivities: React.PropTypes.func
};

const StreamActivitiesContainer = connect(mapStateToProps, mapDispatchToProps)(StreamActivities);

export {
  StreamActivities,
  StreamActivitiesContainer
};
