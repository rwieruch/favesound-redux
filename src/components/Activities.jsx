import React from 'react';

export class Activities extends React.Component {

  renderActivities() {
    const { activities } = this.props;

    if (!activities) {
      return '';
    }

    return (<ul>{activities.toJSON().map((activity, idx) => {
      return (
        <li key={idx}>
          {activity.type}
        </li>
      );
    })}</ul>);
  }

  render() {
    return <div>{this.renderActivities()}</div>;
  }

}