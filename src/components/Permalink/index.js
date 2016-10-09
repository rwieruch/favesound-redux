import React from 'react';

function Permalink({ link, text }) {
  return (
    <a href={link}>
      {text}
    </a>
  );
}

Permalink.propTypes = {
  link: React.PropTypes.string,
  text: React.PropTypes.string
};

export default Permalink;
