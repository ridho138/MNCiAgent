import React, { Component } from "react";
import { View, Text, Alert, Dimensions, FlatList } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import { connect } from "react-redux";
import { setModalMenu } from "../actions";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import EStyleSheet from "react-native-extended-stylesheet";

// create a component
class InfoKlaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dariTanggal: moment(new Date()).format("YYYY-MM-DD"),
      sampaiTanggal: moment(new Date()).format("YYYY-MM-DD"),
      noPlat: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(setModalMenu(false));
  }

  onSearchPress = () => {

    const { dariTanggal, sampaiTanggal, noPlat } = this.state

    this.props.navigation.navigate("Daftar Info Klaim", {
        dariTanggal,
        sampaiTanggal,
        keyword: noPlat
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 15, marginLeft: 5 }}>
          <Text style={styles.textTitle}>Polis (Tanggal Post)</Text>
        </View>
        <View style={{ marginBottom: 5, marginLeft: 5 }}>
          <Text style={styles.textDate}>Dari Tanggal</Text>
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
            onDateChange={date => {
              this.setState({ dariTanggal: date });
            }}
          />
        </View>
        <View style={{ marginBottom: 5, marginTop: 10, marginLeft: 5 }}>
          <Text style={styles.textDate}>Sampai Tanggal</Text>
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
            date={this.state.sampaiTanggal} //initial date from state
            mode="date" //The enum of date, datetime and time
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={date => {
              this.setState({ sampaiTanggal: date });
            }}
          />
        </View>
        <View style={{ marginBottom: 5, marginTop: 10, marginLeft: 5 }}>
          <Text style={styles.textDate}>No Plat</Text>
        </View>
        <View>
          <Input
            onChangeText={value => {
              this.setState({ noPlat: value });
            }}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Button onPress={this.onSearchPress}>CARI</Button>
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
export default connect(mapStateToProps)(InfoKlaim);
