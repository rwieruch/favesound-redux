import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import ButtonInline from '../../components/ButtonInline';
import InputMenu from '../../components/InputMenu';

function FilterName({
  filterNameQuery,
  onNameFilter,
}) {
  const filterNameIconClass = classNames(
    'stream-interaction-icon',
    {
      'stream-interaction-icon-active': filterNameQuery
    }
  );

  return (
    <div className="stream-interaction">
      <div className={filterNameIconClass} title={'Search Stream'}>
        <ButtonInline onClick={() => onNameFilter('')}>
          <i className="fa fa-search" />
        </ButtonInline>
      </div>
      <div className="stream-interaction-content">
        <InputMenu
          placeholder="SEARCH..."
          onChange={(event) => onNameFilter(event.target.value)}
          value={filterNameQuery}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    filterNameQuery: state.filter.filterNameQuery
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onNameFilter: bindActionCreators(actions.filterName, dispatch)
  };
}

FilterName.propTypes = {
  filterNameQuery: PropTypes.string,
  onNameFilter: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterName);
