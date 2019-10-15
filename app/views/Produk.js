//import liraries
import React, { Component } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import { setModalMenu } from "../actions";

// create a component
class Produk extends Component {
  componentDidMount = () => {
    this.props.dispatch(setModalMenu(false));
  }
  render() {
    return (
      <View style={{ backgroundColor: "#1A1F61", flex: 1 }}>
        <View style={styles.ViewDescription}>
          <View style={{ flex: 2 }}>
            <Text style={{ textAlign: "right", marginRight: 10 }}>
              Asuransi yang memberikan perlindungan atas kerusakan dan
              kehilangan dan resiko yang mungkin timbul sehubungan dengan
              kepemilikan kendaraan bermotor.
            </Text>
          </View>
          <View style={styles.ViewImage}>
            <Image
              source={require("../assets/images/total_care.png")}
              style={styles.ImageStyle}
              resizeMode="center"
            />
          </View>
        </View>

        <View style={styles.ViewDescription}>
          <View style={{ flex: 2 }}>
            <Text style={{ textAlign: "right", marginRight: 10 }}>
              Asuransi kecelakaan diri untuk Anda dan Keluarga
            </Text>
          </View>
          <View style={styles.ViewImage}>
            <Image
              source={require("../assets/images/personal_accident.png")}
              style={styles.ImageStyle}
              resizeMode="center"
            />
          </View>
        </View>

        <View style={styles.ViewDescription}>
          <View style={{ flex: 2 }}>
            <Text style={{ textAlign: "right", marginRight: 10 }}>
              Asuransi yang memberikan perlindungan bagi rumah tinggal atas
              berbagai resiko seperti kebakaran, banjir, pencurian, dan
              lain-lain.
            </Text>
          </View>
          <View style={styles.ViewImage}>
            <Image
              source={require("../assets/images/home_express.png")}
              style={styles.ImageStyle}
              resizeMode="center"
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            marginTop: 22,
            marginLeft: 22,
            marginRight: 22,
            marginBottom: 22,
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View style={{ flex: 2 }}>
            <Text style={{ textAlign: "right", marginRight: 10 }}>
              Asuransi perjalanan yang memberikan kenyamanan Anda dengan
              perlindungan atas kehilangan bagasi, keterlambatan perjalanan dan
              lainnya.
            </Text>
          </View>
          <View style={styles.ViewImage}>
            <Image
              source={require("../assets/images/travel_express.png")}
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
    height: 50,
    width: 100
  },
  ViewImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  ViewDescription: {
    backgroundColor: "white",
    flex: 1,
    marginTop: 22,
    marginLeft: 22,
    marginRight: 22,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    data: state.dataModalMenu.isOpen
  };
};

//make this component available to the app
export default connect(mapStateToProps)(Produk);