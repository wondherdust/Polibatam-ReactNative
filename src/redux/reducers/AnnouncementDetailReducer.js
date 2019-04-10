import {
  GET_ANNOUNCEMENT,
  GET_ANNOUNCEMENT_FAILED,
  CLEAR_ANNOUNCEMENT,
  LOADING_ANNOUNCEMENT,
  ANNOUNCEMENT_NOT_FOUND
} from '../../constants/string';

export default (state = {
  announcement: {},
  creator: {},
  failedDetail: false,
  loadingDetail: false,
  messageDetail: '',
  notFound: false,
}, action) => {
  switch (action.type) {
    case GET_ANNOUNCEMENT:
      return {
        ...state,
        announcement: action.payload,
        creator: action.payload.creator,
        loadingDetail: false
      };
    case GET_ANNOUNCEMENT_FAILED:
      return {
        ...state,
        failedDetail: true,
        loadingDetail: false,
        messageDetail: action.payload
      };
    case CLEAR_ANNOUNCEMENT:
      return {
        ...state,
        announcement: {},
        creator: {},
        failedDetail: false,
        loadingDetail: false,
        messageDetail: '',
        notFound: false
      };
    case LOADING_ANNOUNCEMENT:
      return {
        ...state,
        loadingDetail: true,
        failedDetail: false,
      };
    case ANNOUNCEMENT_NOT_FOUND:
      return {
        ...state,
        notFound: true,
        loadingDetail: false
      };
    default:
      return state;
  }
};
