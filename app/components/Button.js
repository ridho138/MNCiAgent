import React from "react";
import { Text, TouchableOpacity, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Button = ({ onPress, children, bStyle, tStyle }) => {
  const { buttonStyle, textStyle, linearGradient } = styles;
  return (
    // <TouchableOpacity onPress={onPress} style={[buttonStyle, bStyle]}>
    //     <Text style={[textStyle, tStyle]}>
    //         {children}
    //     </Text>
    // </TouchableOpacity>

    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#7b572d", "#835f2c", "#9e7b28", "#ae8925", "#b49024"]}
      style={[linearGradient, bStyle]}
    >
      <TouchableOpacity onPress={onPress}>
        <Text style={[textStyle, tStyle]}>{children}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = {
  buttonStyle: {
    alignSelf: "stretch",
    backgroundColor: "#997A2D",
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5
  },
  textStyle: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 16,
    //fontWeight: "bold",
    fontFamily: "Avenir-Heavy",
    paddingTop: 10,
    paddingBottom: 10,
    letterSpacing: 0.5
  },
  linearGradient: {
    alignSelf: "stretch",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    //width: Dimensions.get("window").width - 50,
  }
};

export default Button;
