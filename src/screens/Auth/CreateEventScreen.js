/* eslint-disable import/no-named-as-default-member */
import React, {
  Component
} from 'react';
import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableNativeFeedback,
  Alert,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import i18n from 'i18next';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import {
  primaryColor,
  accentColor,
  styles
} from '../../constants/style';
import {
  formChange,
  createEventAction,
  setError,
  clearEventCreate
} from '../../redux/actions';

class CreateEventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: false,
      endTime: false,
      date: false
    };
  }
  
  componentWillUnmount() {
    this.props.clearEventCreate();
  }

  onChangeForm = (text, field) => {
    this.props.formChange(text, field);
  }

  onCreate = () => {
    const {
      title,
      description,
      startTime,
      endTime,
      date,
      location
    } = this.props;
    const nav = this.props.navigation;
    this.props.createEventAction({
      title,
      description,
      startTime,
      endTime,
      date,
      location,
      posterUrl: this.props.posterUrl,
      nav
    });
  }

  choosePicture = () => {
    ImagePicker.launchImageLibrary({
      title: 'Choose Poster',
      storageOptions: {
        skipBackup: true,
        path: 'Polibatam'
      },
      mediaType: 'photo',
      noData: true
    }, response => {
      if (response.didCancel) {
        return console.log('cancel');
      } else if (response.error) {
        return console.log('error', response.error);
      } else if (response.customButton) {
        return console.log('custom button', response.customButton);
      }
      this.onChangeForm(response, 'posterUrl');
    });
  }

  showStartTime = () => this.setState({ startTime: true });

  hideStartTime = () => this.setState({ startTime: false });

  showEndTime = () => this.setState({ endTime: true });

  hideEndTime = () => this.setState({ endTime: false });

  showDate = () => this.setState({ date: true });

  hideDate = () => this.setState({ date: false });

  handleStartTime = (date) => {
    this.onChangeForm(date, 'startTime');
    this.hideStartTime();
  };

  handleEndTime = (date) => {
    this.onChangeForm(date, 'endTime');
    this.hideEndTime();
  };

  handleDate = (date) => {
    this.onChangeForm(date, 'date');
    this.hideDate();
  };

  renderTitleErrorMessage() {
    if (this.props.titleMsg) {
      return (
        <Text style={styles.errorMsg}>
          {` - ${this.props.titleMsg}`}
        </Text>
      );
    }
  }

  renderDescriptionErrorMessage() {
    if (this.props.descMsg) {
      return (
        <Text style={styles.errorMsg}>
          {` - ${this.props.descMsg}`}
        </Text>
      );
    }
  }

  renderLocationErrorMessage() {
    if (this.props.locMsg) {
      return (
        <Text style={styles.errorMsg}>
          {` - ${this.props.locMsg}`}
        </Text>
      );
    }
  }

  renderConnectionState() {
    if (this.props.failedCreate) {
      Alert.alert(
        '',
        this.props.messageCreate,
        [{
          text: 'Ok',
          onPress: () => this.props.setError()
        }]
      );
    }
  }

  renderLoading() {
    if (this.props.loadingCreate) {
      return (
        <View style={styles.containerBtn}>
          <ActivityIndicator size={18.9} color={accentColor} />
        </View>
      );
    }
    return (
      <View style={styles.containerBtn}>
        <Text style={styles.textBtn}>{i18n.t('create')}</Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderConnectionState()}
        <DateTimePicker
          isVisible={this.state.startTime}
          onConfirm={this.handleStartTime}
          onCancel={this.hideStartTime}
          mode='time'
          date={this.props.startTime}
        />
        <DateTimePicker
          isVisible={this.state.endTime}
          onConfirm={this.handleEndTime}
          onCancel={this.hideEndTime}
          mode='time'
          date={this.props.endTime}
        />
        <DateTimePicker
          isVisible={this.state.date}
          onConfirm={this.handleDate}
          onCancel={this.hideDate}
          mode='date'
          date={this.props.date}
          
        />
        <TouchableNativeFeedback onPress={this.choosePicture}>
          <View style={{ alignItems: 'center', justifyContent: 'center', height: 500 }}>
            {this.props.posterUrl.uri ?
              <Image resizeMode='center' source={{ uri: this.props.posterUrl.uri, width: '100%', height: 500 }} />
            : 
              <IconMi
                name='image'
                size={20}
                color={primaryColor}
              />
            }

          </View>
        </TouchableNativeFeedback>
        <View>
          <Text style={{ color: primaryColor }}>
            {i18n.t('title')}
            {this.renderTitleErrorMessage()}
          </Text>
          <TextInput 
            value={this.props.title}
            onChangeText={(text) => { this.onChangeForm(text, 'title'); }}
            onSubmitEditing={() => { this.descriptionInput.focus(); }}
            blurOnSubmit={false}
            returnKeyType={'next'}
            autoCapitalize='none'
            style={styles.loginForm}
          />
        </View>
        <View>
          <Text style={{ color: primaryColor }}>
            {i18n.t('description')}
            {this.renderDescriptionErrorMessage()}
          </Text>
          <TextInput 
            value={this.props.description}
            onChangeText={(text) => { this.onChangeForm(text, 'description'); }}
            blurOnSubmit={false}
            returnKeyType={'next'}
            autoCapitalize='none'
            style={styles.loginForm}
            multiline
            numberOfLines={3}
            ref={input => { this.descriptionInput = input; }}
          />
        </View>
        <View>
          <Text style={{ color: primaryColor }}>
            {i18n.t('startTime')}
          </Text>
          <TouchableNativeFeedback onPress={this.showStartTime}>
            <Text
              style={styles.eventForm}
            >{moment(this.props.startTime).format('LT')}</Text>
          </TouchableNativeFeedback>
        </View>
        <View>
          <Text style={{ color: primaryColor }}>
            {i18n.t('endTime')}
          </Text>
          <TouchableNativeFeedback onPress={this.showEndTime}>
            <Text
              style={styles.eventForm}
            >{moment(this.props.endTime).format('LT')}</Text>
          </TouchableNativeFeedback>
        </View>
        <View>
          <Text style={{ color: primaryColor }}>
            {i18n.t('date')}
          </Text>
          <TouchableNativeFeedback onPress={this.showDate}>
            <Text
              style={styles.eventForm}
            >{moment(this.props.date).format('LL')}</Text>
          </TouchableNativeFeedback>
        </View>
        <View>
          <Text style={{ color: primaryColor }}>
            {i18n.t('location')}
            {this.renderLocationErrorMessage()}
          </Text>
          <TextInput 
            value={this.props.location}
            onChangeText={(text) => { this.onChangeForm(text, 'location'); }}
            blurOnSubmit={false}
            returnKeyType={'next'}
            autoCapitalize='none'
            style={styles.loginForm}
          />
        </View>
        <TouchableNativeFeedback onPress={this.onCreate.bind(this)}>
          {this.renderLoading()}
        </TouchableNativeFeedback>
        <View style={{ height: 16 }} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  title: state.form.title,
  description: state.form.description,
  startTime: state.form.startTime,
  endTime: state.form.endTime,
  date: state.form.date,
  location: state.form.location,
  posterUrl: state.form.posterUrl,
  failedCreate: state.form.failedCreate,
  loadingCreate: state.form.loadingCreate,
  messageCreate: state.form.messageCreate,
  titleMsg: state.form.titleMsg,
  descMsg: state.form.descMsg,
  locMsg: state.form.locMsg
});

export default connect(mapStateToProps, {
  formChange,
  createEventAction,
  setError,
  clearEventCreate
})(CreateEventScreen);
