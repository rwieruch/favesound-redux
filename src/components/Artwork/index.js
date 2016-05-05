import React from 'react';

function Artwork({ image, title, optionalImage, size }) {
  return <img src={image || optionalImage} alt={title} height={size} width={size} />;
}

Artwork.propTypes = {
  image: React.PropTypes.string,
  title: React.PropTypes.string,
  optionalImage: React.PropTypes.string,
  size: React.PropTypes.number
};

export {
  Artwork
};
