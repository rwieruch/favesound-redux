import PropTypes from 'prop-types';
import React from 'react';
import map from '../../services/map';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as dateSortTypes from '../../constants/dateSortTypes';
import { DATE_SORT_NAMES } from '../../constants/sort';
import ButtonActive from '../../components/ButtonActive';
import ButtonInline from '../../components/ButtonInline';

function hasActiveSort(activeDateSort) {
  return activeDateSort !== dateSortTypes.NONE;
}

function DateSort({
                    activeDateSort,
                    onSort,
                  }) {
  const sortIconClass = classNames(
    'stream-interaction-icon',
    {
      'stream-interaction-icon-active': hasActiveSort(activeDateSort)
    }
  );

  return (
    <div className="stream-interaction">
      <div className={sortIconClass} title={'Sort Stream'}>
        <ButtonInline onClick={() => onSort(dateSortTypes.NONE)}>
          <i className="fa fa-sort"/>
        </ButtonInline>
      </div>
      <div className="stream-interaction-content">
        {
          map((value, key) => {
            return (
              <span key={key}>
                <ButtonActive onClick={() => onSort(value)} isActive={value === activeDateSort}>
                  {DATE_SORT_NAMES[value]}
                </ButtonActive>
              </span>
            );
          }, dateSortTypes)
        }
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    activeDateSort: state.sort.dateSortType
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSort: (dateSortType) => bindActionCreators(actions.dateSortStream, dispatch)(dateSortType)
  };
}

DateSort.propTypes = {
  activeDateSort: PropTypes.string,
  onSort: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DateSort);
