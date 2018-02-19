export function getArtistFilter(query, users) {
  const filteredUserIds = Object.values(users)
    .filter(user => {
      return user.username.toLowerCase()
        .indexOf(query.toLowerCase()) !== -1;
    }).map(user => user.id);

  return (activity) => {
    return filteredUserIds.indexOf(activity.user) !== -1;
  };
}
