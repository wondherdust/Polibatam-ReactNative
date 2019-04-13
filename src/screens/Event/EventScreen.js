/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-confusing-arrow */
import React, {
  Component
} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  RefreshControl,
  TouchableWithoutFeedback,
  TouchableNativeFeedback
} from 'react-native';
import {
  connect
} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from 'i18next';

import {
  getEvents,
  getMoreEvents,
  addBookmark,
  removeBookmark
} from '../../redux/actions/index';
import CardComponent from '../../components/CardComponent';
import {
  primaryColor,
  accentColor,
  styles
} from '../../constants/style';

class EventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  getItemLayout = (data, index) => ({
    length: 345.2,
    offset: 345.2 * index,
    index
  })

  goToDetail = (id) => {
    this.props.navigation.navigate('EventDetail', {
      id
    });
  }

  renderItem = item => {
    const {
      id,
      posterUrl,
      title,
      startTime,
      endTime,
      date,
      creator,
      createdAt,
      isBookmark
    } = item.item;
    return (
      <CardComponent onPress={() => this.goToDetail(id)}>
        <Image source={{ uri: posterUrl, width: '100%', height: 200 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text
              style={{
                fontSize: 24,
                color: '#df7825',
                marginVertical: 8,
                textAlignVertical: 'center'
              }}
            >{title}</Text>
            <Text><Icon name='clock-o' /> {startTime} - {endTime}</Text>
            <Text><Icon name='calendar-o' /> {date}</Text>
            <Text>
                {creator.name},
                <Text style={{ fontStyle: 'italic' }} > {createdAt}</Text>
            </Text>
          </View>
          <View style={{ alignSelf: 'flex-end' }}>
          <TouchableNativeFeedback onPress={() => !isBookmark ? this.props.addBookmark(item.item, 'EveBook', this.props.events) : this.props.removeBookmark(item.item, 'EveBook', this.props.events)}>
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
          <TouchableWithoutFeedback onPress={() => { this.props.getEvents(this.props.bookmark); }}>
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
    }
    return (
      <FlatList
        key='EventList'
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        getItemLayout={this.getItemLayout}
        keyExtractor={item => item.id}
        data={this.props.events}
        renderItem={this.renderItem.bind(this)}
        refreshControl={
          <RefreshControl
            onRefresh={async () => {
              this.props.getEvents(this.props.bookmark); 
              await this.setState({ page: 1 });
            }}
            colors={[accentColor]}
          />
        }
        onEndReached={async () => {
          let page = this.state.page;
          page++;
          await this.setState({ page });
          this.props.getMoreEvents(this.state.page);
        }}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={() => (
          <View style={styles.renderCondition}>
            <Text>{i18n.t('emptyEve')}</Text>
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
  events: state.events.events,
  failed: state.events.failed,
  loading: state.events.loading,
  message: state.events.message,
  bookmark: state.bookmark
});

export default connect(mapStateToProp, {
  getEvents,
  getMoreEvents,
  addBookmark,
  removeBookmark
})(EventScreen);
