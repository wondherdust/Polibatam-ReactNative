import React, {
  Component
} from 'react';
import {
  AsyncStorage,
  View
} from 'react-native';
import {
  connect
} from 'react-redux';

import {
  api,
  saveToken,
  showFab,
  getUserData
} from '../../redux/actions';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('Token');
    const userData = await AsyncStorage.getItem('UserData');
    const item = JSON.parse(userData);
    if (userToken && userData) {
      const {
        id,
        username,
        level
      } = item;
      if (level === 'Admin' || level === 'organisasi') {
        this.props.showFab();
      }
      this.props.getUserData(item);
      // eslint-disable-next-line no-undef
      fetch(`${api}/user/request-token`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id,
            username
          })
        })
        .then(response => {
          // eslint-disable-next-line no-underscore-dangle
          const message = response._bodyText;
          const msg = JSON.parse(message);
          saveToken(msg.token);
        })
        .catch(() => {
          console.log('request new token unsuccess');
        });
    }
    this.props.navigation.navigate(userToken ? 'Home' : 'Login');
  }

  render() {
    return (
      <View />
    );
  }
}

export default connect(null, {
  showFab,
  getUserData
})(AuthLoadingScreen);
