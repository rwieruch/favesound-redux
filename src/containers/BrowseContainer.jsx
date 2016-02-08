import React from 'react';
import { connect } from 'react-redux';
import { dehydrate } from '../utils/immutableUtil';
import * as actions from '../actions/index';
import { DEFAULT_GENRE } from '../constants/browse';
import { HeaderContainer } from '../containers/HeaderContainer';
import { PlayerContainer } from '../containers/PlayerContainer';
import { PlaylistContainer } from '../containers/PlaylistContainer';
import Activities from '../components/Activities';

export class Browse extends React.Component {

  componentDidMount() {
    this.fetchActivitiesByGenre();
  }

  componentDidUpdate() {
    this.fetchActivitiesByGenre();
  }

  getInnerContent() {
    const { activitiesByGenre, genre } = this.props;

    if (!activitiesByGenre) { return; }

    const activitiesByGenreD = dehydrate(activitiesByGenre);
    const filteredActivitiesByGenre = activitiesByGenreD.filter(this.byGenre(genre));

    return (<div className="browse-content">
        <Activities
          {...this.props}
          activities={filteredActivitiesByGenre}
          scrollFunction={() => this.fetchActivitiesByGenre()}
        />
      </div>);
  }

  byGenre(genre) {
    return (activity) => activity.origin.tag_list.indexOf(genre) !== -1;
  }

  fetchActivitiesByGenre() {
    const { genre, activitiesByGenreNextHrefs } = this.props;
    const nextHref = activitiesByGenreNextHrefs.get(genre);
    this.props.fetchActivitiesByGenre(nextHref, genre);
  }

  render() {
    return (<div className="browse">
      <HeaderContainer genre={this.props.genre}/>
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

Browse.defaultProps = {
  genre: DEFAULT_GENRE
};
