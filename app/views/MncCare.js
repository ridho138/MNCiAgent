//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Communications from "react-native-communications";
import { connect } from "react-redux";
import { setModalMenu } from "../actions";

// create a component
class MncCare extends Component {
  
  componentDidMount() {
    this.props.dispatch(setModalMenu(false));
    this.props.navigation.setParams({ showDialog: this.showDialog });
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity onPress={() => params.showDialog()}>
          <Image
                resizeMode="contain"
                style={{
                  //paddingRight: 10,
                  //position: "absolute",
                  width: 30,
                  height: 30
                }}
                source={require("../assets/icons/phone.png")}
              />
          </TouchableOpacity>
        </View>
      )
    };
  };

  showDialog = () => {
    Alert.alert(
      "Telepon MNC Care",
      "MNCi Agen apps akan menelepon nomor MNC Care. Biaya tambahan dari provider mungkin berlaku. Izinkan Menelpon ?",
      [
        {
          text: "Cancel",
          onPress: this.handleCancel
        },
        {
          text: "OK",
          onPress: this.handleYes
        }
      ]
    );
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleYes = () => {
    this.setState(() => Communications.phonecall("1500899", true));
  };

  render() {
    return (
      <View style={{ backgroundColor: "#143260", flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>HUBUNGI MNC CARE</Text>
          <Text style={styles.Description}>PT. MNC ASURANSI INDONESIA</Text>
          <Text style={styles.Description}>MNC FINANCIAL CENTER LANTAI 11</Text>
          <Text style={styles.Description}>JL. KEBON SIRIH NO.21-27</Text>
          <Text style={styles.Description}>JAKARTA PUSAT 10340</Text>
          <Text style={styles.Description}>INDONESIA</Text>
          <Text style={styles.EmailWeb}>EMAIL INFO@MNC-INSURANCE.COM</Text>
          <Text style={{ color: "white", fontSize: 12 }}>
            WWW.MNC-INSURANCE.COM
          </Text>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 15,
    fontSize: 16
  },
  title: {
    color: "white",
    fontWeight: "bold",
    //marginLeft: 30,
    //marginTop: 30,
    marginBottom: 15,
    fontSize: 16
  },
  Description: {
    color: "white",
    //marginLeft: 30,
    fontSize: 12
  },
  EmailWeb: {
    color: "white",
    //marginLeft: 30,
    marginTop: 30,
    fontSize: 12
  }
});

const mapStateToProps = state => {
  return {
    data: state.dataModalMenu.isOpen
  };
};

//make this component available to the app
export default connect(mapStateToProps)(MncCare);
