import React from 'react';
import FetchOnScroll from '../components/FetchOnScroll';
import Track from '../components/Track';
import { LoadingSpinner } from '../components/LoadingSpinner';

class Activities extends React.Component {

  renderActivity(id, idx) {
    const { entities } = this.props;
    return (
      <li key={idx}>
        <Track activity={entities[id]} idx={idx} {...this.props}/>
      </li>
    );
  }

  renderActivities() {
    const { ids } = this.props;

    if (!ids) {
      return;
    }

    return <ul>{ids.map(this.renderActivity.bind(this))}</ul>;
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
