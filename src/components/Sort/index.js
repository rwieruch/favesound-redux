import PropTypes from 'prop-types';
import React from 'react';
import map from '../../services/map';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as sortTypes from '../../constants/sortTypes';
import { SORT_NAMES } from '../../constants/sort';
import ButtonActive from '../../components/ButtonActive';
import ButtonInline from '../../components/ButtonInline';

function hasActiveSort(activeSort) {
  return activeSort !== sortTypes.NONE;
}

function Sort({
  activeSort,
  onSort,
}) {
  const sortIconClass = classNames(
    'stream-interaction-icon',
    {
      'stream-interaction-icon-active': hasActiveSort(activeSort)
    }
  );

  return (
    <div className="stream-interaction">
      <div className={sortIconClass} title={'Sort Stream'}>
        <ButtonInline onClick={() => onSort(sortTypes.NONE)}>
          <i className="fa fa-sort" />
        </ButtonInline>
      </div>
      <div className="stream-interaction-content">
        {
          map((value, key) => {
            return (
              <span key={key}>
                <ButtonActive onClick={() => onSort(value)} isActive={value === activeSort}>
                  {SORT_NAMES[value]}
                </ButtonActive>
              </span>
            );
          }, sortTypes)
        }
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    activeSort: state.sort.sortType
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSort: (sortType) => bindActionCreators(actions.sortStream, dispatch)(sortType)
  };
}

Sort.propTypes = {
  activeSort: PropTypes.string,
  onSort: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
