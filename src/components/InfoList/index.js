import React from 'react';
import classNames from 'classnames';
import map from '../../services/map';

function InfoItem({ infoItem }) {
  const infoItemClass = classNames(
    'info-list-item',
    {
      'info-list-item-active': infoItem.activeSort
    }
  );

  return (
    <div className={infoItemClass}>
      <i className={infoItem.className} /> {infoItem.count}
    </div>
  );
}

function InfoList({ information }) {
  return (
    <div className="info-list">
      {map((infoItem, key) => {
        return <InfoItem key={key} infoItem={infoItem} />;
      }, information)}
    </div>
  );
}

InfoList.propTypes = {
  information: React.PropTypes.array
};

export default InfoList;
export { InfoItem };
