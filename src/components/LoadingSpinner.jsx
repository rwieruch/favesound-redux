import React from 'react';

function LoadingSpinner({ isLoading }) {
  if (isLoading) {
    return (
      <div className="loading-spinner">
        <i className="fa fa-spinner fa-spin"></i>
      </div>
    );
  } else {
    return <span></span>;
  }
}

LoadingSpinner.propTypes = {
  isLoading: React.PropTypes.bool
};

export {
  LoadingSpinner
};
