import {
  CREATE_ANNOUNCEMENT_SUCCESS,
  CREATE_ANNOUNCEMENT_UNSUCCESS,
  DESCRIPTION_CHANGE,
  DESCRIPTION_ERROR,
  ERROR_FALSE,
  JURUSAN_CHANGE,
  LOADING_CREATE,
  LOADING_LOGIN,
  LOCATION_CHANGE,
  LOGIN_SUCCESS,
  LOGIN_UNSUCCESS,
  PASSWORD_CHANGE,
  PASSWORD_ERROR,
  TITLE_CHANGE,
  TITLE_ERROR,
  USERNAME_CHANGE,
  USERNAME_ERROR,
  START_TIME_CHANGE,
  END_TIME_CHANGE,
  DATE_CHANGE,
  LOCATION_ERROR,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_UNSUCCESS,
  POSTER_URL_CHANGE
} from '../../constants/string';

export default (state = {
  username: '',
  password: '',
  failed: false,
  loadingLogin: false,
  message: '',
  usernameMsg: '',
  passwordMsg: '',
  title: '',
  description: '',
  jurusan: '',
  startTime: new Date(),
  endTime: new Date(),
  date: new Date(),
  location: '',
  posterUrl: {},
  failedCreate: false,
  loadingCreate: false,
  messageCreate: '',
  titleMsg: '',
  descMsg: '',
  locMsg: '',
}, action) => {
  switch (action.type) {
    case USERNAME_CHANGE:
      return {
        ...state,
        username: action.payload,
        usernameMsg: ''
      };
    case PASSWORD_CHANGE:
      return {
        ...state,
        password: action.payload,
        passwordMsg: ''
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        username: '',
        password: '',
        failed: false,
        loadingLogin: false,
        message: '',
        usernameMsg: '',
        passwordMsg: ''
      };
    case LOGIN_UNSUCCESS:
      return {
        ...state,
        failed: true,
        loadingLogin: false,
        message: action.payload
      };
    case USERNAME_ERROR:
      return {
        ...state,
        usernameMsg: action.payload,
        loadingLogin: false,
      };
    case PASSWORD_ERROR:
      return {
        ...state,
        passwordMsg: action.payload,
        loadingLogin: false,
      };
    case ERROR_FALSE:
      return {
        ...state,
        failed: false,
        failedCreate: false
      };
    case LOADING_LOGIN:
      return {
        ...state,
        loadingLogin: true,
      };
    case TITLE_CHANGE:
      return {
        ...state,
        title: action.payload,
        titleMsg: ''
      };
    case DESCRIPTION_CHANGE:
      return {
        ...state,
        description: action.payload,
        descMsg: ''
      };
    case JURUSAN_CHANGE:
      return {
        ...state,
        jurusan: action.payload
      };
    case START_TIME_CHANGE:
      return {
        ...state,
        startTime: action.payload
      };
    case END_TIME_CHANGE:
      return {
        ...state,
        endTime: action.payload
      };
    case DATE_CHANGE:
      return {
        ...state,
        date: action.payload
      };
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.payload,
        locMsg: ''
      };
    case POSTER_URL_CHANGE:
      return {
        ...state,
        posterUrl: action.payload
      };
    case TITLE_ERROR:
      return {
        ...state,
        titleMsg: action.payload,
        loadingCreate: false,
      };
    case DESCRIPTION_ERROR:
      return {
        ...state,
        descMsg: action.payload,
        loadingCreate: false,
      };
    case LOCATION_ERROR:
      return {
        ...state,
        locMsg: action.payload,
        loadingCreate: false,
      };
    case LOADING_CREATE:
      return {
        ...state,
        loadingCreate: true,
      };
    case CREATE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        title: '',
        description: '',
        jurusan: '',
        failedCreate: false,
        loadingCreate: false,
        messageCreate: '',
        titleMsg: '',
        descMsg: ''
      };
    case CREATE_ANNOUNCEMENT_UNSUCCESS:
      return {
        ...state,
        failedCreate: true,
        loadingCreate: false,
        messageCreate: action.payload
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        title: '',
        description: '',
        startTime: new Date(),
        endTime: new Date(),
        date: new Date(),
        location: '',
        posterUrl: {},
        failedCreate: false,
        loadingCreate: false,
        messageCreate: '',
        titleMsg: '',
        descMsg: '',
        locMsg: ''
      };
    case CREATE_EVENT_UNSUCCESS:
      return {
        ...state,
        failedCreate: true,
        loadingCreate: false,
        messageCreate: action.payload
      };
    default:
      return state;
  }
};
