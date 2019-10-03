import { ADD_ROUTES } from '../index';
export default (routes => dispatch => dispatch({
  type: ADD_ROUTES,
  payload: {
    routes
  }
}));