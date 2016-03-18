import React from 'react';

export const Permalink = ({ link, text }) => {
  return (
    <a href={link}>
      {text}
    </a>
  );
};
