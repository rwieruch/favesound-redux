import React from 'react';
import FilterDuration from '../../components/FilterDuration';
import FilterName from '../../components/FilterName';
import Sort from '../../components/Sort';
import DateSort from '../../components/DateSort';

function StreamInteractions() {
  return (
    <div className="stream-interactions">
      <div className="stream-interactions-item">
        <FilterDuration />
      </div>
      <div className="stream-interactions-item">
        <Sort />
      </div>
      <div className="stream-interactions-item">
        <DateSort />
      </div>
      <div className="stream-interactions-item">
        <FilterName />
      </div>
    </div>
  );
}

export default StreamInteractions;
