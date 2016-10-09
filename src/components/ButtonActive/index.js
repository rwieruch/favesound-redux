import React from 'react';
import classNames from 'classnames';
import ButtonInline from '../../components/ButtonInline';

function ButtonActive({ onClick, isActive, children }) {
  const buttonActiveClass = classNames(
    'button-active',
    {
      'button-active-selected': isActive
    }
  );

  return (
    <div className={buttonActiveClass}>
      <ButtonInline onClick={onClick}>
        {children}
      </ButtonInline>
    </div>
  );
}

export default ButtonActive;
