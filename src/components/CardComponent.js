import React, {
  Component
} from 'react';
import {
  View,
  TouchableNativeFeedback
} from 'react-native';

import {
  styles
} from '../constants/style';

class CardComponent extends Component {
  render() {
    return (
      <TouchableNativeFeedback style={this.props.style} onPress={this.props.onPress}>
        <View style={styles.card}>
          {this.props.children}
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default CardComponent;
