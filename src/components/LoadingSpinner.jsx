import React from 'react';

const LoadingSpinner = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className="loading-spinner">
        <i className="fa fa-spinner fa-spin"></i>
      </div>
    );
  } else {
    return <div></div>;
  }
};

LoadingSpinner.propTypes = {
  isLoading: React.PropTypes.bool
};

export default LoadingSpinner;
