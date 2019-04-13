/* eslint-disable no-confusing-arrow */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable camelcase */
import React, {
  Component
} from 'react';
import {
  Text,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  View,
  RefreshControl,
  TouchableWithoutFeedback,
  Picker,
  Alert,
  Linking,
  TouchableNativeFeedback
} from 'react-native';
import {
  connect
} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import i18n from 'i18next';

import {
  getAnnouncements,
  getMoreAnnouncements,
  getEvents,
  api,
  addBookmark,
  removeBookmark
} from '../../redux/actions/index';
import CardComponent from '../../components/CardComponent';
import {
  primaryColor,
  accentColor,
  styles
} from '../../constants/style';

class AnnouncementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jurusan: '',
      page: 1
    };
  }

  componentDidMount() {
    this.checkFirstTime();
    this.checkPermission();
    this.createNotificationListeners();
    setTimeout(() => {
      this.props.getAnnouncements(this.state.jurusan);
      this.props.getEvents();
    }, 10);
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async getToken() {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      const reqToken = await firebase.messaging().getToken();
      if (reqToken) {
        // eslint-disable-next-line no-undef
        fetch(`${api}/user/push-token`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: reqToken
          })
        })
        .then(() => {
          const announcementChannel = new firebase.notifications.Android.Channel('AnnouncementChannel', 'Announcement', firebase.notifications.Android.Importance.Max)
            .setDescription('Announcement Channel Notification');
          const eventChannel = new firebase.notifications.Android.Channel('EventChannel', 'Event', firebase.notifications.Android.Importance.Max)
            .setDescription('Event Channel Notification');
          firebase.notifications().android.createChannel(announcementChannel);
          firebase.notifications().android.createChannel(eventChannel);
          firebase.messaging().subscribeToTopic('Announcement');
          firebase.messaging().subscribeToTopic('Event');
        })
        .catch(err => {
          console.log(err);
        });
        await AsyncStorage.setItem('fcmToken', reqToken);
      }
    }
  }

  getItemLayout = (data, index) => ({
    length: 103.9,
    offset: 103.9 * index,
    index
  })

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      return this.getToken();
    }
    this.requestPermission();
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission denied :', error);
    }
  }

  async createNotificationListeners() {
    // listening for incoming notification
    this.notificationListener = firebase.notifications().onNotification(notification => {
      console.log(notification);
      let channel;
      const {
        channel_id
      } = notification.data;
      if (channel_id === 'AnnouncementChannel') {
        channel = 'AnnouncementChannel';
      } else if (channel_id === 'EventChannel') {
        channel = 'EventChannel';
      }
      const displayNotification = new firebase.notifications.Notification()
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .setData(notification.data)
        .android.setChannelId(channel)
        .android.setSmallIcon('ic_stat_ic_notification')
        .android.setColor('#204169');
      firebase.notifications().displayNotification(displayNotification);
    });

    // function get called when user open notification on foreground state
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened(notification => {
      console.log(notification);
      const {
        id,
        channel_id
      } = notification.notification.data;
      switch (channel_id) {
        case 'AnnouncementChannel':
          this.props.navigation.push('AnnouncementDetail', {
            id
          });
          break;
        case 'EventChannel':
          this.props.navigation.push('EventDetail', {
            id
          });
          break;
        default:
          break;
      }
      firebase.notifications().removeDeliveredNotification(notification.notification.notificationId);
    });

    // function get called when user open notification on background or dead state
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      console.log(notificationOpen);
      const {
        id,
        channel_id
      } = notificationOpen.notification.data;
      switch (channel_id) {
        case 'AnnouncementChannel':
          this.props.navigation.push('AnnouncementDetail', {
            id
          });
          break;
        case 'EventChannel':
          this.props.navigation.push('EventDetail', {
            id
          });
          break;
        default:
          break;
      }
      firebase.notifications().removeDeliveredNotification(notificationOpen.notification.notificationId);
    }
  }

  checkFirstTime = async () => {
    const firstTime = await AsyncStorage.getItem('firstTime');
    if (!firstTime) {
      return this.showAlert();
    }
    return null;
  }

  showAlert() {
    Alert.alert(
      'Contributions',
      'If you\'re interesting to contribute in this app, you can contact me',
      [{
          text: 'Ok',
          onPress: () => AsyncStorage.setItem('firstTime', 'yes')
        },
        {
          text: 'Contact Me',
          onPress: () => {
            const url = 'mailto:reynandapp1997@gmail.com';
            AsyncStorage.setItem('firstTime', 'yes');
            Linking.canOpenURL(url).then(supported => {
              if (!supported) {
                console.log(`Can't handle url: ${url}`);
              } else {
                return Linking.openURL(url);
              }
            }).catch(err => console.error('An error occurred', err));
          }
        }
      ], {
        cancelable: false
      }
    );
  }

  goToDetail = (id) => {
    this.props.navigation.navigate('AnnouncementDetail', {
      id
    });
  }
  
  renderItem = item => {
    const {
      id,
      title,
      jurusan,
      creator,
      createdAt,
      isBookmark
    } = item.item;
    return (
      <CardComponent onPress={() => this.goToDetail(id)} >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.announcementTitle}>{title}</Text>
          <Text>{jurusan}</Text>
          <Text>
            {creator.name},
            <Text style={{ fontStyle: 'italic' }}> {createdAt}</Text>
          </Text>
        </View>
        <View style={{ alignSelf: 'flex-end' }}>
          <TouchableNativeFeedback onPress={() => !isBookmark ? this.props.addBookmark(item.item, 'AnnBook', this.props.announcements) : this.props.removeBookmark(item.item, 'AnnBook', this.props.announcements)}>
            <Icon
              name={isBookmark ? 'bookmark' : 'bookmark-o'}
              color={primaryColor}
              size={
                24
              }
            />
          </TouchableNativeFeedback>
        </View>
      </View>
      </CardComponent>
    );
  }

  renderCondition() {
    if (this.props.loading) {
      return (
        <View style={styles.renderCondition}>
          <ActivityIndicator color={accentColor} size='large' />
        </View>
      );
    } else if (this.props.failed) {
      return (
        <View style={styles.renderCondition}>
          <Text>{this.props.message}</Text>
          <TouchableWithoutFeedback onPress={() => { this.props.getAnnouncements(''); }}>
            <Icon
              name='refresh'
              color={primaryColor}
              size={
                24
              }
              style={{ padding: 12 }}
            />
          </TouchableWithoutFeedback>
        </View>
      );
    }
    return (
      <FlatList
        key='AnnouncementList'
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        getItemLayout={this.getItemLayout}
        keyExtractor={item => item.id}
        data={this.props.announcements}
        renderItem={this.renderItem.bind(this)}
        refreshControl={
          <RefreshControl
            onRefresh={async () => {
              this.props.getAnnouncements(this.state.jurusan); 
              await this.setState({ page: 1 });
            }}
            colors={[accentColor]}
          />
        }
        ListHeaderComponent={() => (
          <View>
            <Picker
              selectedValue={this.state.jurusan}
              onValueChange={(itemValue) => {
                this.setState({ jurusan: itemValue, page: 1 });
                this.props.getAnnouncements(itemValue);
              }}
            >
              <Picker.Item label={i18n.t('allMajor')} value='' />
              <Picker.Item label={i18n.t('informatic')} value='if' />
              <Picker.Item label={i18n.t('electro')} value='el' />
              <Picker.Item label={i18n.t('engine')} value='me' />
              <Picker.Item label={i18n.t('management')} value='mb' />
            </Picker>
          </View>
        )}
        onEndReached={async () => {
          let page = this.state.page;
          page++;
          await this.setState({ page });
          this.props.getMoreAnnouncements(this.state.jurusan, this.state.page);
        }}
        onEndReachedThreshold={0.25}
        ListEmptyComponent={() => (
          <View style={styles.renderCondition}>
            <Text>{i18n.t('emptyAnn')}</Text>
          </View>
        )}
      />
    );
  }

  render() {
    return (
      this.renderCondition()
    );
  }
}

const mapStateToProp = state => ({
  announcements: state.announcements.announcements,
  failed: state.announcements.failed,
  loading: state.announcements.loading,
  message: state.announcements.message
});

export default connect(mapStateToProp, {
  getAnnouncements,
  getMoreAnnouncements,
  getEvents,
  addBookmark,
  removeBookmark
})(AnnouncementScreen);
