import React from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import TrackItem from '../components/TrackItem';
import UserItem from '../components/UserItem';

export default class ItemList extends React.Component {

  constructor(props) {
    super(props);
    this.toggleMore = this.toggleMore.bind(this);
    this.renderChevron = this.renderChevron.bind(this);

    this.state = {
      isMoreToggled: false
    };
  }

  toggleMore() {
    const newToggleState = !this.state.isMoreToggled;
    this.setState({ isMoreToggled: newToggleState });
  }

  fetchMore(nextHref, currentUser, fetchMore) {
    fetchMore(currentUser, nextHref);
  }

  renderChevron() {
    if (this.props.list.length > 4) {
      return <i className={"fa " + (this.state.isMoreToggled ? "fa-chevron-up" : "fa-chevron-down")}></i>;
    } else {
      return <div></div>;
    }
  }

  renderNextButton() {
    const { nextHref, currentUser, fetchMore, requestInProcess } = this.props;

    if (!nextHref || !this.state.isMoreToggled) {
      return;
    }

    if (requestInProcess) {
      return <LoadingSpinner isLoading={requestInProcess} />;
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
        <TrackItem track={track} {...this.props} />
      </li>
    );
  }

  renderUser(user, idx) {
    return (
      <li key={idx}>
        <UserItem user={user} {...this.props} />
      </li>
    );
  }

  renderList() {
    const { list, kind, requestInProcess } = this.props;

    if (!list || requestInProcess) {
      const isLoading = !list || requestInProcess;
      return <LoadingSpinner isLoading={isLoading} />;
    }

    if (kind === 'user') {
      return (<div className="item-list-content">
        <ul>{list.map(this.renderUser.bind(this))}</ul>
      </div>);
    }

    if (kind === 'track') {
      return (<div className="item-list-content">
        <ul>{list.map(this.renderTrack.bind(this))}</ul>
      </div>);
    }
  }

  render() {
    return (
      <div className="item-list">
        <h2>
          <button className="inline" onClick={this.toggleMore}>
            {this.props.title}&nbsp;
            {this.renderChevron()}
          </button>
        </h2>
        <div className={(this.state.isMoreToggled ? "more-visible" : "")}>{this.renderList()}</div>
        <div className="item-list-actions">
          {this.renderNextButton()}
        </div>
      </div>
    );
  }
}
