import React from 'react';
import FetchOnScroll from '../components/FetchOnScroll';

class Activities extends React.Component {

  renderActivities() {
    const { activities } = this.props;

    if (!activities) {
      return '';
    }

    return (<ul>{activities.toJSON().map((activity, idx) => {
      return (
        <li key={idx}>
          {activity.type}
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