import React from 'react';
import classNames from 'classnames';

function ActionArtwork({ action, isVisible, className, children }) {
  const overlayClass = classNames(
    'action-artwork-overlay',
    {
      'action-artwork-overlay-visible': isVisible
    }
  );

  return (
    <div className="action-artwork">
      <div>{children}</div>
      <div className={overlayClass} onClick={action}>
        <i className={className} />
      </div>
    </div>
  );
}

export {
  ActionArtwork
};