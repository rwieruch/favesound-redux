import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import { ButtonInline } from '../../components/ButtonInline';


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
        { volume }
        <ButtonInline onClick={() => onChangeVolume(50)}>
          change volume to 50
        </ButtonInline>
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
