import React from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import NumberFormat from "react-number-format";

const ProductionSummary = ({ Data, Month }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Produksi Premi Periode {Month}</Text>
      <NumberFormat
        value={Data}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rp "}
        renderText={value => <Text style={styles.textPremi}>{value}</Text>}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 3,
    paddingLeft: 25
  },
  textTitle: {
    fontSize: "0.9rem",
    color: "white",
    fontWeight: "bold"
  },
  textPremi: {
    fontSize: "0.9rem",
    color: "white",
    fontWeight: "bold"
  }
});

export default ProductionSummary;
