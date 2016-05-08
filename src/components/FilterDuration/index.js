import React from 'react';
import map from '../../services/map';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as filterTypes from '../../constants/filterTypes';
import { DURATION_FILTER_NAMES } from '../../constants/durationFilter';
import { ButtonActive } from '../../components/ButtonActive';
import { ButtonInline } from '../../components/ButtonInline';

function hasActiveFilter(activeDurationFilter) {
  const { FILTER_DURATION_TRACK, FILTER_DURATION_MIX } = filterTypes;
  return activeDurationFilter === FILTER_DURATION_TRACK || activeDurationFilter === FILTER_DURATION_MIX;
}

function FilterDuration({
  activeDurationFilter,
  onDurationFilter,
}) {
  const filterDurationIconClass = classNames(
    'filter-duration-icon',
    {
      'filter-duration-icon-active': hasActiveFilter(activeDurationFilter)
    }
  );

  return (
    <div className="filter-duration">
      <div className={filterDurationIconClass}>
        <ButtonInline onClick={() => onDurationFilter(filterTypes.NONE)}>
          <i className="fa fa-filter" />&nbsp;
        </ButtonInline>
      </div>
      <div className="filter-duration-content">
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
    activeDurationFilter: state.filter.durationFilter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDurationFilter: (filterType) => bindActionCreators(actions.filterDuration, dispatch)(filterType)
  };
}

FilterDuration.propTypes = {
  activeDurationFilter: React.PropTypes.string,
  onDurationFilter: React.PropTypes.func
};

const FilterDurationContainer = connect(mapStateToProps, mapDispatchToProps)(FilterDuration);

export {
  FilterDuration,
  FilterDurationContainer
};
