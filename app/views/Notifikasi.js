import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  Dimensions,
  FlatList,
  TouchableOpacity
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

// create a component
class Notifikasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    return <View style={styles.container} />;
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#143360"
  }
});

//make this component available to the app
export default Notifikasi;
