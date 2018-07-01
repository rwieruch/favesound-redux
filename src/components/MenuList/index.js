import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";

import MenuItem from "../MenuItem";
import map from "../../services/map";
import { GENRES } from "../../constants/genre";

function mapStateToProps(state) {
  return {
    selectedGenre: state.browse.selectedGenre
  };
}

@connect(mapStateToProps)
class MenuList extends Component {
  render() {
    const { selectedGenre } = this.props;

    if (!selectedGenre) {
      return null;
    }

    return (
      <div className="menu">
        {map((genre, key) => {
          const menuItemProps = { genre, selectedGenre, key };
          return <MenuItem {...menuItemProps} />;
        }, GENRES)}
      </div>
    );
  }
}

MenuList.propTypes = {
  selectedGenre: PropTypes.string
};

export default MenuList;
