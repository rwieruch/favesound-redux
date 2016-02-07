import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { HeaderContainer } from '../containers/HeaderContainer';
import { PlayerContainer } from '../containers/PlayerContainer';
import { PlaylistContainer } from '../containers/PlaylistContainer';
import Activities from '../components/Activities';

export class Browse extends React.Component {

  componentDidMount() {
    this.fetchActivitiesByGenre();
  }

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
    const { genre, activitiesByGenreNextHrefs } = this.props;
    const nextHref = activitiesByGenreNextHrefs.get(genre);
    this.props.fetchActivitiesByGenre(nextHref, genre);
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

function mapStateToProps(state, ownProps) {
  return {
    genre: ownProps.location.query.genre,
    activitiesByGenre: state.browse.get('activitiesByGenre'),
    activitiesByGenreNextHrefs: state.browse.get('activitiesByGenreNextHrefs')
  };
}

export const BrowseContainer = connect(mapStateToProps, actions)(Browse);
