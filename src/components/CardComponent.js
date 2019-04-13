import React, {
  Component
} from 'react';
import {
  View,
  TouchableWithoutFeedback
} from 'react-native';

import {
  styles
} from '../constants/style';

class CardComponent extends Component {
  render() {
    return (
      <TouchableWithoutFeedback style={this.props.style} onPress={this.props.onPress}>
        <View style={styles.card}>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default CardComponent;
