// FORM REDUCER
export const USERNAME_CHANGE = 'username_change';
export const PASSWORD_CHANGE = 'password_change';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_UNSUCCESS = 'login_unsuccess';
export const USERNAME_ERROR = 'username_error';
export const PASSWORD_ERROR = 'password_error';
export const ERROR_FALSE = 'error_false';
export const LOADING_LOGIN = 'loading_login';
export const TITLE_CHANGE = 'title_change';
export const DESCRIPTION_CHANGE = 'description_change';
export const JURUSAN_CHANGE = 'jurusan_change';
export const START_TIME_CHANGE = 'start_time_change';
export const END_TIME_CHANGE = 'end_time_change';
export const DATE_CHANGE = 'date_change';
export const LOCATION_CHANGE = 'location_change';
export const TITLE_ERROR = 'title_error';
export const DESCRIPTION_ERROR = 'description_error';
export const LOADING_CREATE = 'loading_create';
export const CREATE_ANNOUNCEMENT_SUCCESS = 'create_announcement_success';
export const CREATE_ANNOUNCEMENT_UNSUCCESS = 'create_announcement_unsuccess';
export const CREATE_EVENT_SUCCESS = 'create_event_success';
export const CREATE_EVENT_UNSUCCESS = 'create_event_unsuccess';
export const LOCATION_ERROR = 'location_error';
export const POSTER_URL_CHANGE = 'poster_url_change';

// ANNOUNCEMENTS REDUCER
export const GET_ANNOUNCEMENTS = 'get_announcements';
export const GET_MORE_ANNOUNCEMENTS = 'get_more_announcements';
export const GET_ANNOUNCEMENTS_FAILED = 'get_announcements_failed';
export const LOADING_ANNOUNCEMENTS = 'loading_announcements';

// ANNOUNCEMENT DETAIL REDUCER
export const GET_ANNOUNCEMENT = 'get_announcement';
export const GET_ANNOUNCEMENT_FAILED = 'get_announcement_failed';
export const CLEAR_ANNOUNCEMENT = 'clear_announcement';
export const LOADING_ANNOUNCEMENT = 'loading_announcement';
export const ANNOUNCEMENT_NOT_FOUND = 'announcement_not_found';

// EVENTS REDUCER
export const GET_EVENTS = 'get_events';
export const GET_MORE_EVENTS = 'get_more_events';
export const GET_EVENTS_FAILED = 'get_events_failed';
export const LOADING_EVENTS = 'loading_events';

// EVENT DETAIL REDUCER
export const GET_EVENT = 'get_event';
export const GET_EVENT_FAILED = 'get_event_failed';
export const CLEAR_EVENT = 'clear_event';
export const LOADING_EVENT = 'loading_eve';
export const EVENT_NOT_FOUND = 'event_not_found';

// PROFILE REDUCER
export const SHOW_FAB = 'show_fab';
export const GET_USER_DATA = 'get_user_data';

// BOOKMARK REDUCER
export const ANNOUNCEMENT_BOOKMARK = 'AnnouncementBookmark';
export const EVENT_BOOKMARK = 'EventBookmark';