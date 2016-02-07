import React from 'react';
import FetchOnScroll from '../components/FetchOnScroll';
import Track from '../components/Track';
import LoadingSpinner from '../components/LoadingSpinner';

class Activities extends React.Component {

  renderActivity(activity, idx) {
    return (
      <li key={idx}>
        <Track activity={activity} idx={idx} {...this.props}/>
      </li>
    );
  }

  renderActivities() {
    const { activities } = this.props;

    if (!activities) {
      return;
    }

    return <ul>{activities.toJSON().map(this.renderActivity.bind(this))}</ul>;
  }

  renderActivitiesRequestInProcess() {
    const { activitiesRequestInProcess } = this.props;

    if (activitiesRequestInProcess) {
      return <LoadingSpinner />;
    }
  }

  render() {
    return (
      <div>
        <div>{this.renderActivities()}</div>
        <div>{this.renderActivitiesRequestInProcess()}</div>
      </div>);
  }

}

export default FetchOnScroll(Activities);
