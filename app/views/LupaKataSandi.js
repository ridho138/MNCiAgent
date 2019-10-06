import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Alert
} from "react-native";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { validateEmail } from "../utils/Utils";
import { ForgotPasswordService } from "../services/ForgotPasswordService";

// create a component
class LupaKataSandi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Data: null,
      email: "",
      loading: false
    };
  }

  onSendPress = async () => {
    const { email } = this.state;
    if (validateEmail(email)) {
      this.setState({
        loading: true
      });
      const lupaKataSandi = await ForgotPasswordService(email);

      if (lupaKataSandi.status === "SUCCESS") {
        Alert.alert("Info", lupaKataSandi.message, [
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("Login")
          }
        ]);
      } else {
        Alert.alert("Info", lupaKataSandi.message);
      }
      this.setState({
        loading: false
      });
    } else {
      Alert.alert("Info", "Format Email salah.");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <View style={styles.formContainer}>
          <View style={{ padding: 5, flexDirection: "row", marginBottom: 15 }}>
            <Text style={styles.Text}>
              Masukkan alamat email Anda, kata sandi baru akan dikirim melalui
              email.
            </Text>
          </View>

          <View style={{ padding: 5, flexDirection: "row" }}>
            <Text style={styles.Text}>Alamat Email</Text>
          </View>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={text => this.setState({ email: text })}
            keyboardType="email-address"
          />

          <Button onPress={() => this.onSendPress()}>KIRIM</Button>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#143260"
  },
  formContainer: {
    flex: 2,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  input: {
    width: Dimensions.get("window").width - 50,
    backgroundColor: "#fff",
    marginBottom: 35,
    borderRadius: 5
  },
  Text: {
    color: "white",
    fontSize: 12,
    textAlign: "left",
    flex: 1
  }
});

//make this component available to the app
export default LupaKataSandi;
