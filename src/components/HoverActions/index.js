import PropTypes from 'prop-types';
import React from 'react';
import map from '../../services/map';
import classNames from 'classnames';
import ButtonInline from '../../components/ButtonInline';

function Action({ actionItem }) {
  return (
    <span className="action-item">
      <ButtonInline onClick={actionItem.fn}>
        <i className={actionItem.className} />
      </ButtonInline>
    </span>
  );
}

function Actions({ configuration, isVisible }) {
  const actionsClass = classNames(
    'action',
    {
      'action-visible': isVisible
    }
  );

  return (
    <div className={actionsClass}>
      {map((actionItem, key) => {
        return <Action key={key} actionItem={actionItem} />;
      }, configuration)}
    </div>
  );
}

Actions.propTypes = {
  configuration: PropTypes.array,
  isVisible: PropTypes.bool
};

export default Actions;
export { Action };
