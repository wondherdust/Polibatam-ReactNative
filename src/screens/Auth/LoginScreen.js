/* eslint-disable import/no-named-as-default-member */
import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableNativeFeedback
} from 'react-native';
import i18n from 'i18next';

import {
  primaryColor,
  accentColor,
  styles
} from '../../constants/style';
import {
  formChange,
  loginAction,
  setError
} from '../../redux/actions/index';

class LoginScreen extends Component {
  onChangeForm = (text, field) => {
    this.props.formChange(text, field);
  }

  onLogin = () => {
    const {
      username,
      password
    } = this.props;
    const nav = this.props.navigation;
    this.props.loginAction({
      username,
      password,
      nav
    });
  }

  renderUsernameErrorMessage() {
    if (this.props.usernameMsg) {
      return (
        <Text style={styles.errorMsg}>
          {` - ${this.props.usernameMsg}`}
        </Text>
      );
    }
  }

  renderPasswordErrorMessage() {
    if (this.props.passwordMsg) {
      return (
        <Text style={styles.errorMsg}>
          {` - ${this.props.passwordMsg}`}
        </Text>
      );
    }
  }

  renderConnectionState() {
    if (this.props.failed) {
      Alert.alert(
        '',
        this.props.message,
        [{
          text: 'Ok',
          onPress: () => this.props.setError()
        }], {
          onDismiss: () => this.props.setError()
        }
      );
    }
  }

  renderLoading() {
    if (this.props.loadingLogin) {
      return (
        <View style={styles.containerBtn}>
          <ActivityIndicator size={18.9} color={accentColor} />
        </View>
      );
    }
    return (
      <View style={styles.containerBtn}>
        <Text style={styles.textBtn}>{i18n.t('login')}</Text>
      </View>
    );
  }
  
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderConnectionState()}
        <View>
          <Text style={{ color: primaryColor }}>
            {i18n.t('username')}
            {this.renderUsernameErrorMessage()}
          </Text>
          <TextInput 
            value={this.props.username}
            onChangeText={(text) => { this.onChangeForm(text, 'username'); }}
            onSubmitEditing={() => { this.passwordInput.focus(); }}
            blurOnSubmit={false}
            returnKeyType={'next'}
            autoCapitalize='none'
            style={styles.loginForm}
          />
        </View>
        <View>
          <Text style={{ color: primaryColor }}>
            {i18n.t('password')}
            {this.renderPasswordErrorMessage()}
          </Text>
          <TextInput 
            value={this.props.password}
            onChangeText={(text) => { this.onChangeForm(text, 'password'); }}
            onSubmitEditing={() => { this.onLogin(); }}
            secureTextEntry
            ref={input => { this.passwordInput = input; }}
            style={styles.loginForm}
          />
        </View>
        <TouchableNativeFeedback onPress={this.onLogin.bind(this)}>
          {this.renderLoading()}
        </TouchableNativeFeedback>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  username: state.form.username,
  password: state.form.password,
  failed: state.form.failed,
  loadingLogin: state.form.loadingLogin,
  message: state.form.message,
  usernameMsg: state.form.usernameMsg,
  passwordMsg: state.form.passwordMsg
});

export default connect(mapStateToProps, {
  formChange,
  loginAction,
  setError
})(LoginScreen);
