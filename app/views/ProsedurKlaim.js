//import liraries
import React, { Component } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import { setModalMenu } from "../actions";

// create a component
class ProsedurKlaim extends Component {
  componentDidMount = () => {
    this.props.dispatch(setModalMenu(false));
  };
  render() {
    return (
      <View style={{ backgroundColor: "#1A1F61", flex: 1 }}>
        <View style={styles.ViewDescription}>
          <View>
            <Text style={styles.Number}>1.</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.Prosedur}>Hubungi MNC Care</Text>
            <Text style={styles.SubProsedur}>1500 899</Text>
          </View>
          <View style={styles.ViewImage}>
            <Image
              source={require("../assets/images/call.png")}
              style={styles.ImageStyle}
              resizeMode="center"
            />
          </View>
        </View>

        <View style={styles.ViewDescription}>
          <View>
            <Text style={styles.Number}>2.</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.Prosedur}>Siapkan Dokumen</Text>
            <Text style={styles.SubProsedur}>
              (Fotokopi KTP, STNK, SIM, Polis dan Form Lain)
            </Text>
          </View>
          <View style={styles.ViewImage}>
            <Image
              source={require("../assets/images/dokumen.png")}
              style={styles.ImageStyle}
              resizeMode="center"
            />
          </View>
        </View>

        <View style={styles.ViewDescription}>
          <View>
            <Text style={styles.Number}>3.</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.Prosedur}>Customer Service</Text>
            <Text style={styles.SubProsedur}>
              Memberikan informasi kepada surveyor
            </Text>
          </View>
          <View style={styles.ViewImage}>
            <Image
              source={require("../assets/images/cs.png")}
              style={styles.ImageStyle}
              resizeMode="center"
            />
          </View>
        </View>

        <View style={styles.ViewDescription}>
          <View>
            <Text style={styles.Number}>4.</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.Prosedur}>Konfirmasi</Text>
            <Text style={styles.SubProsedur}>
              Dengan telepon oleh customer service
            </Text>
          </View>
          <View style={styles.ViewImage}>
            <Image
              source={require("../assets/images/konfirmasi.png")}
              style={styles.ImageStyle}
              resizeMode="center"
            />
          </View>
        </View>

        <View style={styles.ViewDescription}>
          <View>
            <Text style={styles.Number}>5.</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.Prosedur}>Pilih Bengkel</Text>
            <Text style={styles.SubProsedur}>Pilih bengkel rekanan</Text>
          </View>
          <View style={styles.ViewImage}>
            <Image
              source={require("../assets/images/bengkel.png")}
              style={styles.ImageStyle}
              resizeMode="center"
            />
          </View>
        </View>

        <View style={styles.ViewDescription}>
          <View>
            <Text style={styles.Number}>6.</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.Prosedur}>Isi Fomulir</Text>
            <Text style={styles.SubProsedur}>
              Isi formulir klaim dan kendaraan anda siap di proses
            </Text>
          </View>
          <View style={styles.ViewImage}>
            <Image
              source={require("../assets/images/formulir.png")}
              style={styles.ImageStyle}
              resizeMode="center"
            />
          </View>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  ImageStyle: {
    flex: 1,
    alignSelf: "stretch",
    height: undefined,
    width: undefined
  },
  ViewImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  ViewDescription: {
    flex: 1,
    marginTop: 22,
    marginLeft: 22,
    marginRight: 22,
    borderRadius: 5,
    flexDirection: "row",
    //alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
    // padding: 10
  },
  Number: {
    flex: 1,
    textAlign: "left",
    color: "black",
    margin: 5
  },
  Prosedur: {
    textAlign: "right",
    marginRight: 10,
    color: "black",
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold"
  },
  SubProsedur: {
    textAlign: "right",
    color: "black",
    marginRight: 10,
    fontSize: 12,
    marginTop: 5
  }
});

const mapStateToProps = state => {
  return {
    data: state.dataModalMenu.isOpen
  };
};

//make this component available to the app
export default connect(mapStateToProps)(ProsedurKlaim);
