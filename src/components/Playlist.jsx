import React from 'react';
import MiniTrack from '../components/MiniTrack';

export default class Playlist extends React.Component {

  renderPlaylist() {

    const { playlist } = this.props;

    // if (!activeTrack) { return; }

    // const { origin } = activeTrack;
    // const { user, title, stream_url } = origin;
    // const { username } = user;

    return (<ul>{playlist.toJSON().map((activity, idx) => {
      return (
        <li key={idx}>
          <MiniTrack activity={activity} {...this.props}/>
        </li>
      );
    })}</ul>);
  }

  render() {
    return (<div className={this.props.isOpenPlaylist ? 'playlist playlist-visible' : 'playlist'}>
        {this.renderPlaylist()}
    </div>);
  }

}