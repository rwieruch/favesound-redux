import React from 'react';
import map from '../../services/map';

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
      {map((info, idx) => {
        return <Info key={idx} info={info} />;
      }, information)}
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
