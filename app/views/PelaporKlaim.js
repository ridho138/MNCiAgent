//import liraries
import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import Loader from "../components/Loader";
import Input from "../components/Input";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";
import { getData } from "../utils/Utils";
import { Constants } from "../utils/Constants";
import DatePicker from "react-native-datepicker";
import moment from "moment";

// create a component
class PelaporKlaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policy_no: "",
      license_no1: "",
      license_no2: "",
      license_no3: "",
      interest_insured: "",
      email: "",
      name: "",
      isEditable: false,
      tanggalKejadian: moment(new Date()).format("YYYY-MM-DD"),
      waktuKejadian: moment(new Date()).format("h:mm:ss a")
    };
  }

  componentDidMount = async () => {
    const { KEY_DATA_USER } = Constants;
    const { username, profile } = await getData(KEY_DATA_USER);

    const { navigation } = this.props;
    const policy_no = navigation.getParam("policy_no");
    const license_no1 = navigation.getParam("license_no1");
    const license_no2 = navigation.getParam("license_no2");
    const license_no3 = navigation.getParam("license_no3");
    const interest_insured = navigation.getParam("interest_insured");
    this.setState({
      policy_no,
      license_no1,
      license_no2,
      license_no3,
      interest_insured,
      email: username,
      name: profile.NAME
    });
  };

  render() {
    return (
      <View
        style={{ backgroundColor: "#1A1F61", flex: 1, flexDirection: "column" }}
      >
        <ScrollView>
          <View
            style={{
              padding: 20,
              color: "#fff",
              fontSize: 16,
              marginBottom: 5,
              marginTop: 5
            }}
          >
            <Text style={{ color: "#fff", marginTop: 5, marginBottom: 15 }}>
              Email : {this.state.email}
            </Text>
            <Text style={{ color: "#fff", marginBottom: 15 }}>
              Nama Pelapor : {this.state.name}
            </Text>
            <Text style={{ color: "#fff", marginBottom: 15 }}>
              Nomor Kendaraan : {this.state.license_no1}{" "}
              {this.state.license_no2} {this.state.license_no3}
            </Text>
            <Text style={{ color: "#fff", marginBottom: 15 }}>
              Nomor Polis : {this.state.policy_no}
            </Text>
            <Text style={{ color: "#fff" }}>
              Nama Tertanggung : {this.state.interest_insured}
            </Text>
          </View>

          <View
            style={{
              padding: 20
            }}
          >
            <View style={{ alignSelf: "flex-start", padding: 5 }}>
              <Text style={{ color: "white", fontSize: 12 }}>
                Nomor Telepon
              </Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={value => this.setState({ nomortelepon: value })}
              placeholder="021-77665544 / 0899776654321"
              underlineColorAndroid="transparent"
              keyboardType="numeric"
            />

            <View style={{ alignSelf: "flex-start", padding: 5 }}>
              <Text style={{ color: "white", fontSize: 12 }}>
                Tanggal Kejadian
              </Text>
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
                date={this.state.tanggalKejadian} //initial date from state
                mode="date" //The enum of date, datetime and time
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={date => {
                  this.setState({ tanggalKejadian: date });
                }}
              />
            </View>

            <View style={{ alignSelf: "flex-start", padding: 5 }}>
              <Text style={{ color: "white", fontSize: 12, marginTop: 10 }}>
                Waktu Kejadian
              </Text>
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
                onDateChange={date => {
                  this.setState({ waktuKejadian: date });
                }}
              />
            </View>

            <View style={{ alignSelf: "flex-start", padding: 5 }}>
              <Text style={{ color: "white", fontSize: 12, marginTop: 10 }}>
                Lokasi Kejadian
              </Text>
            </View>
            <TextInput
              style={styles.inputKet}
              //onChangeText={value => this.setState({ lokasikejadian: value })}
            />

            <View style={{ alignSelf: "flex-start", padding: 5 }}>
              <Text style={{ color: "white", fontSize: 12 }}>Keterangan</Text>
            </View>
            <TextInput
              style={styles.inputKet}
              //onChangeText={value => this.setState({ lokasikejadian: value })}
            />
          </View>

          <View style={{ marginBottom: 40, marginLeft: 15, marginRight: 15 }}>
            <Button>KIRIM</Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SectionStyle: {
    backgroundColor: "white",
    borderRadius: 5,
    margin: 22
  },
  sectionSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5
  },
  searchIcon: {
    padding: 8
  },
  input: {
    backgroundColor: "#fff",
    color: "#06397B",
    borderRadius: 5,
    marginBottom: 10
  },
  inputKet: {
    backgroundColor: "#fff",
    color: "#06397B",
    borderRadius: 5,
    marginBottom: 10,
    width: 320,
    height: 120
  },
  inputDate: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#06397B",
    borderRadius: 5
  }
});

//make this component available to the app
export default PelaporKlaim;
