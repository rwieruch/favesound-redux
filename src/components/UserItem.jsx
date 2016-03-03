import React from 'react';
import _ from 'lodash';
import { Actions } from '../components/Actions';

export default class UserItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { user, follow, followings } = this.props;

    const configuration = [
      {
        className: _.find(followings, (following) => following === user.id) ? 'fa fa-group is-active' : 'fa fa-group',
        fn: () => follow(user)
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
          <div className="item-content-info">
            <div className="item-content-info-item">
              <i className="fa fa-user-plus"></i>&nbsp;{user.followings_count}
            </div>
            <div className="item-content-info-item">
              <i className="fa fa-group"></i>&nbsp;{user.followers_count}
            </div>
            <div className="item-content-info-item">
              <i className="fa fa-music"></i>&nbsp;{user.track_count}
            </div>
          </div>
          <Actions configuration={configuration} />
        </div>
      </div>
    );
  }
}
