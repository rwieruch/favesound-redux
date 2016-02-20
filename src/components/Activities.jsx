import React from 'react';
import FetchOnScroll from '../components/FetchOnScroll';
import Track from '../components/Track';
import { LoadingSpinner } from '../components/LoadingSpinner';

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

    return <ul>{activities.map(this.renderActivity.bind(this))}</ul>;
  }

  render() {
    return (
      <div>
        <div>{this.renderActivities()}</div>
        <LoadingSpinner isLoading={this.props.requestInProcess}/>
      </div>);
  }

}

export default FetchOnScroll(Activities);

Activities.propTypes = {
  activities: React.PropTypes.array,
  scrollFunction: React.PropTypes.func
};
