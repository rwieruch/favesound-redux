import React from 'react';

export default class Actions extends React.Component {

  renderAction(action, idx) {
    return (
      <div key={idx} className="action-item">
        <i
          className={action.className}
          onClick={action.fn}
        >
        </i>
      </div>
    );
  }

  render() {
    const { configuration, isVisible } = this.props;
    return (
      <div className={"action " + (isVisible ? "is-visible" : "")}>
        {configuration.map(this.renderAction)}
      </div>
    );
  }
}
