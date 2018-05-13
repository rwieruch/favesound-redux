import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { browse } from "../../constants/pathnames";
import { DEFAULT_GENRE } from "../../constants/genre";

const MenuItem = ({ genre, selectedGenre }) => {
  const linkClass = classNames("menu-item", {
    "menu-item-selected": genre === selectedGenre
  });

  return (
    <Link to={getGenreLink(genre)} className={linkClass}>
      {genre}
    </Link>
  );
};

function getGenreLink(genre) {
  return `${browse}/${genre || DEFAULT_GENRE}`;
}

MenuItem.propTypes = {
  genre: PropTypes.string.isRequired,
  selectedGenre: PropTypes.string.isRequired
};

export default MenuItem;
