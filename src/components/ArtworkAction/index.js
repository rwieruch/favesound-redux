import PropTypes from 'prop-types';
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
  action: PropTypes.func,
  isVisible: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.object,
};

export default ArtworkAction;
