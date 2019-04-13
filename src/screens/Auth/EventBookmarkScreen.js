/* eslint-disable import/no-named-as-default-member */
import React, { Component } from 'react';
import { View, Text, FlatList, AsyncStorage, RefreshControl, Image, TouchableNativeFeedback } from 'react-native';
import {
  connect
} from 'react-redux';
import i18n from 'i18next';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  addBookmark,
  removeBookmark
} from '../../redux/actions/index';
import { styles, accentColor, primaryColor } from '../../constants/style';
import CardComponent from '../../components/CardComponent';

class EventBookmarkScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmark: null
    };
  }

  componentDidMount() {
    this.getBookmark();
  }

  getBookmark = async () => {
    const bookmark = await AsyncStorage.getItem('EveBook');
    this.setState({
      bookmark: JSON.parse(bookmark).bookmark
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
      createdAt
    } = item.item;
    let { isBookmark } = item.item;
    isBookmark = true;
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
          <TouchableNativeFeedback
            onPress={() => {
              if (isBookmark) {
                this.props.removeBookmark(item.item, 'EveBook', this.props.events);
                return setTimeout(() => {
                  this.getBookmark();
                }, 500);
              }
              return this.props.addBookmark(item.item, 'EveBook', this.props.events);
            }}
          >
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

  render() {
    return (
      <View>
        <FlatList
          key='EventList'
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          getItemLayout={this.getItemLayout}
          keyExtractor={item => item.id}
          data={this.state.bookmark}
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
          onEndReachedThreshold={0.1}
          ListEmptyComponent={() => (
            <View style={styles.renderCondition}>
              <Text>{i18n.t('emptyEve')}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProp = state => ({
  events: state.events.events
});

export default connect(mapStateToProp, {
  addBookmark,
  removeBookmark
})(EventBookmarkScreen);
