export default ((routesMap, selectLocationState, bag) => ({
  dispatch,
  getState
}) => {
  const {
    type
  } = selectLocationState(getState());
  const route = routesMap[type];

  if (route && typeof route.thunk === 'function') {
    return Promise.resolve(route.thunk(dispatch, getState, bag));
  }

  return Promise.resolve();
});