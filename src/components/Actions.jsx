import React from 'react';

function renderAction(action, idx) {
  return (
    <span key={idx} className="action-item">
      <i
        className={action.className}
        onClick={action.fn}
      >
      </i>
    </span>
  );
}

export const Actions = ({ configuration, isVisible }) => {
  return (
    <div className={"action " + (isVisible ? "action-visible" : "")}>
      {configuration.map(renderAction)}
    </div>
  );
};

Actions.propTypes = {
  configuration: React.PropTypes.array,
  isVisible: React.PropTypes.bool
};
