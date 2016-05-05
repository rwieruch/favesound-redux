import React from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

function MoreButton({ onClick, requestInProcess, nextHref, isHidden }) {
  return (
    <div className="more-button">
      {
        requestInProcess || !nextHref || isHidden ?
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