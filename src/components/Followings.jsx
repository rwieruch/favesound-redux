import React from 'react';

export default class Followings extends React.Component {

  constructor(props) {
    super(props);
    this.stisMoreToggledate = props.isMoreToggled;
  }

  toggleMore() {
    this.isMoreToggled = !this.isMoreToggled;
  }

  renderFollowings() {
    const { followings } = this.props;

    if (!followings) {
      return '';
    }

    return (<div className='followings-content'>
      <ul>{followings.toJSON().map((following, idx) => {
        return (
          <li key={idx}>
            <a href={following.permalink_url}>
              <img src={following.avatar_url} alt={following.username} height='40' width='40'/>
            </a>
          </li>
        );
      })}</ul>
    </div>);
  }

  render() {
    return (<div className='followings'>
      <h2>
        <a href='#' onClick={() => this.toggleMore()}>
          {this.props.title}&nbsp;
          <i className={'fa ' + (this.isMoreToggled ? 'fa-chevron-up' : 'fa-chevron-down')}></i>
        </a>
      </h2>
      <div className={(this.isMoreToggled ? 'more' : '')}>{this.renderFollowings()}</div>
    </div>);
  }

}

Followings.propTypes = {
  isMoreToggled: React.PropTypes.bool
};

Followings.defaultProps = {
  isMoreToggled: false
};