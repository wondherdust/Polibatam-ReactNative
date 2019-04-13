/* eslint-disable import/no-named-as-default-member */
import React, {
  Component
} from 'react';
import {
  View,
  Text,
  FlatList,
  AsyncStorage,
  RefreshControl,
  TouchableNativeFeedback
} from 'react-native';
import i18n from 'i18next';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  connect
} from 'react-redux';

import { accentColor, styles, primaryColor } from '../../constants/style';
import CardComponent from '../../components/CardComponent';
import {
  addBookmark,
  removeBookmark
} from '../../redux/actions/index';

class AnnouncementBookmarkScreen extends Component {
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
    const bookmark = await AsyncStorage.getItem('AnnBook');
    this.setState({
      bookmark: JSON.parse(bookmark).bookmark
    });
  }

  getItemLayout = (data, index) => ({
    length: 103.9,
    offset: 103.9 * index,
    index
  })

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
      createdAt
    } = item.item;
    let { isBookmark } = item.item;
    isBookmark = true;
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
          <TouchableNativeFeedback
            onPress={() => {
              if (isBookmark) {
                this.props.removeBookmark(item.item, 'AnnBook', this.props.announcements);
                return setTimeout(() => {
                  this.getBookmark();
                }, 500);
              }
              return this.props.addBookmark(item.item, 'AnnBook', this.props.announcements);
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
          key='AnnouncementList'
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          getItemLayout={this.getItemLayout}
          keyExtractor={item => item.id}
          data={this.state.bookmark}
          renderItem={this.renderItem.bind(this)}
          refreshControl={
            <RefreshControl
              onRefresh={async () => {
                this.getBookmark();
              }}
              colors={[accentColor]}
            />
          }
          ListEmptyComponent={() => (
            <View style={styles.renderCondition}>
              <Text>{i18n.t('emptyAnn')}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProp = state => ({
  announcements: state.announcements.announcements
});

export default connect(mapStateToProp, {
  addBookmark,
  removeBookmark
})(AnnouncementBookmarkScreen);
