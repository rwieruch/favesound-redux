import React from 'react';

export const Artwork = ({ image, title, optionalImage, size }) => {
  return <img src={image || optionalImage} alt={title} height={size} width={size}/>;
};
