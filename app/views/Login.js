import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert
} from "react-native";
import { LoginService } from "../services/LoginService";
import Loader from "../components/Loader";
import Button from "../components/Button";
import Input from "../components/Input";

// create a component
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "thio_88@hotmail.com",
      password: "887700",
      registrationId: "",
      loading: false,
      dataUser: null
    };
  }

  onLoginPress = async () => {
    this.setState({
      loading: true
    });

    const { username, password, registrationId } = this.state;

    if (username !== "" && password !== "") {
      const dataUser = {
        username: username,
        password: password,
        registrationId: registrationId
      };
      
      const login = await LoginService(dataUser);
      this.setState({
        loading: false
      });
      
      if (login.status === "SUCCESS") {
        this.props.navigation.navigate("Home");
      } else {
        Alert.alert("Error", login.message);
      }
    } else {
      this.setState({
        loading: false
      });
      Alert.alert("Error", "NIK and/or Password cannot be empty.");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />

        <View style={styles.loginContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../assets/images/logo-white.png")}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={{ alignSelf: "flex-start", padding: 5}}>
            <Text style={{color:"white", fontSize: 12}}>USERNAME</Text>
          </View>

          <Input
            onChangeText={value => this.setState({ username: value })}
            value={this.state.username}
          />
          <View style={{ alignSelf: "flex-start", padding: 5}}>
            <Text style={{color:"white", fontSize: 12}}>PASSWORD</Text>
          </View>
          <Input
            secureTextEntry
            onChangeText={value => this.setState({ password: value })}
          />

          <Button onPress={this.onLoginPress}>LOGIN</Button>
        </View>
      </View>
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
