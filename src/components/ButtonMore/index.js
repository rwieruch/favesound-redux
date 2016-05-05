import React from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ButtonGhost } from '../../components/ButtonGhost';

function ButtonMore({ onClick, requestInProcess, nextHref, isHidden }) {
  return (
    <div className="button-more">
      {
        requestInProcess || !nextHref || isHidden ?
        <noscript /> :
        <ButtonGhost onClick={onClick}>More</ButtonGhost>
      }
      <LoadingSpinner isLoading={requestInProcess} />
    </div>
  );
}

export {
  ButtonMore
};