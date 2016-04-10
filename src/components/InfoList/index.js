import React from 'react';
import map from 'lodash/map';

function Info({ info }) {
  return (
    <div className="info-list-item">
      <i
        className={info.className}
      > {info.count}
      </i>
    </div>
  );
}

function InfoList({ information }) {
  return (
    <div className="info-list">
      {map(information, (info, idx) => {
        return <Info key={idx} info={info} />;
      })}
    </div>
  );
}

InfoList.propTypes = {
  information: React.PropTypes.array
};

export {
  InfoList,

  Info
};
