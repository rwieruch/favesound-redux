import React from 'react';

export default class Followings extends React.Component {

  renderFollowings() {
    const { followings } = this.props;

    if (!followings) {
      return '';
    }

    return (<ul>{followings.toJSON().map((following, idx) => {
      return (
        <li key={idx}>
          {following.username}
        </li>
      );
    })}</ul>);
  }

  render() {
    return (
      <div>
        <div>{this.renderFollowings()}</div>
      </div>);
  }

}