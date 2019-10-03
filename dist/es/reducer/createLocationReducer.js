import { NOT_FOUND, ADD_ROUTES } from '../index';
import isServer from '../pure-utils/isServer';
import { nestHistory } from '../pure-utils/nestAction';
export default ((initialState, routesMap) => (state = initialState, action) => {
  routesMap = state.routesMap || routesMap;
  const route = routesMap[action.type];

  if (action.type === NOT_FOUND || route && !action.error && (typeof route === 'string' || route.path) && (action.meta.location.current.pathname !== state.pathname || action.meta.location.current.search !== state.search || action.meta.location.kind === 'load')) {
    const query = action.meta.location.current.query;
    const search = action.meta.location.current.search;
    return {
      pathname: action.meta.location.current.pathname,
      type: action.type,
      payload: { ...action.payload
      },
      ...(query && {
        query,
        search
      }),
      prev: action.meta.location.prev,
      kind: action.meta.location.kind,
      history: action.meta.location.history,
      hasSSR: state.hasSSR,
      routesMap
    };
  } else if (route && !action.error && (typeof route === 'string' || route.path) && action.meta.location.current.pathname === state.pathname && action.meta.location.current.search === state.search && action.meta.location.kind !== state.kind) {
    return { ...state,
      kind: action.meta.location.kind
    };
  } else if (action.type === ADD_ROUTES) {
    return { ...state,
      routesMap: { ...state.routesMap,
        ...action.payload.routes
      }
    };
  }

  return state;
});
export const getInitialState = (currentPathname, meta, type, payload, routesMap, history) => ({
  pathname: currentPathname.split('?')[0],
  type,
  payload,
  ...meta,
  prev: {
    pathname: '',
    type: '',
    payload: {}
  },
  kind: undefined,
  history: nestHistory(history),
  hasSSR: isServer() ? true : undefined,
  // client uses initial server `hasSSR` state setup here
  routesMap
});