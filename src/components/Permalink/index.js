import PropTypes from 'prop-types';
import React from 'react';

function Permalink({ link, text, title }) {
  return (
    <a href={link} title={title}>
      <span>{text}</span>
    </a>
  );
}

Permalink.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string
};

export default Permalink;
