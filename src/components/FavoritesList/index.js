import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import { List } from '../../components/List';

function FavoritesList({
  currentUser,
  trackEntities,
  favorites,
  nextHref,
  requestInProcess,
  isExpanded,
  onSetToggle,
  onFetchFavorites
}) {
  return (
    <List
      title="Favorites"
      ids={favorites}
      entities={trackEntities}
      nextHref={nextHref}
      requestInProcess={requestInProcess}
      isExpanded={isExpanded}
      currentUser={currentUser}
      onToggleMore={() => onSetToggle(toggleTypes.FAVORITES)}
      onFetchMore={() => onFetchFavorites(currentUser, nextHref)}
      kind="TRACK"
    />
  );
}

function mapStateToProps(state) {
  const nextHref = state.paginate[paginateLinkTypes.FAVORITES];
  const requestInProcess = state.request[requestTypes.FAVORITES];
  const isExpanded = state.toggle[toggleTypes.FAVORITES];

  return {
    currentUser: state.session.user,
    trackEntities: state.entities.tracks,
    favorites: state.user.favorites,
    nextHref,
    requestInProcess,
    isExpanded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSetToggle: bindActionCreators(actions.setToggle, dispatch),
    onFetchFavorites: bindActionCreators(actions.fetchFavorites, dispatch)
  };
}

FavoritesList.propTypes = {
  currentUser: React.PropTypes.object,
  trackEntities: React.PropTypes.object,
  favorites: React.PropTypes.array,
  requestsInProcess: React.PropTypes.object,
  paginateLinks: React.PropTypes.object,
  toggle: React.PropTypes.object,
  onSetToggle: React.PropTypes.func,
  onFetchFavorites: React.PropTypes.func
};

const FavoritesListContainer = connect(mapStateToProps, mapDispatchToProps)(FavoritesList);

export {
  FavoritesList,
  FavoritesListContainer
};
