import React, { Component } from "react";
import { View, Text, Alert, Dimensions, FlatList } from "react-native";
import { ExpiryPolicyGroupService } from "../services/ExpiryPolicyGroupService";
import Loader from "../components/Loader";
import Button from "../components/Button";
import Input from "../components/Input";
import { connect } from "react-redux";
import { setModalMenu } from "../actions";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import EStyleSheet from "react-native-extended-stylesheet";
import Modal from "react-native-modal";
import NumberFormat from "react-number-format";
import Icon from "react-native-vector-icons/FontAwesome";

// create a component
class PolisJatuhTempo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isModalVisible: false,
      dariTanggal: moment(new Date()).format("YYYY-MM-DD"),
      sampaiTanggal: moment(new Date()).format("YYYY-MM-DD"),
      modalHeight: Dimensions.get("window").height / 2,
      data: null
    };
  }

  componentDidMount() {
    this.props.dispatch(setModalMenu(false));
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  swipeModal = () => {
    this.setState({ modalHeight: Dimensions.get("window").height / 4 });
  };

  onSendPress = async () => {
    this.setState({
      loading: true
    });

    const { dariTanggal, sampaiTanggal } = this.state;

    if (dariTanggal !== "" && sampaiTanggal !== "") {
      const expiryPolicy = await ExpiryPolicyGroupService(
        dariTanggal,
        sampaiTanggal
      );
      this.setState({
        loading: false
      });

      if (expiryPolicy.status === "SUCCESS") {
        this.setState({
          data: expiryPolicy.data
        });
        this.toggleModal();
      } else {
        Alert.alert("Error", expiryPolicy.message);
      }
    } else {
      this.setState({
        loading: false
      });
      Alert.alert("Error", "NIK and/or Password cannot be empty.");
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "90%",
          backgroundColor: "#CED0CE",
          marginLeft: "5%"
        }}
      />
    );
  };

  onExpiryPolicyCOBPress = cob => {
    this.toggleModal();
    const { dariTanggal, sampaiTanggal } = this.state;

    this.props.navigation.navigate("Daftar Polis Jatuh Tempo", {
      dariTanggal,
      sampaiTanggal,
      cob
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
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

        <View style={{ marginTop: 20 }}>
          <Button onPress={this.onSendPress}>KIRIM</Button>
        </View>

        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.toggleModal()}
          onSwipeComplete={() => this.toggleModal()}
          onBackButtonPress={() => this.toggleModal()}
          style={styles.bottomModal}
          swipeDirection={["down"]}
          propagateSwipe
        >
          <View
            style={[styles.modalContent, { height: this.state.modalHeight }]}
          >
            <View style={styles.modalContainer}>
              <View>
                <View
                  style={{
                    width: 60,
                    height: 6,
                    backgroundColor: "#AE8E36",
                    borderRadius: 5
                  }}
                />
              </View>
              <View style={{ alignSelf: "flex-start", padding: 15 }}>
                <Text>Daftar Polis Jatuh Tempo</Text>
              </View>

              <FlatList
                data={this.state.data}
                style={{ width: "100%", marginTop: 15 }}
                ItemSeparatorComponent={this.renderSeparator}
                keyExtractor={item => item.COB}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 15,
                        marginTop: 15,
                        flexDirection: "row"
                      }}
                    >
                      <View style={{ flex: 2, paddingLeft: 20 }}>
                        <Text>COB</Text>
                        <Text>Total Polis</Text>
                      </View>

                      <View style={{ flex: 2 }}>
                        <Text>{item.COB}</Text>
                        <NumberFormat
                          value={item.POLICY}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={value => <Text>{value}</Text>}
                        />
                      </View>

                      <View style={{ flex: 1 }}>
                        <Icon
                          name="chevron-right"
                          color="#AE8E36"
                          size={30}
                          onPress={() => {
                            this.onExpiryPolicyCOBPress(item.COB_CODE);
                          }}
                        />
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
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
export default connect(mapStateToProps)(PolisJatuhTempo);
