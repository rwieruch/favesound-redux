import React from 'react';

export default class TrackItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { track } = this.props;
    console.log(track);
    return (
      <div className="item">
        <div>
          <img src={track.artwork_url} alt={track.title} height="40" width="40"/>
        </div>
        <div className="item-content">
          <div className="item-content-name">
            <a href={track.permalink_url}>
              {track.title}
            </a>
          </div>
          <div className="item-content-info">
            <div className="item-content-info-item">
              <i className="fa fa-play"></i>&nbsp;{track.playback_count}
            </div>
            <div className="item-content-info-item">
              <i className="fa fa-heart"></i>&nbsp;{track.favoritings_count}
            </div>
            <div className="item-content-info-item">
              <i className="fa fa-comment"></i>&nbsp;{track.comment_count}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
