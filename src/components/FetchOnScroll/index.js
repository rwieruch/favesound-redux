import React from 'react';

export default function (InnerComponent) {
  class FetchOnScrollComponent extends React.Component {
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
      return <InnerComponent {...this.props} />;
    }
  }

  FetchOnScrollComponent.propTypes = {
    scrollFunction: React.PropTypes.func.isRequired,
  };

  return FetchOnScrollComponent;
}
