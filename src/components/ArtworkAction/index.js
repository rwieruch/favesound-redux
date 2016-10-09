import React from 'react';
import classNames from 'classnames';

function ArtworkAction({ action, isVisible, className, children }) {
  const overlayClass = classNames(
    'artwork-action-overlay',
    {
      'artwork-action-overlay-visible': isVisible
    }
  );

  return (
    <div className="artwork-action">
      <div>{children}</div>
      <div onClick={action} className={overlayClass}>
        <i className={className} />
      </div>
    </div>
  );
}

ArtworkAction.propTypes = {
  action: React.PropTypes.func,
  isVisible: React.PropTypes.bool,
  className: React.PropTypes.string,
  children: React.PropTypes.object,
};

export default ArtworkAction;
