import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import EStyleSheet from "react-native-extended-stylesheet";
import LinearGradient from "react-native-linear-gradient";

const MainMenu = ({ Navigation }) => {
  const onMenuPress = dest => {
    Navigation.navigate(dest);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => onMenuPress("Penawaran")}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
              flex: 1
            }}
          >
            <Image
              resizeMode="contain"
              style={styles.icon}
              source={require("../assets/icons/Penawaran.png")}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              flexWrap: "wrap",
              flex: 1
            }}
          >
            <Text style={styles.textTitle}>Penawaran</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => onMenuPress("Produksi Premi")}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
              flex: 1
            }}
          >
            <Image
              resizeMode="contain"
              style={styles.icon}
              source={require("../assets/icons/ProduksiPremi.png")}
            />
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
        onPress={() => onMenuPress("Lapor Klaim")}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
              flex: 1
            }}
          >
            <Image
              resizeMode="contain"
              style={styles.icon}
              source={require("../assets/icons/LaporKlaim.png")}
            />
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
        onPress={() => onMenuPress("Premi Belum Terbayar")}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
              flex: 1
            }}
          >
            <Image
              resizeMode="contain"
              style={styles.icon}
              source={require("../assets/icons/PremiBelumTerbayar.png")}
            />
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
    fontSize: "0.7rem",
    textAlign: "center"
  },
  icon: {
    position: "absolute",
    width: 25,
    height: 25
  }
});

export default MainMenu;
