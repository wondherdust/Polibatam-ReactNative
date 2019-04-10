import {
  GET_EVENTS,
  GET_MORE_EVENTS,
  GET_EVENTS_FAILED,
  LOADING_EVENTS
} from '../../constants/string';

export default (state = {
  events: [],
  failed: false,
  loading: true,
  message: '',
}, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
        loading: false
      };
    case GET_MORE_EVENTS:
      return {
        ...state,
        events: state.events.concat(action.payload),
      };
    case GET_EVENTS_FAILED:
      return {
        ...state,
        failed: true,
        loading: false,
        message: action.payload
      };
    case LOADING_EVENTS:
      return {
        ...state,
        loading: true,
        failed: false,
        message: '',
      };
    default:
      return state;
  }
};
