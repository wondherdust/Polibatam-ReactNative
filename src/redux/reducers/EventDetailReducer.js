import {
  GET_EVENT,
  GET_EVENT_FAILED,
  CLEAR_EVENT,
  LOADING_EVENT,
  EVENT_NOT_FOUND
} from '../../constants/string';

export default (state = {
  event: {},
  creator: {},
  failedDetail: false,
  loadingDetail: false,
  messageDetail: '',
  notFound: false,
}, action) => {
  switch (action.type) {
    case GET_EVENT:
      return {
        ...state,
        event: action.payload,
        creator: action.payload.creator,
        loadingDetail: false
      };
    case GET_EVENT_FAILED:
      return {
        ...state,
        failedDetail: true,
        loadingDetail: false,
        messageDetail: action.payload
      };
    case CLEAR_EVENT:
      return {
        ...state,
        event: {},
        creator: {},
        failedDetail: false,
        loadingDetail: false,
        messageDetail: '',
        notFound: false
      };
    case LOADING_EVENT:
      return {
        ...state,
        loadingDetail: true,
        failedDetail: false,
      };
    case EVENT_NOT_FOUND:
      return {
        ...state,
        notFound: true,
        loadingDetail: false
      };
    default:
      return state;
  }
};
