import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  Image,
  Alert
} from "react-native";
import Button from "../components/Button";
import ImagePicker from "react-native-image-picker";

// create a component
class Foto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: "",
      cameraPermission: ""
    };
  }

  takePhotoPress = () => {
    const options = {
      title: "Select Photo",
      storageOptions: {
        skipBackup: true,
        path: "Agent",
        cameraRoll: true,
        waitUntilSaved: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: "data:image/jpeg;base64," + response.data };
        console.log(source);
        this.setState({
          avatarSource: source
        });
      }
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.takePhotoPress()}>Take Photo</Button>
        {/* <Image
          source={{
            uri: "data:image/jpeg;base64," + this.state.avatarSource.data
          }}
          style={{ width: 100, height: 100 }}
        /> */}
        <Image
          source={{ uri: this.state.avatarSource.uri }}
          style={{ width: 250, height: 250 }}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#06397B"
  }
});

//make this component available to the app
export default Foto;
