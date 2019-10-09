//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";
import { connect } from "react-redux";
import { setModalMenu } from "../actions";
import { getData, toDate } from "../utils/Utils";
import { Constants } from "../utils/Constants";

// create a component
class Profil extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Button onPress={() => navigation.navigate("Ubah Profil")}>
            Ubah
          </Button>
        </View>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      namaAgent: "",
      kodeAgent: "",
      periodeKontrak: "",
      periodeAaui: "",
      telpAgent: "",
      email: "",
      loading: false
    };
  }

  componentDidMount = async () => {
    this.props.dispatch(setModalMenu(false));

    const { profile } = await getData(Constants.KEY_DATA_USER);
    const { NAME, EMAIL, phonenumber, code, CONTRACT_END_DATE, EXPIRY_CARD_AGENT } = profile;

    this.setState({
      namaAgent: NAME,
      kodeAgent: code,
      telpAgent: phonenumber,
      email: EMAIL,
      periodeKontrak: CONTRACT_END_DATE,
      periodeAaui: EXPIRY_CARD_AGENT
    });
  };

  render() {
    const {
      namaAgent,
      kodeAgent,
      periodeKontrak,
      periodeAaui,
      telpAgent,
      email
    } = this.state;
    return (
      <View style={{ backgroundColor: "#143260", flex: 1 }}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Nama Agent</Text>
            <Text style={styles.agent}>{namaAgent}</Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.title}>Kode Agent</Text>
            <Text style={styles.agent}>{kodeAgent}</Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.title}>Periode Kontrak</Text>
            <Text style={styles.agent}>{toDate(periodeKontrak)}</Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.title}>Periode Keanggotaan AAUI</Text>
            <Text style={styles.agent}>{toDate(periodeAaui)}</Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.title}>Nomor Telepon</Text>
            <Text style={styles.agent}>{telpAgent}</Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.agent}>{email}</Text>
          </View>
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
    fontSize: 13
  },
  agent: {
    color: "white",
    fontSize: 12,
    marginTop: 3
  }
});

const mapStateToProps = state => {
  return {
    data: state.dataModalMenu.isOpen
  };
};

//make this component available to the app
export default connect(mapStateToProps)(Profil);
