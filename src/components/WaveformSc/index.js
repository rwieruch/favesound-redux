import React from 'react';
import Waveform from 'waveform.js';
import { normalizeSamples, isJsonWaveform, isPngWaveform } from '../../services/track';

const WAVE_COLOR = '#61B25A';

class WaveformSc extends React.Component {

  componentDidMount() {
    const { activity, idx } = this.props;

    if (!activity) { return; }

    const { waveform_url, id } = activity;

    if (!waveform_url) { return; }

    const elementId = this.generateElementId(id, idx);

    if (isJsonWaveform(waveform_url)) {
      this.fetchJsonWaveform(elementId, waveform_url);
    }

    if (isPngWaveform(waveform_url)) {
      this.fetchPngWaveform(elementId, activity);
    }
  }

  fetchJsonWaveform(elementId, waveformUrl) {
    fetch(waveformUrl)
      .then(response => response.json())
      .then((data) => {
        new Waveform({
          container: document.getElementById(elementId),
          innerColor: WAVE_COLOR,
          data: normalizeSamples(data.samples)
        });
      });
  }

  fetchPngWaveform(elementId, activity) {
    const waveform = new Waveform({
      container: document.getElementById(elementId),
      innerColor: WAVE_COLOR
    });
    waveform.dataFromSoundCloudTrack(activity);
  }

  generateElementId(id, idx) {
    return `waveform-${id}${idx}`;
  }

  render() {
    const { activity, idx } = this.props;
    const { id } = activity;

    return <div className="track-content-waveform-json" id={"waveform-" + id + idx}></div>;
  }

}

WaveformSc.propTypes = {
  activity: React.PropTypes.object,
  idx: React.PropTypes.number
};

export {
  WaveformSc
};
