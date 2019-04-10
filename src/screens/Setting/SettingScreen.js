/* eslint-disable import/no-named-as-default-member */
import React, {
  Component
} from 'react';
import {
  View,
  Button,
  AsyncStorage
} from 'react-native';
import i18n from 'i18next';

import {
  styles
} from '../../constants/style';

class SettingScreen extends Component {
  checkToken = async () => {
    const token = await AsyncStorage.getItem('Token');
    if (!token) {
      return this.props.navigation.navigate('Auth');
    }
    return null;
  }

  logOut = async () => {
    await AsyncStorage.clear();
    this.checkToken();
  }

  render() {
    return (
    <View style={styles.container}>
      <Button
        title={i18n.t('logout')}
        onPress={async () => { this.logOut(); }}
      />
    </View>
    );
  }
}

export default SettingScreen;
