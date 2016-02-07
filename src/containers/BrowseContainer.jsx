import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { HeaderContainer } from '../containers/HeaderContainer';
import { PlayerContainer } from '../containers/PlayerContainer';
import { PlaylistContainer } from '../containers/PlaylistContainer';
import Activities from '../components/Activities';

export class Browse extends React.Component {

  getInnerContent() {
    const { activitiesByGenre } = this.props;
    const filteredActivitiesByGenre = activitiesByGenre; // TODO: filter

    return (<div className="browse-content">
        <Activities
          {...this.props}
          activities={filteredActivitiesByGenre}
          scrollFunction={() => this.fetchActivitiesByGenre()}
        />
      </div>);
  }

  fetchActivitiesByGenre() {
    const { activitiesNextHref } = this.props;
    this.props.fetchActivitiesByGenre(null, activitiesNextHref);
  }

  render() {
    return (<div className="browse">
      <HeaderContainer />
      {this.getInnerContent()}
      <PlaylistContainer />
      <PlayerContainer />
    </div>);
  }

}

function mapStateToProps(state) {
  return {
    activitiesByGenre: state.browse.get('activities'),
  };
}

export const BrowseContainer = connect(mapStateToProps, actions)(Browse);
