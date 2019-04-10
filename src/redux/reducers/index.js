import {
  combineReducers
} from 'redux';
import FormReducer from './FormReducer';
import AnnouncementsReducer from './AnnouncementsReducer';
import AnnouncementDetailReducer from './AnnouncementDetailReducer';
import EventsReducer from './EventsReducer';
import EventDetailReducer from './EventDetailReducer';
import ProfileReducer from './ProfileReducer';
import BookmarkReducer from './BookmarkReducer';

export default combineReducers({
  form: FormReducer,
  announcements: AnnouncementsReducer,
  announcementDetail: AnnouncementDetailReducer,
  events: EventsReducer,
  eventDetail: EventDetailReducer,
  profile: ProfileReducer,
  bookmark: BookmarkReducer
});
