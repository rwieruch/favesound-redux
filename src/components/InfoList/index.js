import React from 'react';
import map from '../../services/map';

function InfoItem({ infoItem }) {
  return (
    <div className="info-list-item">
      <i className={infoItem.className} /> {infoItem.count}
    </div>
  );
}

function InfoList({ information }) {
  return (
    <div className="info-list">
      {map((infoItem, idx) => {
        return <InfoItem key={idx} infoItem={infoItem} />;
      }, information)}
    </div>
  );
}

InfoList.propTypes = {
  information: React.PropTypes.array
};

export {
  InfoList,

  InfoItem
};
