/** @format */

import {
  AppRegistry
} from 'react-native';

import App from './App';
import {
  name as appName
} from './app.json';
import bgNotifications from './src/services/bgNotifications';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgNotifications);
