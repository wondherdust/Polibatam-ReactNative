import React, {
  Component
} from 'react';
import {
  Text,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  RefreshControl
} from 'react-native';
import {
  connect
} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  getAnnouncement,
  clearAnnouncement
} from '../../redux/actions/index';
import {
  primaryColor,
  accentColor,
  styles
} from '../../constants/style';

class AnnouncementDetailScreen extends Component {
  componentWillMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getAnnouncement(id);
  }

  componentWillUnmount() {
    this.props.clearAnnouncement();
  }

  renderCondition() {
    if (this.props.loadingDetail) {
      return (
        <View style={styles.renderCondition}>
          <ActivityIndicator color={accentColor} size='large' />
        </View>
      );
    } else if (this.props.failedDetail) {
      return (
        <View style={styles.renderCondition}>
          <Text>{this.props.messageDetail}</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              const id = this.props.navigation.getParam('id');
              this.props.getAnnouncement(id);
            }}
          >
            <Icon
              name="refresh"
              color={primaryColor}
              size={
                24
              }
              style={{ padding: 12 }}
            />
          </TouchableWithoutFeedback>
        </View>
      );
    } else if (this.props.notFound) {
      return (
        <View style={styles.renderCondition}>
          <Text>Announcement not found</Text>
        </View>
      );
    }
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              const id = this.props.navigation.getParam('id');
              this.props.getAnnouncement(id);
            }}
            colors={[accentColor]}
          />
        }
      >
        <View style={styles.container}>
          <Text
            style={styles.title}
          >
            {this.props.announcement.title}
          </Text>
          <Text>{this.props.creator.name}, <Text style={{ fontStyle: 'italic' }}>{this.props.announcement.createdAt}</Text></Text>
          <Text
            style={styles.description}
          >
            {this.props.announcement.description}
          </Text>
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      this.renderCondition()
    );
  }
}

const mapStateToProp = state => ({
  announcement: state.announcementDetail.announcement,
  creator: state.announcementDetail.creator,
  failedDetail: state.announcementDetail.failedDetail,
  loadingDetail: state.announcementDetail.loadingDetail,
  messageDetail: state.announcementDetail.messageDetail,
  notFound: state.announcementDetail.notFound
});

export default connect(mapStateToProp, {
  getAnnouncement,
  clearAnnouncement
})(AnnouncementDetailScreen);
