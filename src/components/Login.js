import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
  TextInput
} from "react-native";
import { ServiceLogin } from "../util/Services";
import Loader from "./Loader";
import { getData, setData } from "../util/Utils";
import { Constants } from "../util/Constants";
import AsyncStorage from "@react-native-community/async-storage";

// create a component
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      password: "",
      registrationId: "",
      loading: false,
      dataUser: null,
      checked: false,
      viewPassword: false
    };
  }

  onButtonPress = async () => {
    this.setState({
      loading: true
    });

    const { uid, password, registrationId, checked } = this.state;

    if (uid !== "" && password !== "") {
      const dataUser = {
        uid: uid,
        password: password,
        registrationId: registrationId,
        rememberMe: checked
      };
      //console.log(dataUser);
      const login = await ServiceLogin(dataUser, "1");
      this.setState({
        loading: false
      });

      // if (login.status === "SUCCESS") {
      //   this.props.navigation.navigate("Home");
      // } else {
      //   Alert.alert("Error", login.status);
      // }
    } else {
      this.setState({
        loading: false
      });
      Alert.alert("Error", "NIK and/or Password cannot be empty.");
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Loader loading={this.state.loading} />

        <View style={styles.loginContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../images/logo-white.png")}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={{ alignSelf: "flex-start" }}>
            <Text>USERNAME</Text>
          </View>

          <TextInput
            style={styles.input}
            onChangeText={value => this.setState({ uid: value })}
            value={this.state.uid}
          />
          <View style={{ alignSelf: "flex-start" }}>
            <Text>PASSWORD</Text>
          </View>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={value => this.setState({ password: value })}
          />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onButtonPress}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#06397B"
  },
  loginContainer: {
    alignItems: "center",
    // flexGrow: 1,
    flex: 1,
    justifyContent: "flex-end"
  },
  logo: {
    position: "absolute",
    width: 300,
    height: 100
  },
  title: {
    color: "#FFF",
    marginTop: 120,
    width: 180,
    textAlign: "center",
    opacity: 0.9
  },
  formContainer: {
    flex: 2,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  input: {
    // height: 60,
    width: Dimensions.get("window").width - 50,
    backgroundColor: "#fff",
    marginBottom: 30,
    // padding: 10,
    // color: "#000",
    borderRadius: 10
  },
  buttonContainer: {
    backgroundColor: "#997A2D",
    borderRadius: 30,
    paddingVertical: 8,
    width: 150,
    elevation: 5
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});

//make this component available to the app
export default Login;
