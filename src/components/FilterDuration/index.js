import PropTypes from 'prop-types';
import React from 'react';
import map from '../../services/map';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as filterTypes from '../../constants/filterTypes';
import { DURATION_FILTER_NAMES } from '../../constants/durationFilter';
import ButtonActive from '../../components/ButtonActive';
import ButtonInline from '../../components/ButtonInline';

function hasActiveFilter(activeDurationFilter) {
  const { FILTER_DURATION_TRACK, FILTER_DURATION_MIX } = filterTypes;
  return activeDurationFilter === FILTER_DURATION_TRACK || activeDurationFilter === FILTER_DURATION_MIX;
}

function FilterDuration({
  activeDurationFilter,
  onDurationFilter,
}) {
  const filterDurationIconClass = classNames(
    'stream-interaction-icon',
    {
      'stream-interaction-icon-active': hasActiveFilter(activeDurationFilter)
    }
  );

  return (
    <div className="stream-interaction">
      <div className={filterDurationIconClass} title={'Filter Stream'}>
        <ButtonInline onClick={() => onDurationFilter(filterTypes.ALL)}>
          <i className="fa fa-filter" />
        </ButtonInline>
      </div>
      <div className="stream-interaction-content">
        {
          map((value, key) => {
            return (
              <span key={key}>
                <ButtonActive onClick={() => onDurationFilter(value)} isActive={value === activeDurationFilter}>
                  {DURATION_FILTER_NAMES[value]}
                </ButtonActive>
              </span>
            );
          }, filterTypes)
        }
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    activeDurationFilter: state.filter.durationFilterType
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDurationFilter: (filterType) => bindActionCreators(actions.filterDuration, dispatch)(filterType)
  };
}

FilterDuration.propTypes = {
  activeDurationFilter: PropTypes.string,
  onDurationFilter: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterDuration);
