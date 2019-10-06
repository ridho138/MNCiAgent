import React from "react";
import { Picker, Dimensions } from "react-native";
import Card from "./Card";
import CardSection from "./CardSection";

const Pickers = props => {
  let ItemList = props.List.map((data, index) => {
    return <Picker.Item key={index} value={data.value} label={data.label} />;
  });
  return (
    //<TextInput {...props} style={[styles.input, props.tStyle]} />;
    <Card
      cStyle={{
        borderRadius: 5,
        borderColor: "transparent",
        shadowRadius: 5,
        marginLeft: 0,
        marginBottom: 0,
        marginTop: 0,
        marginRight: 0,
        alignSelf: "stretch"
      }}
    >
      <CardSection
        cStyle={{
          borderRadius: 5,
          borderBottomWidth: 0,
          padding: 0,
          alignSelf: "stretch"
        }}
      >
        <Picker {...props} style={[styles.input, props.pStyle]}>
          {ItemList}
        </Picker>
      </CardSection>
    </Card>
  );
};

const styles = {
  input: {
    alignSelf: "stretch",
    //backgroundColor: "#fff",
    padding: 7
    //marginBottom: 15,
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: "#bdc3c7",
    // overflow: "hidden"
  }
};

export default Pickers;
