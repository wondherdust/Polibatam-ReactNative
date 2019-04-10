import { ANNOUNCEMENT_BOOKMARK, EVENT_BOOKMARK } from '../../constants/string';

export default (state = {
  announcementbookmark: [],
  eventbookmark: []
}, action) => {
  switch (action.type) {
    case ANNOUNCEMENT_BOOKMARK:
      return {
        ...state,
        announcementbookmark: action.payload
      };
    case EVENT_BOOKMARK:
      return {
        ...state,
        eventbookmark: action.payload
      };
    default:
      return state;
  }
};
