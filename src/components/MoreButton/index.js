import React from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

function MoreButton({ onClick, requestInProcess, nextHref }) {
  return (
    <div>
      {
        requestInProcess || !nextHref ?
        <noscript /> :
        <button className="ghost" onClick={() => onClick()}>
          More
        </button>
      }
      <LoadingSpinner isLoading={requestInProcess} />
    </div>
  );
}

export {
  MoreButton
};