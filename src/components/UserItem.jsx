import React from 'react';
import { find } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { InfoList } from '../components/InfoList';
import { Actions } from '../components/Actions';
import * as actions from '../actions/index';

const UserItem = ({ user, followings, follow }) => {
  const { followings_count, followers_count, track_count } = user;

  const configuration = [
    {
      className: find(followings, (following) => following === user.id) ? 'fa fa-group is-active' : 'fa fa-group',
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
        <img src={user.avatar_url} alt={user.username} height="40" width="40"/>
      </div>
      <div className="item-content">
        <div className="item-content-name">
          <a href={user.permalink_url}>
            {user.username}
          </a>
        </div>
        <InfoList information={information} />
        <Actions configuration={configuration} />
      </div>
    </div>
  );
};

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

export const UserItemContainer = connect(mapStateToProps, mapDispatchToProps)(UserItem);
