//import liraries
import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Dimensions } from "react-native";
import Loader from "../components/Loader";
import Input from "../components/Input";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";
import { getData } from "../utils/Utils";
import { Constants } from "../utils/Constants";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import { FirstReportClaimService } from "../services/FirstReportClaimService";

// create a component
class PelaporKlaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      policy_no: "",
      license_no: "",
      interest_insured: "",
      email: "",
      name: "",
      isEditable: false,
      tanggalKejadian: moment(new Date()).format("YYYY-MM-DD"),
      waktuKejadian: moment(new Date()).format("h:mm:ss a"),
      nomortelepon: "",
      lokasikejadian: "",
      keterangan: ""
    };
  }

  componentDidMount = async () => {
    const { KEY_DATA_USER } = Constants;
    const { username, profile } = await getData(KEY_DATA_USER);

    const { navigation } = this.props;
    const policy_no = navigation.getParam("policy_no");
    const license_no = navigation.getParam("license_no");
    const interest_insured = navigation.getParam("interest_insured");
    const email = navigation.getParam("email", username);
    const name = navigation.getParam("nama", profile.NAME);

    this.setState({
      policy_no,
      license_no,
      interest_insured,
      email,
      name
    });
  };

  onSendPress = async () => {
    this.setState({
      loading: true
    });
    const {
      interest_insured,
      license_no,
      nomortelepon,
      lokasikejadian,
      keterangan,
      policy_no,
      tanggalKejadian,
      waktuKejadian
    } = this.state;

    const data = {
      phonenumber: nomortelepon,
      licenseno: license_no,
      policyno: policy_no,
      insuredname: interest_insured,
      lossdate: tanggalKejadian,
      losstime: waktuKejadian,
      lossplace: lokasikejadian,
      lossdescription: keterangan
    };

    const sendClaimReport = await FirstReportClaimService(data);
    this.setState({
      loading: false
    });
    if (sendClaimReport.status === "SUCCESS") {
      this.props.navigation.navigate("Home");
    } else {
      Alert.alert("Error", sendClaimReport.message);
    }
  };

  render() {
    return (
      <View
        style={{ backgroundColor: "#1A1F61", flex: 1, flexDirection: "column" }}
      >
        <Loader loading={this.state.loading} />

        <ScrollView>
          <View style={styles.viewData}>
            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.text}>Email</Text>
              <Text style={styles.text2}>{this.state.email}</Text>
            </View>
            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.text}>Nama Pelapor</Text>
              <Text style={styles.text2}>{this.state.name}</Text>
            </View>
            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.text}>Nomor Kendaraan</Text>
              <Text style={styles.text2}>
                {this.state.license_no}
              </Text>
            </View>
            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.text}>Nomor Polis</Text>
              <Text style={styles.text2}>{this.state.policy_no}</Text>
            </View>
            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.text}>Nama Tertanggung</Text>
              <Text style={styles.text2}>{this.state.interest_insured}</Text>
            </View>
          </View>

          <View style={styles.viewData1}>
            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.formtext}>Nomor Telepon</Text>
              <Text style={styles.formtext2}>*Wajib Diisi</Text>
            </View>
            <TextInput
              style={styles.input}
              //onChangeText={value => this.setState({ nomortelepon: value })}
              placeholder="021-77665544 / 0899776654321"
              underlineColorAndroid="transparent"
              keyboardType="numeric"
            />
            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.formtext}>Dari Tanggal</Text>
              <Text style={styles.formtext2}>*Wajib Diisi</Text>
            </View>
            <View>
              <DatePicker
                style={styles.datePicker}
                customStyles={{
                  dateInput: {
                    borderRadius: 5,
                    borderColor: "white",
                    backgroundColor: "white"
                  }
                }}
                date={this.state.dariTanggal} //initial date from state
                mode="date" //The enum of date, datetime and time
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
              />
            </View>
            <View style={{ padding: 5, flexDirection: "row", marginTop: 10 }}>
              <Text style={styles.formtext}>Waktu Kejadian</Text>
              <Text style={styles.formtext2}>*Wajib Diisi</Text>
            </View>
            <View>
              <DatePicker
                style={styles.datePicker}
                customStyles={{
                  dateInput: {
                    borderRadius: 5,
                    borderColor: "white",
                    backgroundColor: "white"
                  }
                }}
                date={this.state.waktuKejadian} //initial date from state
                mode="time" //The enum of date, datetime and time
                format="h:mm:ss"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
              />
            </View>
            <View style={{ padding: 5, flexDirection: "row", marginTop: 10 }}>
              <Text style={styles.formtext}>Lokasi Kejadian</Text>
              <Text style={styles.formtext2}>*Wajib Diisi</Text>
            </View>
            <TextInput
              style={styles.inputLok}
              //onChangeText={value => this.setState({ lokasikejadian: value })}
            />

            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.formtext}>Keterangan</Text>
              <Text style={styles.formtext2}>*Wajib Diisi</Text>
            </View>
            <TextInput
              style={styles.inputLok}
              //onChangeText={value => this.setState({ lokasikejadian: value })}
            />

            <View style={{ marginTop: 20, marginBottom: 20 }}>
              <Button>KIRIM</Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  datePicker: {
    width: Dimensions.get("window").width - 50,
    marginLeft: 5,
    marginRight: 5
  },
  viewData: {
    padding: 23,
    color: "#fff",
    fontSize: 16,
    marginBottom: 5
  },
  viewData1: {
    marginLeft: 23,
    marginRight: 23,
    marginBottom: 10,
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5
  },
  text: {
    color: "white",
    fontSize: 12,
    textAlign: "left",
    flex: 1
  },
  text2: {
    color: "white",
    fontSize: 12,
    textAlign: "left",
    flex: 1,
    fontWeight: "bold"
  },
  formtext: {
    color: "white",
    fontSize: 12,
    textAlign: "left",
    flex: 1
  },
  formtext2: {
    color: "red",
    fontSize: 10,
    textAlign: "right",
    flex: 1
  },
  input: {
    backgroundColor: "#fff",
    color: "#06397B",
    borderRadius: 5,
    marginBottom: 10
  },
  inputLok: {
    backgroundColor: "#fff",
    color: "#06397B",
    borderRadius: 5,
    marginBottom: 10,
    width: 320,
    height: 120
  }
});

//make this component available to the app
export default PelaporKlaim;
