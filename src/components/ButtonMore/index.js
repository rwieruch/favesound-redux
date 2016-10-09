import React from 'react';
import withLoadingSpinner from '../../components/withLoadingSpinner';
import ButtonGhost from '../../components/ButtonGhost';

function ButtonMore({ onClick, nextHref, isHidden }) {
  return (
    <div className="button-more">
      {
        !nextHref || isHidden ?
        null :
        <ButtonGhost onClick={onClick}>More</ButtonGhost>
      }
    </div>
  );
}

export default withLoadingSpinner(ButtonMore);
