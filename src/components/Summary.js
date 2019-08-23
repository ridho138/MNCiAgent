import React from "react";
import { View, Text, Dimensions } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

const Summary = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Produksi Premi Periode Juli 2019</Text>
      <Text style={styles.textPremi}>Rp. 79,982,839.28</Text>
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

// const styles = {
//   container: {
//     flex: 3,
//     paddingLeft: 25
//   },
//   textTitle: {
//     fontSize: 14,
//     color: "white",
//     fontWeight: "bold"
//   },
//   textPremi: {
//     fontSize: 16,
//     color: "white",
//     fontWeight: "bold"
//   }
// };

export default Summary;
