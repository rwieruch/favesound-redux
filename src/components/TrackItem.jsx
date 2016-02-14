import React from 'react';
import Actions from '../components/Actions';
import { isSameTrackAndPlaying, isSameTrack } from '../utils/player';

export default class TrackItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { track, activateTrack, addTrackToPlaylist, isPlaying, activeTrack } = this.props;

    const isVisible = isSameTrack(activeTrack)({ origin: track });
    const trackIsPlaying = isSameTrackAndPlaying(activeTrack, { origin: track }, isPlaying);
    const configuration = [
      {
        className: trackIsPlaying ? 'fa fa-pause' : 'fa fa-play',
        fn: () => activateTrack({ origin: track }),
      },
      {
        className: 'fa fa-th-list',
        fn: () => addTrackToPlaylist({ origin: track })
      }
    ];

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
          <Actions configuration={configuration} isVisible={isVisible} />
        </div>
      </div>
    );
  }
}
