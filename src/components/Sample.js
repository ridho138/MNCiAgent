import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  StyleSheet,
  Dimensions
} from "react-native";

import Menu from "./Menu";

export default class Sample extends Component {
  state = {
    animation: new Animated.Value(0)
  };

  handleOpen = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };
  handleClose = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  render() {
    const screenHeight = Dimensions.get("window").height;

    const backdrop = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 0.01],
            outputRange: [screenHeight, 0],
            extrapolate: "clamp"
          })
        }
      ],
      opacity: this.state.animation.interpolate({
        inputRange: [0.01, 0.5],
        outputRange: [0, 1],
        extrapolate: "clamp"
      })
    };

    const slideUp = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0.01, 1],
            outputRange: [0, -1 * screenHeight],
            extrapolate: "clamp"
          })
        }
      ]
    };
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.handleOpen()}>
          <Text>Open</Text>
        </TouchableOpacity>
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.cover, backdrop]}
        />
        <View style={[styles.sheet]}>
          <Animated.View style={[styles.popup, slideUp]}>
            <TouchableOpacity onPress={() => this.handleClose()}>
              <Text>Close</Text>
            </TouchableOpacity>
            <Menu />
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  cover: {
    backgroundColor: "rgba(0,0,0,.5)"
  },
  sheet: {
    position: "absolute",
    top: Dimensions.get("window").height,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end"
  },
  popup: {
    backgroundColor: "white",
    //marginHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height:
      Dimensions.get("window").height / 2 + Dimensions.get("window").height / 4,
    alignItems: "center",
    justifyContent: "center"
  }
});
