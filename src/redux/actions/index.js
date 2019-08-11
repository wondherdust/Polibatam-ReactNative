/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import {
  AsyncStorage
} from 'react-native';
import i18n from 'i18next';

import {
  ANNOUNCEMENT_NOT_FOUND,
  CLEAR_ANNOUNCEMENT,
  CLEAR_EVENT,
  CREATE_ANNOUNCEMENT_SUCCESS,
  CREATE_ANNOUNCEMENT_UNSUCCESS,
  DATE_CHANGE,
  DESCRIPTION_CHANGE,
  DESCRIPTION_ERROR,
  END_TIME_CHANGE,
  ERROR_FALSE,
  EVENT_NOT_FOUND,
  GET_ANNOUNCEMENT,
  GET_ANNOUNCEMENTS,
  GET_ANNOUNCEMENTS_FAILED,
  GET_ANNOUNCEMENT_FAILED,
  GET_EVENT,
  GET_EVENTS,
  GET_EVENTS_FAILED,
  GET_EVENT_FAILED,
  GET_MORE_ANNOUNCEMENTS,
  GET_MORE_EVENTS,
  GET_USER_DATA,
  JURUSAN_CHANGE,
  LOADING_ANNOUNCEMENT,
  LOADING_ANNOUNCEMENTS,
  LOADING_CREATE,
  LOADING_EVENT,
  LOADING_EVENTS,
  LOADING_LOGIN,
  LOCATION_CHANGE,
  LOGIN_SUCCESS,
  LOGIN_UNSUCCESS,
  PASSWORD_CHANGE,
  PASSWORD_ERROR,
  SHOW_FAB,
  START_TIME_CHANGE,
  TITLE_CHANGE,
  TITLE_ERROR,
  USERNAME_CHANGE,
  USERNAME_ERROR,
  LOCATION_ERROR,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_UNSUCCESS,
  POSTER_URL_CHANGE,
  ANNOUNCEMENT_BOOKMARK,
  EVENT_BOOKMARK
} from '../../constants/string';
import {
  localize
} from '../../../App';

const FETCH_TIMEOUT = 30000;
// export const api = 'http://192.168.43.98:3000/api';
export const api = 'https://polibatam.herokuapp.com/api';

export const formChange = (text, field) => dispatch => {
  switch (field) {
    case 'username':
      dispatch({
        type: USERNAME_CHANGE,
        payload: text
      });
      break;
    case 'password':
      dispatch({
        type: PASSWORD_CHANGE,
        payload: text
      });
      break;
    case 'title':
      dispatch({
        type: TITLE_CHANGE,
        payload: text
      });
      break;
    case 'description':
      dispatch({
        type: DESCRIPTION_CHANGE,
        payload: text
      });
      break;
    case 'jurusan':
      dispatch({
        type: JURUSAN_CHANGE,
        payload: text
      });
      break;
    case 'startTime':
      dispatch({
        type: START_TIME_CHANGE,
        payload: text
      });
      break;
    case 'endTime':
      dispatch({
        type: END_TIME_CHANGE,
        payload: text
      });
      break;
    case 'date':
      dispatch({
        type: DATE_CHANGE,
        payload: text
      });
      break;
    case 'location':
      dispatch({
        type: LOCATION_CHANGE,
        payload: text
      });
      break;
    case 'posterUrl':
      dispatch({
        type: POSTER_URL_CHANGE,
        payload: text
      });
      break;
    default:
      break;
  }
};

export const loginAction = ({
  username,
  password,
  nav
}) => dispatch => {
  if (username.length === 0) {
    dispatch({
      type: USERNAME_ERROR,
      payload: i18n.t('enterUsername')
    });
  }
  if (password.length === 0) {
    dispatch({
      type: PASSWORD_ERROR,
      payload: i18n.t('enterPassword')
    });
  }
  if (username && password) {
    dispatch({
      type: LOADING_LOGIN
    });
    const timeout = setTimeout(() => {
      loginUnsuccess(dispatch);
    }, FETCH_TIMEOUT);
    fetch(`${api}/user/login?lng=${localize.languageCode}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })
      .then(result => {
        clearTimeout(timeout);
        const response = result._bodyText;
        const res = JSON.parse(response);
        if (result.status === 201) {
          const token = result.headers.map.authorization.split(' ')[1];
          const {
            id,
            level,
            name
          } = res;
          loginSuccess(dispatch, token, nav, {
            id,
            username,
            level,
            name
          });
        } else if (result.status === 401) {
          dispatch({
            type: PASSWORD_ERROR,
            payload: res.message
          });
        } else if (result.status === 404) {
          dispatch({
            type: USERNAME_ERROR,
            payload: res.message
          });
        }
      })
      .catch(() => {
        clearTimeout(timeout);
        loginUnsuccess(dispatch);
      });
  }
};

const saveToken = async token => {
  await AsyncStorage.setItem('Token', token);
};

const saveUserData = async data => {
  await AsyncStorage.setItem('UserData', JSON.stringify(data));
};

const loginSuccess = (dispatch, token, nav, userData) => {
  setTimeout(() => {
    saveToken(token);
    saveUserData(userData);
    dispatch({
      type: LOGIN_SUCCESS
    });
    nav.navigate('Auth');
  }, 1000);
};


const loginUnsuccess = async dispatch => {
  dispatch({
    type: LOGIN_UNSUCCESS,
    payload: i18n.t('internetConnection')
  });
};

export const getAnnouncements = (jurusan) => async dispatch => {
  const AnnBookmark = await AsyncStorage.getItem('AnnBook');
  dispatch({
    type: LOADING_ANNOUNCEMENTS
  });
  const timeout = setTimeout(() => {
    dispatch({
      type: GET_ANNOUNCEMENTS_FAILED,
      payload: i18n.t('internetConnection')
    });
  }, FETCH_TIMEOUT);
  fetch(`${api}/announcement?jurusan=${jurusan}&page=1&lng=${localize.languageCode}`, {
      method: 'GET'
    })
    .then(result => {
      clearTimeout(timeout);
      const response = result._bodyText;
      const res = JSON.parse(response).map(mappedResult => {
        if (AnnBookmark) {
          let isBookmark;
          const e = JSON.parse(AnnBookmark).bookmark.find(el => el.id === mappedResult.id);
          if (e) {
            isBookmark = true;
          }
          return {
            ...mappedResult,
            isBookmark
          };
        }
        return {
          ...mappedResult
        };
      });
      dispatch({
        type: GET_ANNOUNCEMENTS,
        payload: res
      });
    })
    .catch(() => {
      clearTimeout(timeout);
      if (jurusan) {
        dispatch({
          type: GET_ANNOUNCEMENTS_FAILED,
          payload: i18n.t('internetConnection')
        });
      } else {
        dispatch({
          type: GET_ANNOUNCEMENTS_FAILED,
          payload: i18n.t('internetConnection')
        });
      }
    });
};

export const getMoreAnnouncements = (jurusan, page) => dispatch => {
  const timeout = setTimeout(() => {
    dispatch({
      type: GET_ANNOUNCEMENTS_FAILED,
      payload: i18n.t('internetConnection')
    });
  }, FETCH_TIMEOUT);
  fetch(`${api}/announcement?jurusan=${jurusan}&page=${page}&lng=${localize.languageCode}`, {
      method: 'GET'
    })
    .then(result => {
      clearTimeout(timeout);
      const response = result._bodyText;
      const res = JSON.parse(response);
      dispatch({
        type: GET_MORE_ANNOUNCEMENTS,
        payload: res
      });
    })
    .catch(() => {
      clearTimeout(timeout);
      if (jurusan) {
        dispatch({
          type: GET_ANNOUNCEMENTS_FAILED,
          payload: i18n.t('internetConnection')
        });
      } else {
        dispatch({
          type: GET_ANNOUNCEMENTS_FAILED,
          payload: i18n.t('internetConnection')
        });
      }
    });
};

export const getAnnouncement = id => dispatch => {
  dispatch({
    type: LOADING_ANNOUNCEMENT
  });
  const timeout = setTimeout(() => {
    dispatch({
      type: GET_ANNOUNCEMENT_FAILED,
      payload: i18n.t('internetConnection')
    });
  }, FETCH_TIMEOUT);
  fetch(`${api}/announcement/${id}?lng=${localize.languageCode}`, {
      method: 'GET'
    })
    .then(result => {
      clearTimeout(timeout);
      const response = result._bodyText;
      const res = JSON.parse(response);
      if (result.status === 404) {
        return dispatch({
          type: ANNOUNCEMENT_NOT_FOUND,
        });
      }
      dispatch({
        type: GET_ANNOUNCEMENT,
        payload: res
      });
    })
    .catch(() => {
      clearTimeout(timeout);
      dispatch({
        type: GET_ANNOUNCEMENT_FAILED,
        payload: i18n.t('internetConnection')
      });
    });
};

export const clearAnnouncement = () => ({
  type: CLEAR_ANNOUNCEMENT
});

export const getEvents = () => async dispatch => {
  const EveBookmark = await AsyncStorage.getItem('EveBook');
  dispatch({
    type: LOADING_EVENTS
  });
  const timeout = setTimeout(() => {
    dispatch({
      type: GET_EVENTS_FAILED,
      payload: i18n.t('internetConnection')
    });
  }, FETCH_TIMEOUT);
  fetch(`${api}/event?page=1&lng=${localize.languageCode}`, {
      method: 'GET'
    })
    .then(result => {
      clearTimeout(timeout);
      const response = result._bodyText;
      const res = JSON.parse(response).map(mappedResult => {
        if (EveBookmark) {
          let isBookmark;
          const e = JSON.parse(EveBookmark).bookmark.find(el => el.id === mappedResult.id);
          if (e) {
            isBookmark = true;
          }
          return {
            ...mappedResult,
            isBookmark
          };
        }
        return {
          ...mappedResult
        };
      });
      dispatch({
        type: GET_EVENTS,
        payload: res
      });
    })
    .catch(() => {
      clearTimeout(timeout);
      dispatch({
        type: GET_EVENTS_FAILED,
        payload: i18n.t('internetConnection')
      });
    });
};

export const getMoreEvents = page => dispatch => {
  const timeout = setTimeout(() => {
    dispatch({
      type: GET_EVENTS_FAILED,
      payload: i18n.t('internetConnection')
    });
  }, FETCH_TIMEOUT);
  fetch(`${api}/event?page=${page}&lng=${localize.languageCode}`, {
      method: 'GET'
    })
    .then(result => {
      clearTimeout(timeout);
      const response = result._bodyText;
      const res = JSON.parse(response);
      dispatch({
        type: GET_MORE_EVENTS,
        payload: res
      });
    })
    .catch(() => {
      clearTimeout(timeout);
      dispatch({
        type: GET_EVENTS_FAILED,
        payload: i18n.t('internetConnection')
      });
    });
};

export const getEvent = id => dispatch => {
  dispatch({
    type: LOADING_EVENT
  });
  const timeout = setTimeout(() => {
    dispatch({
      type: GET_EVENT_FAILED,
      payload: i18n.t('internetConnection')
    });
  }, FETCH_TIMEOUT);
  fetch(`${api}/event/${id}?lng=${localize.languageCode}`, {
      method: 'GET'
    })
    .then(result => {
      clearTimeout(timeout);
      const response = result._bodyText;
      const res = JSON.parse(response);
      if (result.status === 404) {
        return dispatch({
          type: EVENT_NOT_FOUND,
        });
      }
      dispatch({
        type: GET_EVENT,
        payload: res
      });
    })
    .catch(() => {
      clearTimeout(timeout);
      dispatch({
        type: GET_EVENT_FAILED,
        payload: i18n.t('internetConnection')
      });
    });
};

export const clearEvent = () => ({
  type: CLEAR_EVENT
});

export const setError = () => ({
  type: ERROR_FALSE
});

export const createAnnouncementAction = ({
  title,
  description,
  jurusan,
  nav
}) => async dispatch => {
  if (title.length === 0) {
    dispatch({
      type: TITLE_ERROR,
      payload: i18n.t('enterAnnTitle')
    });
  }
  if (description.length === 0) {
    dispatch({
      type: DESCRIPTION_ERROR,
      payload: i18n.t('enterDescription')
    });
  }
  if (title && description) {
    dispatch({
      type: LOADING_CREATE
    });
    const timeout = setTimeout(() => {
      createAnnouncementUnsuccess(dispatch);
    }, FETCH_TIMEOUT);
    const token = await AsyncStorage.getItem('Token');
    fetch(`${api}/announcement?lng=${localize.languageCode}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // eslint-disable-next-line quotes
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          jurusan
        })
      })
      .then(() => {
        clearTimeout(timeout);
        createAnnouncementSuccess(dispatch, nav);
      })
      .catch(() => {
        clearTimeout(timeout);
        createAnnouncementUnsuccess(dispatch);
      });
  }
};

export const createEventAction = ({
  title,
  description,
  startTime,
  endTime,
  date,
  location,
  posterUrl,
  nav
}) => async dispatch => {
  if (title.length === 0) {
    dispatch({
      type: TITLE_ERROR,
      payload: i18n.t('enterEveTitle')
    });
  }
  if (description.length === 0) {
    dispatch({
      type: DESCRIPTION_ERROR,
      payload: i18n.t('enterDescription')
    });
  }
  if (location.length === 0) {
    dispatch({
      type: LOCATION_ERROR,
      payload: i18n.t('enterLocation')
    });
  }
  if (title && description) {
    dispatch({
      type: LOADING_CREATE
    });
    const timeout = setTimeout(() => {
      createEventUnsuccess(dispatch);
    }, FETCH_TIMEOUT);
    const token = await AsyncStorage.getItem('Token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('startTime', startTime.toISOString());
    formData.append('endTime', endTime.toISOString());
    formData.append('date', date.toISOString());
    formData.append('location', location);
    formData.append('posterUrl', {
      uri: posterUrl.uri,
      type: posterUrl.type,
      name: posterUrl.fileName
    });
    fetch(`${api}/event?lng=${localize.languageCode}`, {
        method: 'POST',
        headers: {
          // eslint-disable-next-line quotes
          Authorization: `Bearer ${token}`
        },
        body: formData
      })
      .then(() => {
        clearTimeout(timeout);
        createEventSuccess(dispatch, nav);
      })
      .catch(() => {
        clearTimeout(timeout);
        createEventUnsuccess(dispatch);
      });
  }
};

const createAnnouncementSuccess = (dispatch, nav) => {
  setTimeout(() => {
    dispatch({
      type: CREATE_ANNOUNCEMENT_SUCCESS
    });
    nav.goBack();
  }, 1000);
};

const createEventSuccess = (dispatch, nav) => {
  setTimeout(() => {
    dispatch({
      type: CREATE_EVENT_SUCCESS
    });
    nav.goBack();
  }, 1000);
};

const createAnnouncementUnsuccess = async dispatch => {
  dispatch({
    type: CREATE_ANNOUNCEMENT_UNSUCCESS,
    payload: i18n.t('internetConnection')
  });
};

const createEventUnsuccess = async dispatch => {
  dispatch({
    type: CREATE_EVENT_UNSUCCESS,
    payload: i18n.t('internetConnection')
  });
};

export const clearAnnouncementCreate = () => ({
  type: CREATE_ANNOUNCEMENT_SUCCESS
});

export const clearEventCreate = () => ({
  type: CREATE_EVENT_SUCCESS
});

export const showFab = () => ({
  type: SHOW_FAB,
  payload: true
});

export const getUserData = data => ({
  type: GET_USER_DATA,
  payload: data
});

export const getAnnouncementBookmark = () => async dispatch => {
  await AsyncStorage.getItem('AnnBook', (err, res) => {
    if (res) {
      return dispatch({
        type: ANNOUNCEMENT_BOOKMARK,
        payload: JSON.parse(res)
      });
    }
  });
};

export const getEventBookmark = () => async dispatch => {
  await AsyncStorage.getItem('EveBook', (err, res) => {
    if (res) {
      return dispatch({
        type: EVENT_BOOKMARK,
        payload: JSON.parse(res)
      });
    }
  });
};

export const addBookmark = (item, bookmarkType, listData) => async dispatch => {
  let bookmark = await AsyncStorage.getItem(bookmarkType);
  if (bookmark) {
    bookmark = JSON.parse(bookmark);
    bookmark.bookmark.push(item);
    await AsyncStorage.setItem(bookmarkType, JSON.stringify(bookmark));
  } else {
    bookmark = {
      bookmark: [item]
    };
    await AsyncStorage.setItem(bookmarkType, JSON.stringify(bookmark));
  }
  const res = listData.map(mappedResult => {
    if (bookmark) {
      let isBookmark;
      const e = bookmark.bookmark.find(el => el.id === mappedResult.id);
      if (e) {
        isBookmark = true;
      }
      return {
        ...mappedResult,
        isBookmark
      };
    }
    return {
      ...mappedResult
    };
  });
  if (bookmarkType === 'AnnBook') {
    return dispatch({
      type: GET_ANNOUNCEMENTS,
      payload: res
    });
  }
  return dispatch({
    type: GET_EVENTS,
    payload: res
  });
};

export const removeBookmark = (item, bookmarkType, listData) => async dispatch => {
  const initBookmark = await AsyncStorage.getItem(bookmarkType);
  const newBookmark = JSON.parse(initBookmark).bookmark.filter(ele => ele.id !== item.id);
  const bookmark = {
    bookmark: newBookmark
  };
  await AsyncStorage.setItem(bookmarkType, JSON.stringify(bookmark));
  const res = listData.map(mappedResult => {
    if (bookmark) {
      let isBookmark;
      const e = bookmark.bookmark.find(el => el.id === mappedResult.id);
      if (e) {
        isBookmark = true;
      }
      return {
        ...mappedResult,
        isBookmark
      };
    }
    return {
      ...mappedResult
    };
  });
  if (bookmarkType === 'AnnBook') {
    return dispatch({
      type: GET_ANNOUNCEMENTS,
      payload: res
    });
  }
  return dispatch({
    type: GET_EVENTS,
    payload: res
  });
};
