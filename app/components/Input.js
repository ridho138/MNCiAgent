import React from "react";
import { TextInput, Dimensions } from "react-native";

const Input = props => {
  return <TextInput {...props} style={[styles.input, props.tStyle]} />;
};

const styles = {
  input: {
    alignSelf: "stretch",
    // width: Dimensions.get("window").width - 50,
    backgroundColor: "#fff",
    padding: 7,
    //marginBottom: 15,
    borderRadius: 5
  }
};

export default Input;
