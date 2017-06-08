import PropTypes from 'prop-types';
import React from 'react';
import map from '../../services/map';
import classNames from 'classnames';
import { TrackPreviewContainer } from '../../components/Track';
import { UserPreviewContainer } from '../../components/User';
import ButtonMore from '../../components/ButtonMore';
import ButtonInline from '../../components/ButtonInline';

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

function SpecificList({ ids, kind, entities }) {
  if (kind === 'USER') {
    return (
      <div className="list-content">
        <ul>
          {map((id, key) => {
            const userProps = { userId: id, entities };
            return <SpecificItemUser key={key} { ...userProps } />;
          }, ids)}
        </ul>
      </div>
    );
  }

  if (kind === 'TRACK') {
    return (
      <div className="list-content">
        <ul>
          {map((id, key) => {
            const trackProps = { trackId: id, entities };
            return <SpecificItemTrack key={key} { ...trackProps } />;
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
          entities={entities}
        />
        <ButtonMore
          nextHref={nextHref}
          onClick={onFetchMore}
          isLoading={requestInProcess || !ids}
          isHidden={!isExpanded}
        />
      </div>
    </div>
  );
}

List.propTypes = {
  ids: PropTypes.array,
  isExpanded: PropTypes.bool,
  title: PropTypes.string,
  kind: PropTypes.string,
  requestInProcess: PropTypes.bool,
  entities: PropTypes.object,
  nextHref: PropTypes.string,
  onToggleMore: PropTypes.func,
  onFetchMore: PropTypes.func
};

export default List;
export {
  SpecificList,
  Chevron,
};
