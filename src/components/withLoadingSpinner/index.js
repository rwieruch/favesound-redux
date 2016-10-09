import React from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';

function withLoadingSpinner(Component) {
  return function composedComponent({ isLoading, ...props }) {
    if (!isLoading) {
      return <Component { ...props } />;
    }

    return <LoadingSpinner isLoading={isLoading} />;
  };
}

export default withLoadingSpinner;
