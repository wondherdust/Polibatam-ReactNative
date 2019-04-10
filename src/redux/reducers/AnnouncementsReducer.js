import {
  GET_ANNOUNCEMENTS,
  GET_ANNOUNCEMENTS_FAILED,
  GET_MORE_ANNOUNCEMENTS,
  LOADING_ANNOUNCEMENTS
} from '../../constants/string';

export default (state = {
  announcements: [],
  failed: false,
  loading: true,
  message: '',
}, action) => {
  switch (action.type) {
    case GET_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: action.payload,
        loading: false
      };
    case GET_MORE_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: state.announcements.concat(action.payload),
      };
    case GET_ANNOUNCEMENTS_FAILED:
      return {
        ...state,
        failed: true,
        loading: false,
        message: action.payload
      };
    case LOADING_ANNOUNCEMENTS:
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
