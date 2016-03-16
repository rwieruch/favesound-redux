import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { TrackItemContainer } from '../components/TrackItem';
import { UserItemContainer } from '../components/UserItem';

const renderChevron = (ids, isExpanded) => {
  if (ids.length > 4) {
    return <i className={"fa " + (isExpanded ? "fa-chevron-up" : "fa-chevron-down")}></i>;
  } else {
    return <div></div>;
  }
};

const renderNextButton = (nextHref, fetchMore, requestInProcess, isExpanded) => {
  if (!nextHref || !isExpanded) {
    return;
  }

  if (requestInProcess) {
    return <LoadingSpinner isLoading={requestInProcess} />;
  }

  return (
    <button
      className="ghost"
      onClick={fetchMore}
    >
      More
    </button>
  );
};

const renderTrack = (entities) => (trackId) => {
  return (
    <li>
      <TrackItemContainer activity={entities[trackId]} />
    </li>
  );
};

const renderUser = (entities) => (userId) => {
  return (
    <li>
      <UserItemContainer user={entities[userId]} />
    </li>
  );
};

const renderList = (ids, kind, requestInProcess, entities) => {
  if (!ids) {
    const isLoading = !ids || requestInProcess;
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (kind === 'USER') {
    return (<div className="item-list-content">
      <ul>{ids.map(renderUser(entities))}</ul>
    </div>);
  }

  if (kind === 'TRACK') {
    return (<div className="item-list-content">
      <ul>{ids.map(renderTrack(entities))}</ul>
    </div>);
  }
};

export const List = ({
  ids,
  isExpanded,
  title,
  kind,
  requestInProcess,
  entities,
  toggleMore,
  nextHref,
  fetchMore
}) => {
  return (
    <div className="item-list">
      <h2>
        <button className="inline" onClick={toggleMore}>
          {title}&nbsp;
          {renderChevron(ids, isExpanded)}
        </button>
      </h2>
      <div className={(isExpanded ? "more-visible" : "")}>{renderList(ids, kind, requestInProcess, entities)}</div>
      <div className="item-list-actions">
        {renderNextButton(nextHref, fetchMore, requestInProcess, isExpanded)}
      </div>
    </div>
  );
};
