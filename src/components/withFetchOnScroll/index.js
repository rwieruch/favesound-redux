import PropTypes from 'prop-types';
import React from 'react';

function withFetchOnScroll(Component) {
  class FetchOnScroll extends React.Component {
    constructor(props) {
      super(props);
      this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)) {
        this.props.scrollFunction();
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  FetchOnScroll.propTypes = {
    scrollFunction: PropTypes.func.isRequired,
  };

  return FetchOnScroll;
}

export default withFetchOnScroll;
