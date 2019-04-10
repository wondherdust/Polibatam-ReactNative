import React, {
  Component
} from 'react';
import {
  Text,
  Image,
  ScrollView,
  View,
  RefreshControl,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import {
  connect
} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  getEvent,
  clearEvent
} from '../../redux/actions/index';
import {
  primaryColor,
  accentColor,
  styles
} from '../../constants/style';

class EventDetailScreen extends Component {
  componentWillMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getEvent(id);
  }

  componentWillUnmount() {
    this.props.clearEvent();
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
              this.props.getEvent(id);
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
          <Text>Event not found</Text>
        </View>
      );
    }
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              const id = this.props.navigation.getParam('id');
              this.props.getEvent(id);
            }}
            colors={[accentColor]}
          />
        }
      >
        <View style={styles.container}>
          <Image resizeMode='center' source={{ uri: this.props.event.posterUrl, width: '100%', height: 500 }} />
          <Text style={styles.title}>{this.props.event.title}</Text>
          <Text>
              {this.props.creator.name},
              <Text style={{ fontStyle: 'italic', marginTop: 16 }} > {this.props.event.createdAt}</Text>
          </Text>
          <Text style={styles.description}>{this.props.event.description}</Text>
          <Text style={styles.description}><Icon size={16} name='clock-o' /> {this.props.event.startTime} - {this.props.event.endTime}</Text>
          <Text style={styles.description}><Icon size={16} name='calendar-o' /> {this.props.event.date}</Text>
          <Text style={styles.description}><Icon size={16} name='map-marker' /> {this.props.event.location}</Text>
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
  event: state.eventDetail.event,
  creator: state.eventDetail.creator,
  failedDetail: state.eventDetail.failedDetail,
  loadingDetail: state.eventDetail.loadingDetail,
  messageDetail: state.eventDetail.messageDetail,
  notFound: state.eventDetail.notFound
});

export default connect(mapStateToProp, {
  getEvent,
  clearEvent
})(EventDetailScreen);
