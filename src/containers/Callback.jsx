import React from 'react';
import SC from 'soundcloud';

export default React.createClass({
  componentDidMount:function(){
    window.setTimeout(opener.SC.connectCallback, 1);
  },
  render: function() {
    return (
      <div>
          <p>
            This page should close soon
          </p>
      </div>
    );
  }
});