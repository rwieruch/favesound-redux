import PropTypes from 'prop-types';
import React from 'react';
import Waveform from 'waveform.js';
import { normalizeSamples } from '../../services/track';

const WAVE_COLOR = '#61B25A';

class WaveformSc extends React.Component {

  componentDidMount() {
    const { activity } = this.props;

    if (!activity) { return; }

    const { waveform_url } = activity;

    if (!waveform_url) { return; }

    const waveformUrlJson = waveform_url.replace('.png', '.json');

    this.fetchJsonWaveform(this.waveformCanvas, waveformUrlJson);

    // Png version will cause errors.
    // if (isPngWaveform(waveform_url)) {
    //   this.fetchPngWaveform(elementId, activity);
    // }
  }

  fetchJsonWaveform(waveformCanvas, waveformUrl) {
    fetch(waveformUrl)
      .then(response => response.json())
      .then((data) => {
        new Waveform({
          container: waveformCanvas,
          innerColor: WAVE_COLOR,
          data: normalizeSamples(data.samples)
        });
      });
  }
  // Seems like SoundCloud has switched to json instead of png.
  // fetchPngWaveform(elementId, activity) {
  //   const waveform = new Waveform({
  //     container: document.getElementById(elementId),
  //     innerColor: WAVE_COLOR
  //   });
  //   waveform.dataFromSoundCloudTrack(activity);
  // }

  render() {
    return <div className="track-waveform-json" ref={(waveform) => { this.waveformCanvas = waveform; }} />;
  }

}

WaveformSc.propTypes = {
  activity: PropTypes.object,
};

export default WaveformSc;
