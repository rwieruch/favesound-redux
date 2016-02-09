import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import { connect } from 'react-redux';
import { dehydrate } from '../utils/immutableUtil';
import * as actions from '../actions/index';
import { DEFAULT_GENRE } from '../constants/genre';
import { HeaderContainer } from '../containers/HeaderContainer';
import { PlayerContainer } from '../containers/PlayerContainer';
import { PlaylistContainer } from '../containers/PlaylistContainer';
import Activities from '../components/Activities';

export class Browse extends React.Component {

  constructor(props) {
    super(props);
    this.fetchActivitiesByGenre = this.fetchActivitiesByGenre.bind(this);
  }

  componentDidMount() {
    if (!this.needToFetchActivities()) { return; }
    this.fetchActivitiesByGenre();
  }

  componentDidUpdate() {
    if (!this.needToFetchActivities()) { return; }
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
          scrollFunction={this.fetchActivitiesByGenre}
        />
      </div>);
  }

  fetchActivitiesByGenre() {
    const { genre, activitiesByGenreNextHrefs } = this.props;
    const nextHref = activitiesByGenreNextHrefs.get(genre);
    this.props.fetchActivitiesByGenre(nextHref, genre);
  }

  needToFetchActivities() {
    const { genre, activitiesByGenre } = this.props;
    return dehydrate(activitiesByGenre).filter(this.byGenre(genre)).length < 20;
  }

  byGenre(genre) {
    return (activity) => activity.origin.tag_list.indexOf(genre) !== -1;
  }

  render() {
    return (<div className="browse">
      <HeaderContainer genre={this.props.genre} pathname={this.props.pathname}/>
      {this.getInnerContent()}
      <PlaylistContainer />
      <PlayerContainer />
    </div>);
  }

}

function mapStateToProps(state, routerState) {
  return {
    pathname: routerState.location.pathname,
    genre: routerState.location.query.genre,
    activitiesByGenre: state.browse.get('activitiesByGenre'),
    activitiesByGenreNextHrefs: state.browse.get('activitiesByGenreNextHrefs')
  };
}

export const BrowseContainer = connect(mapStateToProps, actions)(Browse);

Browse.propTypes = {
  pathname: React.PropTypes.string.isRequired,
  genre: React.PropTypes.string.isRequired,
  activitiesByGenre: ImmutablePropTypes.list.isRequired,
  activitiesByGenreNextHrefs: ImmutablePropTypes.map.isRequired
};

Browse.defaultProps = {
  genre: DEFAULT_GENRE
};
