import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { getData } from "../utils/Utils";
import { Constants } from "../utils/Constants";

// create a component
class SplashScreen extends Component {
    async componentDidMount() {
      const DataLogin = await getData(Constants.KEY_DATA_USER);
      console.log("Halo test");
      console.log(DataLogin);
      setTimeout(() => {
        if (DataLogin && DataLogin.status === "SUCCESS") {
          this.props.navigation.navigate("Home");
        } else {
          this.props.navigation.navigate("Login");
        }
      }, 2500);
    }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <Image
            source={require("../assets/images/SplashScreen.png")}
            resizeMode="cover"
            style={styles.backdrop}
          />
        </View>
        <View style={styles.overlay}>
          <Image
            // style={styles.logo}
            resizeMode="center"
            source={require("../assets/images/home_logo_agent.png")}
          />
        </View>
      </View>
      //   <View style={styles.container}>
      //   <Image
      //       style={{
      //         flex: 1,
      //         alignSelf: "center",
      //         width: undefined,
      //         height: undefined
      //       }}
      //       source={require("../assets/images/home_logo_agent.png")}
      //       resizeMode="center"
      //     />
      //     <Image
      //       style={{
      //         flex: 1,
      //         alignSelf: "stretch",
      //         width: undefined,
      //         height: undefined
      //       }}
      //       source={require("../assets/images/SplashScreen.png")}
      //       resizeMode="cover"
      //     />
      //   </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  backgroundContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  overlay: {
    // justifyContent: "center",
    // alignSelf: "center"
  },
  logo: {
    //backgroundColor: "rgba(0,0,0,0)",
    // width: 160,
    // height: 52
  },
  backdrop: {
    flex: 1,
    alignSelf: "stretch",
    width: undefined,
    height: undefined
  },
  headline: {
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "black",
    color: "white"
  }
});

//make this component available to the app
export default SplashScreen;
