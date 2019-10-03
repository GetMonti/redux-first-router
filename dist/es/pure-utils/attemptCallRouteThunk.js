import { updateScroll } from '../connectRoutes';
export default ((dispatch, getState, route, selectLocationState, bag) => {
  if (typeof window !== 'undefined') {
    const thunk = route.thunk;

    if (typeof thunk === 'function') {
      const {
        kind,
        hasSSR
      } = selectLocationState(getState()); // call thunks always if it's not initial load of the app or only if it's load
      // without SSR setup yet, so app state is setup on client when prototyping,
      // such as with with webpack-dev-server before server infrastructure is built.
      // NEW: if there is no path, it's assumed to be a pathless route, which is always called.

      if (kind !== 'load' || kind === 'load' && !hasSSR || !route.path) {
        const prom = thunk(dispatch, getState, bag);

        if (prom && typeof prom.next === 'function') {
          prom.next(updateScroll);
        }
      }
    }
  }
});