import React from 'react';
import map from '../../services/map';
import classNames from 'classnames';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { TrackPreviewContainer } from '../../components/Track';
import { UserPreviewContainer } from '../../components/User';
import { ButtonMore } from '../../components/ButtonMore';
import { ButtonInline } from '../../components/ButtonInline';

function Chevron({ ids, isExpanded }) {
  const chevronClass = classNames(
    'fa',
    {
      'fa-chevron-up': isExpanded,
      'fa-chevron-down': !isExpanded
    }
  );

  return ids.length > 4 ? <i className={chevronClass} /> : null;
}

function SpecificItemTrack({ entities, trackId }) {
  return (
    <li>
      <TrackPreviewContainer activity={entities[trackId]} />
    </li>
  );
}

function SpecificItemUser({ entities, userId }) {
  return (
    <li>
      <UserPreviewContainer user={entities[userId]} />
    </li>
  );
}

function SpecificList({ ids, kind, requestInProcess, entities }) {
  if (kind === 'USER') {
    return (
      <div className="list-content">
        <ul>
          {map((id, idx) => {
            const userProps = { userId: id, entities };
            return <SpecificItemUser key={idx} { ...userProps } />;
          }, ids)}
        </ul>
      </div>
    );
  }

  if (kind === 'TRACK') {
    return (
      <div className="list-content">
        <ul>
          {map((id, idx) => {
            const trackProps = { trackId: id, entities };
            return <SpecificItemTrack key={idx} { ...trackProps } />;
          }, ids)}
        </ul>
      </div>
    );
  }
}

function List({
  ids,
  isExpanded,
  title,
  kind,
  requestInProcess,
  entities,
  onToggleMore,
  nextHref,
  onFetchMore
}) {
  const listClass = classNames({
    'more-visible': isExpanded
  });

  return (
    <div className="list">
      <h2>
        <ButtonInline onClick={onToggleMore}>
          {title} <Chevron ids={ids} isExpanded={isExpanded} />
        </ButtonInline>
      </h2>
      <div className={listClass}>
        <SpecificList
          ids={ids}
          kind={kind}
          requestInProcess={requestInProcess}
          entities={entities}
        />
        <ButtonMore
          nextHref={nextHref}
          onClick={onFetchMore}
          requestInProcess={requestInProcess || !ids}
          isHidden={!isExpanded}
        />
      </div>
    </div>
  );
}

List.propTypes = {
  ids: React.PropTypes.array,
  isExpanded: React.PropTypes.bool,
  title: React.PropTypes.string,
  kind: React.PropTypes.string,
  requestInProcess: React.PropTypes.bool,
  entities: React.PropTypes.object,
  nextHref: React.PropTypes.string,
  onToggleMore: React.PropTypes.func,
  onFetchMore: React.PropTypes.func
};

export {
  List,

  SpecificList,
  Chevron,
};
