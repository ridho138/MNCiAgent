import React, { Component } from "react";
import { Text, View, Dimensions, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { setModalMenu } from "../actions";
import EStyleSheet from "react-native-extended-stylesheet";

class Menu extends Component {
  toggleModal = () => {
    this.props.dispatch(setModalMenu(!this.props.data));
  };

  onMenuPress = dest => {
    this.props.Navigation.navigate(dest);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.onMenuPress("Info Klaim")}
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
            onPress={() => this.onMenuPress("Daftar Polis")}
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
            onPress={() => this.onMenuPress("Polis Jatuh Tempo")}
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
            onPress={() => this.onMenuPress("Kantor")}
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
            onPress={() => this.onMenuPress("Daftar Bengkel")}
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
            onPress={() => this.onMenuPress("Prosedur Klaim")}
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
            onPress={() => this.onMenuPress("Produk")}
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
          <TouchableOpacity style={styles.card} onPress={this.toggleModal}>
            <View style={{ flex: 1 }}>
              <View style={styles.iconContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={require("../assets/icons/other.png")}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={styles.textTitle}>Menu Lainnya</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    flexWrap: "wrap"
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
  },
  icon: {
    position: "absolute",
    width: 25,
    height: 25
  }
});

const mapStateToProps = state => {
  //console.log(state);
  return {
    data: state.dataModalMenu.isOpen
  };
};
export default connect(mapStateToProps)(Menu);
