import PropTypes from 'prop-types';
import React from 'react';

function Artwork({ image, title, optionalImage, size }) {
  return <img src={image || optionalImage} alt={title} height={size} width={size} />;
}

Artwork.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  optionalImage: PropTypes.string,
  size: PropTypes.number
};

export default Artwork;
