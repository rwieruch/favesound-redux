import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import Slider from 'react-rangeslider';

class VolumeSlider extends React.Component {
  constructor(props, context) {
    super(props, context);
    const { volume } = this.props;
    this.state = {
      value: volume
    };
  }

  handleChange = (value) => {
    const { onChangeVolume } = this.props;
    this.setState({
      volume: value
    });

    onChangeVolume(value);
  }

  render() {
    const { volume } = this.props;
    return (
      <Slider
        min={0}
        max={100}
        value={volume}
        orientation="vertical"
        onChange={this.handleChange}
      />
    );
  }
}


function Volume({ toggle, volume, onChangeVolume }) {
  const volumeClass = classNames(
    'volume',
    {
      'volume-visible': toggle[toggleTypes.VOLUME]
    }
  );

  return (
    <div className={volumeClass}>
      <div>
        <h2 className="volume-number">{ volume }</h2>
        <VolumeSlider volume={volume} onChangeVolume={onChangeVolume}/>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    toggle: state.toggle,
    volume: state.player.volume,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeVolume: bindActionCreators(actions.changeVolume, dispatch),
  };
}

Volume.propTypes = {
  onChangeVolume: React.PropTypes.func,
  volume: React.PropTypes.number,
  toggle: React.PropTypes.object
};

const VolumeContainer = connect(mapStateToProps, mapDispatchToProps)(Volume);

export {
  Volume,
  VolumeContainer
};
