import PropTypes from 'prop-types';
import React from 'react';

function Permalink({ link, text, title, openInNewTab }) {
  const additionalAttributes = (openInNewTab) ? { target: '_blank', rel: 'noopener' } : {};

  return (
    <a href={link} title={title} {...additionalAttributes}>
      <span>{text}</span>
    </a>
  );
}

Permalink.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  openInNewTab: PropTypes.bool
};

export default Permalink;
