import React from 'react';

export default class Header extends React.Component {

  renderHeader() {

    const { currentUser } = this.props;


    return (<div className='header-content'>
      <h1>Hello {currentUser.username}</h1>
    </div>);
  }

  render() {
    return <div className='header'>{this.renderHeader()}</div>;
  }

}