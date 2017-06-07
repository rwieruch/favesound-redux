import PropTypes from 'prop-types';
import React from 'react';

function LoadingSpinner({ isLoading }) {
  if (!isLoading) { return null; }

  return (
    <div className="loading-spinner">
      <i className="fa fa-spinner fa-spin"></i>
    </div>
  );
}

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool
};

export default LoadingSpinner;
