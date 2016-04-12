import React from 'react';
import map from '../../services/map';
import classNames from 'classnames';

function Action({ action }) {
  return (
    <span className="action-item">
      <i
        className={action.className}
        onClick={action.fn}
      >
      </i>
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
      {map((action, idx) => {
        return <Action key={idx} action={action} />;
      }, configuration)}
    </div>
  );
}

Actions.propTypes = {
  configuration: React.PropTypes.array,
  isVisible: React.PropTypes.bool
};

export {
  Actions,

  Action
};
