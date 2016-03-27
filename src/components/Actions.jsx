import React from 'react';
import map from 'lodash/fp/map';

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

export function Actions({ configuration, isVisible }) {
  return (
    <div className={"action " + (isVisible ? "action-visible" : "")}>
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
