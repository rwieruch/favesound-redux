import React from 'react';
import Actions from '../components/Actions';
import { isSameTrackAndPlaying, isSameTrack } from '../utils/player';

export default class TrackItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { activity, activateTrack, addTrackToPlaylist, isPlaying, activeTrack } = this.props;

    const isVisible = isSameTrack(activeTrack)(activity);
    const trackIsPlaying = isSameTrackAndPlaying(activeTrack, activity, isPlaying);
    const configuration = [
      {
        className: trackIsPlaying ? 'fa fa-pause' : 'fa fa-play',
        fn: () => activateTrack(activity),
      },
      {
        className: 'fa fa-th-list',
        fn: () => addTrackToPlaylist(activity)
      }
    ];

    return (
      <div className="item">
        <div>
          <img src={activity.artwork_url} alt={activity.title} height="40" width="40"/>
        </div>
        <div className="item-content">
          <div className="item-content-name">
            <a href={activity.permalink_url}>
              {activity.title}
            </a>
          </div>
          <div className="item-content-info">
            <div className="item-content-info-item">
              <i className="fa fa-play"></i>&nbsp;{activity.playback_count}
            </div>
            <div className="item-content-info-item">
              <i className="fa fa-heart"></i>&nbsp;{activity.favoritings_count}
            </div>
            <div className="item-content-info-item">
              <i className="fa fa-comment"></i>&nbsp;{activity.comment_count}
            </div>
          </div>
          <Actions configuration={configuration} isVisible={isVisible} />
        </div>
      </div>
    );
  }
}
