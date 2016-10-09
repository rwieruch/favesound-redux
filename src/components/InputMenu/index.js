import React from 'react';

function InputMenu({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      className="input-menu"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

export default InputMenu;
