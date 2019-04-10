/* eslint-disable import/no-named-as-default-member */
import React, {
  Component
} from 'react';
import {
  Text,
  View,
  Image,
  TouchableNativeFeedback
} from 'react-native';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
import {
  connect
} from 'react-redux';
import i18n from 'i18next';

import {
  styles,
  primaryColor
} from '../../constants/style';

class ProfileScreen extends Component {

  renderFab() {
    if (this.props.fab) {
      if (this.props.userData.level === 'admin') {
        return (
          <ActionButton buttonColor={primaryColor}>
            <ActionButton.Item size={48} buttonColor='#9b59b6' title={i18n.t('announcement')} onPress={() => this.props.navigation.navigate('CreateAnnouncement')}>
              <IconMi color='white' size={20} name="info" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item size={48} buttonColor='#3498db' title={i18n.t('event')} onPress={() => this.props.navigation.navigate('CreateEvent')}>
              <IconFa color='white' size={16} name="calendar" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        );
      } else if (this.props.userData.level === 'organisasi') {
        return (
          <ActionButton buttonColor={primaryColor}>
            <ActionButton.Item size={48} buttonColor='#3498db' title={i18n.t('event')} onPress={() => this.props.navigation.navigate('CreateEvent')}>
              <IconFa color='white' size={16} name="calendar" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        );
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.profileContainer}>
          <Image
            style={{
              borderRadius: 37.5,
              width: 75,
              height: 75
            }}
            // eslint-disable-next-line global-require
            source={require('../../assets/images/profile.png')}
          />
          <View style={styles.profileInfo}>
            <View>
              <Text style={styles.profileName}>{this.props.userData.name}</Text>
            </View>
            <View>
              <IconFa
                style={{ marginTop: 16 }}
                name='gear'
                size={24}
                color='white'
                onPress={() => { this.props.navigation.navigate('Setting'); }}
              />
            </View>
          </View>
        </View>
        <View style={{ margin: 16 }}>
          <TouchableNativeFeedback onPress={() => console.log('go to bookmark screen')}>
            <View style={{ flexDirection: 'row' }}>
              <IconFa
                style={{ marginTop: 16 }}
                name='bookmark-o'
                size={20}
                color={primaryColor}
                onPress={() => { this.props.navigation.navigate('Setting'); }}
              />
              <Text style={{ margin: 16, fontSize: 16 }}>Announcements Bookmark</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => console.log('go to bookmark screen')}>
            <View style={{ flexDirection: 'row' }}>
              <IconFa
                style={{ marginTop: 16 }}
                name='bookmark-o'
                size={20}
                color={primaryColor}
                onPress={() => { this.props.navigation.navigate('Setting'); }}
              />
              <Text style={{ margin: 16, fontSize: 16 }}>Events Bookmark</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        {this.renderFab()}
      </View>
    );
  }
}

const mapStateToProp = state => ({
  fab: state.profile.fab,
  userData: state.profile.userData
});

export default connect(mapStateToProp, {})(ProfileScreen);
