import PropTypes from 'prop-types';
import React from 'react';
import find from 'lodash/fp/find';
import InfoList from '../../components/InfoList';
import Actions from '../../components/HoverActions';
import Artwork from '../../components/Artwork';
import Permalink from '../../components/Permalink';

function UserPreview({ user, followings, onFollow }) {
  const { followings_count, followers_count, track_count, avatar_url, username, permalink_url } = user;

  const configuration = [
    {
      className: find((following) => following === user.id, followings) ? 'fa fa-group is-active' : 'fa fa-group',
      fn: () => onFollow(user)
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

UserPreview.propTypes = {
  followings: PropTypes.array,
  user: PropTypes.object,
  onFollow: PropTypes.func
};

export {
  UserPreview
};
