import React from 'react';

export default class UserMosaic extends React.Component {

  constructor(props) {
    super(props);
    this.stisMoreToggledate = props.isMoreToggled;
  }

  toggleMore() {
    this.isMoreToggled = !this.isMoreToggled;
  }

  renderNextButton() {

    let { nextHref, currentUser } = this.props;

    if (!nextHref || !this.isMoreToggled) {
      return '';
    }

    return <button className='ghost' onClick={() => this.props.fetchMore(currentUser, nextHref)}>More</button>;
  }

  renderUsers() {
    const { userList } = this.props;

    if (!userList) {
      return '';
    }

    return (<div className='user-mosaic-content'>
      <ul>{userList.toJSON().map((user, idx) => {
        return (
          <li key={idx}>
            <a href={user.permalink_url}>
              <img src={user.avatar_url} alt={user.username} height='40' width='40'/>
            </a>
          </li>
        );
      })}</ul>
    </div>);
  }

  render() {
    return (<div className='user-mosaic'>
      <h2>
        <a href='#' onClick={() => this.toggleMore()}>
          {this.props.title}&nbsp;
          <i className={'fa ' + (this.isMoreToggled ? 'fa-chevron-up' : 'fa-chevron-down')}></i>
        </a>
      </h2>
      <div className={(this.isMoreToggled ? 'more-visible' : '')}>{this.renderUsers()}</div>
      <div className='user-mosaic-actions'>
        {this.renderNextButton()}
      </div>
    </div>);
  }

}

UserMosaic.propTypes = {
  isMoreToggled: React.PropTypes.bool
};

UserMosaic.defaultProps = {
  isMoreToggled: false
};