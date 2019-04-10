import {
  SHOW_FAB,
  GET_USER_DATA
} from '../../constants/string';

export default (state = {
  fab: false,
  userData: {}
}, action) => {
  switch (action.type) {
    case SHOW_FAB:
      return {
        ...state,
        fab: action.payload
      };
    case GET_USER_DATA:
      return {
        ...state,
        userData: action.payload
      };
    default:
      return state;
  }
};
