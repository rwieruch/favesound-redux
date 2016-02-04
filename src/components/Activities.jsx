import React from 'react';
import FetchOnScroll from '../components/FetchOnScroll';
import Track from '../components/Track';

class Activities extends React.Component {

  renderActivities() {
    const { activities, activeTrack, activateTrack } = this.props;

    if (!activities) {
      return '';
    }

    return (<ul>{activities.toJSON().map((activity, idx) => {
      return (
        <li key={idx}>
          <Track activity={activity} {...this.props}/>
        </li>
      );
    })}</ul>);
  }

  renderActivitiesRequestInProcess() {
    const { activitiesRequestInProcess } = this.props;

    if (activitiesRequestInProcess) {
      return <div>Loading ...</div>;
    } else {
      return <div></div>;
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