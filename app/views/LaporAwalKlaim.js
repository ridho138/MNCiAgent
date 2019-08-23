import React, { Component } from "react";
import { View, Text, Alert, Dimensions, FlatList } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import { connect } from "react-redux";
import { setModalMenu } from "../actions";
import EStyleSheet from "react-native-extended-stylesheet";
import { LicenseCheckExistService } from "../services/LicenseCheckExistService";
import Loader from "../components/Loader";
import { Constants } from "../utils/Constants";
import { getData } from "../utils/Utils";

// create a component
class LaporAwalKlaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      nama: "",
      nomorKendaraan: ""
    };
  }

  componentDidMount = async () => {
    this.props.dispatch(setModalMenu(false));
    const { KEY_DATA_USER } = Constants;
    const { username, profile } = getData(KEY_DATA_USER);
    this.setState({
      email: username,
      nama: profile.NAME
    });
  };

  onSendPress = async () => {
    this.setState({
      loading: true
    });
    const { nomorKendaraan } = this.state;
    const licenseCheck = await LicenseCheckExistService(nomorKendaraan);

    this.setState({
      loading: false
    });

    if (licenseCheck.status === "SUCCESS") {
      Alert.alert("Info", "Ada..");
    } else {
      Alert.alert("Error", licenseCheck.message);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <View style={{ marginBottom: 5, marginLeft: 5 }}>
          <Text style={styles.textDate}>Email</Text>
        </View>
        <View>
          <Input value={this.state.email} />
        </View>
        <View style={{ marginBottom: 5, marginTop: 10, marginLeft: 5 }}>
          <Text style={styles.textDate}>Nama Pelapor</Text>
        </View>
        <View>
          <Input value={this.state.nama} />
        </View>
        <View style={{ marginBottom: 5, marginTop: 10, marginLeft: 5 }}>
          <Text style={styles.textDate}>Nomor Kendaraan</Text>
        </View>
        <View>
          <Input
            onChangeText={value => {
              this.setState({ nomorKendaraan: value });
            }}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Button onPress={this.onSendPress}>KIRIM</Button>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#06397B",
    padding: 20
  },
  textTitle: {
    color: "white",
    fontSize: "0.9rem"
  },
  textDate: {
    color: "#E6E6FA",
    fontSize: "0.7rem"
  },
  datePicker: {
    width: Dimensions.get("window").width - 50,
    marginLeft: 5,
    marginRight: 5
  },
  bottomModal: {
    justifyContent: "flex-end",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
  modalContent: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "white",
    padding: 10
  },
  modalContainer: {
    flex: 1,
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    data: state.dataModalMenu.isOpen
  };
};

//make this component available to the app
export default connect(mapStateToProps)(LaporAwalKlaim);
