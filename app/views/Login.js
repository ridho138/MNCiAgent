import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { LoginService } from "../services/LoginService";
import Loader from "../components/Loader";
import Button from "../components/Button";
import Input from "../components/Input";
import { validateEmail } from "../utils/Utils";

// create a component
class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      registrationId: "",
      loading: false,
      dataUser: null
    };
  }

  onLoginPress = async () => {
    const { username, password, registrationId } = this.state;

    if (validateEmail(username)) {
      if (username !== "" && password !== "") {
        this.setState({
          loading: true
        });
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
          Alert.alert("Info", login.message);
        }
      } else {
        this.setState({
          loading: false
        });
        Alert.alert("Info", "Email dan / atau Kata Sandi tidak boleh kosong.");
      }
    } else {
      Alert.alert("Info", "Format Email salah.");
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
            source={require("../assets/images/mciLogoGold.png")}
          />
        </View>
        <View style={styles.formContainer}>
          <View
            style={{
              alignSelf: "flex-start",
              paddingLeft: 5,
              paddingBottom: 5
            }}
          >
            <Text style={styles.title}>Alamat Email</Text>
          </View>

          <Input
            onChangeText={value => this.setState({ username: value })}
            value={this.state.username}
            keyboardType="email-address"
          />
          <View
            style={{
              alignSelf: "flex-start",
              paddingLeft: 5,
              paddingBottom: 5,
              paddingTop: 15
            }}
          >
            <Text style={styles.title}>Kata Sandi</Text>
          </View>
          <Input
            secureTextEntry
            onChangeText={value => this.setState({ password: value })}
            tStyle={{ marginBottom: 30 }}
          />

          <Button onPress={this.onLoginPress}>MASUK</Button>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20
            }}
          >
            <Text
              style={{ color: "white", fontSize: 14, letterSpacing: 0.5 }}
              onPress={() => this.props.navigation.navigate("Lupa Kata Sandi")}
            >
              Lupa Kata Sandi?
            </Text>
          </View>
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
    flex: 1,
    justifyContent: "center"
  },
  logo: {
    position: "absolute"
  },
  title: {
    color: "white",
    fontSize: 14
  },
  formContainer: {
    flex: 2,
    paddingLeft: 35,
    paddingRight: 35,
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
