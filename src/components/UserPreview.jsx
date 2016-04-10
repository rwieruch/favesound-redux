import React from 'react';
import find from 'lodash/fp/find';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { InfoList } from '../components/InfoList';
import { Actions } from '../components/Actions';
import { Artwork } from '../components/Artwork';
import { Permalink } from '../components/Permalink';
import * as actions from '../actions/index';

function UserPreview({ user, followings, follow }) {
  const { followings_count, followers_count, track_count, avatar_url, username, permalink_url } = user;

  const configuration = [
    {
      className: find((following) => following === user.id, followings) ? 'fa fa-group is-active' : 'fa fa-group',
      fn: () => follow(user)
    }
  ];

  const information = [
    {
      className: 'fa fa-plus',
      count: followings_count
    },
    {
      className: 'fa fa-group',
      count: followers_count
    },
    {
      className: 'fa fa-music',
      count: track_count
    }
  ];

  return (
    <div className="item">
      <div>
        <Artwork image={avatar_url} title={username} size={40} />
      </div>
      <div className="item-content">
        <Permalink link={permalink_url} text={username} />
        <InfoList information={information} />
        <Actions configuration={configuration} />
      </div>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    followings: state.user.followings,
    user: ownProps.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    follow: bindActionCreators(actions.follow, dispatch)
  };
}

UserPreview.propTypes = {
  followings: React.PropTypes.array,
  user: React.PropTypes.object,
  follow: React.PropTypes.func
};

const UserPreviewContainer = connect(mapStateToProps, mapDispatchToProps)(UserPreview);

export {
  UserPreview,
  UserPreviewContainer
};
