import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import EStyleSheet from 'react-native-extended-stylesheet';

const MainMenu = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        // onPress={() => this.onMenuPress("")}
      >
        <View style={{flex:1}}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
              flex: 1
            }}
          >
            <Icon name="copy" color="#fff" size={25}>
              {/* <Text>Daily Production</Text>     */}
            </Icon>
          </View>
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              flexWrap: "wrap",
              flex: 1
            }}
          >
            <Text style={styles.textTitle}>Quotation (QS)</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        // onPress={() => this.onMenuPress("")}
      >
        <View style={{flex:1}}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
              flex: 1
            }}
          >
            <Icon name="bar-chart" color="#fff" size={25}>
              {/* <Text>Daily Production</Text>     */}
            </Icon>
          </View>
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              flexWrap: "wrap",
              flex: 1
            }}
          >
            <Text style={styles.textTitle}>Produksi Premi</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        // onPress={() => this.onMenuPress("")}
      >
        <View style={{flex:1}}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
              flex: 1
            }}
          >
            <Icon name="clipboard" color="#fff" size={25}>
              {/* <Text>Daily Production</Text>     */}
            </Icon>
          </View>
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              flexWrap: "wrap",
              flex: 1
            }}
          >
            <Text style={styles.textTitle}>Lapor Klaim</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        // onPress={() => this.onMenuPress("")}
      >
        <View style={{flex:1}}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
              flex: 1
            }}
          >
            <Icon name="list-alt" color="#fff" size={25}>
              {/* <Text>Daily Production</Text>     */}
            </Icon>
          </View>
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              flexWrap: "wrap",
              flex: 1
            }}
          >
            <Text style={styles.textTitle}>Premi Belum Terbayar</Text>
          </View>
        </View>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15
  },
  card: {
    flex: 1,
    justifyContent: "center"
  },
  textTitle: {
    color: "white",
    fontSize: '0.7rem',
    textAlign: "center"
  }
});

// const styles = {
//   container: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 15
//   },
//   card: {
//     flex: 1,
//     justifyContent: "center"
//   },
//   textTitle: {
//     color: "#fff",
//     fontSize: 12,
//     textAlign: 'center'
//   }
// };

export default MainMenu;
