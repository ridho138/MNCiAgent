import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MainMenu from "./MainMenu";
import EStyleSheet from "react-native-extended-stylesheet";
import LinearGradient from "react-native-linear-gradient";

const AllMenu = ({ Navigation }) => {
  const onMenuPress = dest => {
    Navigation.navigate(dest);
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ padding: 5 }}>
        <View
          style={{
            width: 60,
            height: 6,
            backgroundColor: "#AE8E36",
            borderRadius: 5
          }}
        />
      </View>
      <View style={styles.container}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#7b572d", "#835f2c", "#9e7b28", "#ae8925", "#b49024"]}
          style={styles.secondrow}
        >
          <MainMenu Navigation={Navigation} />
        </LinearGradient>
        <View style={styles.menuRow}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => onMenuPress("Info Klaim")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.iconContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={require("../assets/icons/InfoKlaim.png")}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={styles.textTitle}>Info Klaim</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => onMenuPress("Daftar Polis")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.iconContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={require("../assets/icons/DaftarPolis.png")}
                />
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.textTitle}>Daftar Polis</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => onMenuPress("Polis Jatuh Tempo")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.iconContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={require("../assets/icons/PolisJatuhTempo.png")}
                />
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.textTitle}>Polis Jatuh Tempo</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => onMenuPress("Kantor")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.iconContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={require("../assets/icons/Kantor.png")}
                />
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.textTitle}>Kantor</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => onMenuPress("Daftar Bengkel")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.iconContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={require("../assets/icons/Bengkel.png")}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={styles.textTitle}>Bengkel</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => onMenuPress("Prosedur Klaim")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.iconContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={require("../assets/icons/ProsedurKlaim.png")}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={styles.textTitle}>Prosedur Klaim</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => onMenuPress("Produk")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.iconContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={require("../assets/icons/Produk.png")}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={styles.textTitle}>Produk</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => onMenuPress("Profil")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.iconContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={require("../assets/icons/ProfilAgen.png")}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={styles.textTitle}>Profile</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => onMenuPress("MNC Care")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.iconContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={require("../assets/icons/Pelayanan.png")}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={styles.textTitle}>Pelayanan</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}></TouchableOpacity>
          <TouchableOpacity style={styles.card}></TouchableOpacity>
          <TouchableOpacity style={styles.card}></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = EStyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column"
  },
  menuRow: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  secondrow: {
    backgroundColor: "#997a2d",
    width: Dimensions.get("window").width - 30,
    height: 90,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 7
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 12,
    width: Dimensions.get("window").width / 4 - 20,
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d8e0",
    width: Dimensions.get("window").width / 4 - 30,
    height: Dimensions.get("window").width / 4 - 30
  },
  textTitle: {
    color: "black",
    fontSize: "0.7rem",
    fontWeight: "bold",
    textAlign: "center"
  }
});
export default AllMenu;
