/* eslint-disable import/no-named-as-default-member */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  createStore,
  applyMiddleware
} from 'redux';
import {
  Provider
} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import i18n from 'i18next';
import {
  initReactI18next
} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import reducers from './src/redux/reducers';
import AnnouncementScreen from './src/screens/Announcement/AnnouncementScreen';
import AnnouncementDetailScreen from './src/screens/Announcement/AnnouncementDetailScreen';
import AuthLoadingScreen from './src/screens/Auth/AuthLoadingScreen';
import ProfileScreen from './src/screens/Auth/ProfileScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import EventScreen from './src/screens/Event/EventScreen';
import EventDetailScreen from './src/screens/Event/EventDetailScreen';
import SettingScreen from './src/screens/Setting/SettingScreen';
import {
  primaryColor,
  accentColor,
  styles
} from './src/constants/style';
import CreateAnnouncementScreen from './src/screens/Auth/CreateAnnouncementScreen';
import CreateEventScreen from './src/screens/Auth/CreateEventScreen';
import AnnouncementBookmarkScreen from './src/screens/Auth/AnnouncementBookmarkScreen';
import EventBookmarkScreen from './src/screens/Auth/EventBookmarkScreen';

export const localize = RNLocalize.getLocales()[0];

i18n.use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          announcement: 'Announcement',
          login: 'Login',
          event: 'Event',
          setting: 'Setting',
          profileLabel: 'Profile',
          createAnnouncement: 'Create Announcement',
          createEvent: 'Create Event',
          allMajor: 'All Major',
          informatic: 'Informatic',
          electro: 'Electro',
          engine: 'Engine',
          management: 'Management Business',
          logout: 'Logout',
          title: 'Title',
          description: 'Description',
          create: 'Create',
          startTime: 'Start Time',
          endTime: 'End Time',
          date: 'Date',
          location: 'Location',
          internetConnection: 'Please check your internet connection',
          enterUsername: 'Enter your username',
          enterPassword: 'Enter your password',
          enterAnnTitle: 'Enter announcement title',
          enterEveTitle: 'Enter event title',
          enterDescription: 'Enter the description',
          enterLocation: 'Enter the location',
          username: 'Username',
          password: 'Password',
          emptyAnn: 'No Announcement yet',
          emptyEve: 'No Event yet',
          announcementsBookmark: 'Announcements Bookmark',
          eventsBookmark: 'Events Bookmark'
        }
      },
      id: {
        translation: {
          announcement: 'Pengumuman',
          login: 'Login',
          event: 'Acara',
          setting: 'Pengaturan',
          profileLabel: 'Profi',
          createAnnouncement: 'Buat Pengumuman',
          createEvent: 'Buat Acara',
          allMajor: 'Semua Jurusan',
          informatic: 'Teknik Informatika',
          electro: 'Teknik Elektronika',
          engine: 'Teknik Mesin',
          management: 'Manajemen Bisnis',
          logout: 'Keluar',
          title: 'Judul',
          description: 'Deskripsi',
          create: 'Buat',
          startTime: 'Waktu Mulai',
          endTime: 'Waktu Berakhir',
          date: 'Tanggal',
          location: 'Lokasi',
          internetConnection: 'Periksan jaringan anda',
          enterUsername: 'Masukan username anda',
          enterPassword: 'Masukan password anda',
          enterAnnTitle: 'Masukan judul pengumuman',
          enterEveTitle: 'Masukan judul acara',
          enterDescription: 'Masukan deskripsi',
          enterLocation: 'Masukan tempat acara',
          username: 'Nama Pengguna',
          password: 'Kata Sandi',
          emptyAnn: 'Belum ada pengumuman',
          emptyEve: 'Belum ada acara',
          announcementsBookmark: 'Announcements Bookmark',
          eventsBookmark: 'Events Bookmark'
        }
      }
    },
    lng: localize.languageCode,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      headerTitle: i18n.t('login')
    })
  }
}, {
  initialRouteName: 'Login',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerTintColor: primaryColor,
    headerTitleStyle: styles.headerStyle
  }
});

const AnnouncementStack = createStackNavigator({
  Announcement: {
    screen: AnnouncementScreen,
    navigationOptions: () => ({
      headerTitle: i18n.t('announcement')
    })
  },
  AnnouncementDetail: {
    screen: AnnouncementDetailScreen,
    navigationOptions: () => ({
      headerTitle: i18n.t('announcement')
    })
  }
}, {
  initialRouteName: 'Announcement',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerTintColor: primaryColor,
    headerTitleStyle: styles.headerStyle
  }
});

const EventStack = createStackNavigator({
  Event: {
    screen: EventScreen,
    navigationOptions: () => ({
      headerTitle: i18n.t('event')
    })
  },
  EventDetail: {
    screen: EventDetailScreen,
    navigationOptions: () => ({
      headerTitle: i18n.t('event')
    })
  }
}, {
  initialRouteName: 'Event',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerTintColor: primaryColor,
    headerTitleStyle: styles.headerStyle
  }
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  Setting: {
    screen: SettingScreen,
    navigationOptions: () => ({
      headerTitle: i18n.t('setting')
    })
  },
  CreateAnnouncement: {
    screen: CreateAnnouncementScreen,
    navigationOptions: () => ({
      headerTitle: i18n.t('createAnnouncement')
    })
  },
  CreateEvent: {
    screen: CreateEventScreen,
    navigationOptions: () => ({
      headerTitle: i18n.t('createEvent')
    })
  },
  AnnouncementBookmark: {
    screen: AnnouncementBookmarkScreen,
    navigationOptions: () => ({
      headerTitle: i18n.t('announcementsBookmark')
    })
  },
  EventBookmark: {
    screen: EventBookmarkScreen,
    navigationOptions: () => ({
      headerTitle: i18n.t('eventsBookmark')
    })
  }
}, {
  initialRouteName: 'Profile',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerTintColor: primaryColor,
    headerTitleStyle: styles.headerStyle
  }
});

const MaterialTopTabNavigator = createMaterialTopTabNavigator({
  AnnouncementTab: {
    screen: AnnouncementStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor, focused }) => (
        <IconMi
        name={focused ? 'info' : 'info-outline'}
          size={20}
          color={tintColor}
        />
      ),
      tabBarLabel: i18n.t('announcement')
    })
  },
  EventTab: {
    screen: EventStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor, focused }) => (
        <IconFa
        name={focused ? 'calendar' : 'calendar-o'}
          size={16}
          color={tintColor}
        />
      ),
      tabBarLabel: i18n.t('event')
    })
  },
  ProfileTab: {
    screen: ProfileStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor, focused }) => (
        <IconFa
          name={focused ? 'user' : 'user-o'}
          size={16}
          color={tintColor}
        />
      ),
      tabBarLabel: i18n.t('profileLabel')
    })
  }
}, {
  initialRouteName: 'AnnouncementTab',
  tabBarOptions: {
    activeTintColor: accentColor,
    inactiveTintColor: primaryColor,
    allowFontScaling: true,
    labelStyle: {
      fontSize: 12
    },
    indicatorStyle: {
      height: 0
    },
    style: {
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#ddd'
    },
    showIcon: true,
    tabStyle: {
      height: 56
    },
    upperCaseLabel: false,
    pressColor: accentColor
  },
  tabBarPosition: 'bottom',
  animationEnabled: false
});

const SwitchNavigator = createSwitchNavigator({
  Auth: AuthLoadingScreen,
  Home: MaterialTopTabNavigator,
  Login: LoginStack
}, {
  initialRouteName: 'Auth'
});

const AppContainer = createAppContainer(SwitchNavigator);

type Props = {};
export default class App extends Component < Props > {
  async componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <AppContainer />
      </Provider>
    );
  }
}
