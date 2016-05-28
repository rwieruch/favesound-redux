import React from 'react';
import { FilterDurationContainer } from '../../components/FilterDuration';
import { SortContainer } from '../../components/Sort';
import { FilterNameContainer } from '../../components/FilterName';

function StreamInteractions() {
  return (
    <div className="stream-interactions">
      <div className="stream-interactions-item">
        <FilterDurationContainer />
      </div>
      <div className="stream-interactions-item">
        <SortContainer />
      </div>
      <div className="stream-interactions-item">
        <FilterNameContainer />
      </div>
    </div>
  );
}

export {
  StreamInteractions,
};
