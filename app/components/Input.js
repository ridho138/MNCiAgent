import React from "react";
import { TextInput, Dimensions } from "react-native";

const Input = props => {
  return <TextInput {...props} style={[styles.input, props.tStyle]} />;
};

const styles = {
  input: {
    width: Dimensions.get("window").width - 50,
    backgroundColor: "#fff",
    marginBottom: 30,
    borderRadius: 5
  }
};

export default Input;
