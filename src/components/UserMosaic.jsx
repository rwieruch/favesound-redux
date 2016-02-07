import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

export default class UserMosaic extends React.Component {

  constructor(props) {
    super(props);
    this.isMoreToggled = props.isMoreToggled;
  }

  toggleMore() {
    this.isMoreToggled = !this.isMoreToggled;
  }

  fetchMore(nextHref, currentUser, fetchMore) {
    fetchMore(currentUser, nextHref);
  }

  renderNextButton() {
    const { nextHref, currentUser, fetchMore, requestInProcess } = this.props;

    if (!nextHref || !this.isMoreToggled) {
      return '';
    }

    if (requestInProcess) {
      return <div className="user-mosaic"><LoadingSpinner /></div>;
    }

    return (
      <button
        className="ghost"
        onClick={this.fetchMore.bind(this, nextHref, currentUser, fetchMore)}
      >
        More
      </button>
    );
  }

  renderTrack(track, idx) {
    return (
      <li key={idx}>
        <a href={track.permalink_url}>
          <img src={track.artwork_url} alt={track.title} height="40" width="40"/>
        </a>
      </li>
    );
  }

  renderUser(user, idx) {
    return (
      <li key={idx}>
        <a href={user.permalink_url}>
          <img src={user.avatar_url} alt={user.username} height="40" width="40"/>
        </a>
      </li>
    );
  }

  renderMosaic() {
    const { list, kind, requestInProcess } = this.props;

    if (!list || requestInProcess) {
      return <div className="user-mosaic"><LoadingSpinner /></div>;
    }

    if (kind === 'user') {
      return (<div className="user-mosaic-content">
        <ul>{list.toJSON().map(this.renderUser)}</ul>
      </div>);
    }

    if (kind === 'track') {
      return (<div className="user-mosaic-content">
        <ul>{list.toJSON().map(this.renderTrack)}</ul>
      </div>);
    }
  }

  render() {
    return (
      <div className="user-mosaic">
        <h2>
          <a href="#" onClick={() => this.toggleMore()}>
            {this.props.title}&nbsp;
            <i className={"fa " + (this.isMoreToggled ? "fa-chevron-up" : "fa-chevron-down")}></i>
          </a>
        </h2>
        <div className={(this.isMoreToggled ? "more-visible" : "")}>{this.renderMosaic()}</div>
        <div className="user-mosaic-actions">
          {this.renderNextButton()}
        </div>
      </div>
    );
  }
}

UserMosaic.propTypes = {
  isMoreToggled: React.PropTypes.bool
};

UserMosaic.defaultProps = {
  isMoreToggled: false
};
