/* eslint-disable import/no-named-as-default-member */
import React, {
  Component
} from 'react';
import {
  View,
  TextInput,
  Text,
  Picker,
  ActivityIndicator,
  ScrollView,
  TouchableNativeFeedback,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import i18n from 'i18next';

import {
  primaryColor,
  accentColor,
  styles
} from '../../constants/style';
import {
  formChange,
  createAnnouncementAction,
  setError,
  clearAnnouncementCreate
} from '../../redux/actions';

class CreateAnnouncementScreen extends Component {
  componentWillUnmount() {
    this.props.clearAnnouncementCreate();
  }
  onChangeForm = (text, field) => {
    this.props.formChange(text, field);
  }

  onCreate = () => {
    const {
      title,
      description,
      jurusan
    } = this.props;
    const nav = this.props.navigation;
    this.props.createAnnouncementAction({
      title,
      description,
      jurusan,
      nav
    });
  }

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
            ref={input => { this.descriptionInput = input; }}
          />
        </View>
        <View>
          <Picker
            mode='dropdown'
            selectedValue={this.props.jurusan}
            onValueChange={(text) => { this.onChangeForm(text, 'jurusan'); }}
          >
            <Picker.Item label={i18n.t('allMajor')} value='' />
            <Picker.Item label={i18n.t('informatic')} value='if' />
            <Picker.Item label={i18n.t('electro')} value='el' />
            <Picker.Item label={i18n.t('engine')} value='me' />
            <Picker.Item label={i18n.t('management')} value='mb' />
          </Picker>
        </View>
        <TouchableNativeFeedback onPress={this.onCreate.bind(this)}>
          {this.renderLoading()}
        </TouchableNativeFeedback>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  title: state.form.title,
  description: state.form.description,
  jurusan: state.form.jurusan,
  failedCreate: state.form.failedCreate,
  loadingCreate: state.form.loadingCreate,
  messageCreate: state.form.messageCreate,
  titleMsg: state.form.titleMsg,
  descMsg: state.form.descMsg
});

export default connect(mapStateToProps, {
  formChange,
  createAnnouncementAction,
  setError,
  clearAnnouncementCreate
})(CreateAnnouncementScreen);
