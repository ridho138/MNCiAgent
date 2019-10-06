import React, { Component } from "react";
import { View, Text, Alert, Dimensions, FlatList } from "react-native";
import { PremiumProductionService } from "../services/PremiumProductionService";
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

// create a component
class PremiumProduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isModalVisible: false,
      dariTanggal: moment(new Date()).format("YYYY-MM-DD"),
      sampaiTanggal: moment(new Date()).format("YYYY-MM-DD"),
      modalHeight:
        Dimensions.get("window").height / 2 +
        Dimensions.get("window").height / 4,
      data: null,
      sumPremiumProduction: 0,
      sumPolicy: 0
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
      const premiumProduction = await PremiumProductionService(
        dariTanggal,
        sampaiTanggal
      );
      this.setState({
        loading: false
      });

      if (premiumProduction.status === "SUCCESS") {
        let sumPremiumProduction = 0;
        let sumPolicy = 0;
        await premiumProduction.data.map(data => {
          sumPremiumProduction += data.GWP;
          sumPolicy += data.POLICY;
        });
        this.setState({
          data: premiumProduction.data,
          sumPremiumProduction,
          sumPolicy
        });
        this.toggleModal();
      } else {
        Alert.alert("Error", premiumProduction.message);
      }
    } else {
      this.setState({
        loading: false
      });
      Alert.alert("Error", "NIK and/or Password cannot be empty.");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <View style={{ marginBottom: 20, marginLeft: 5 }}>
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
        <View style={{ marginBottom: 5, marginTop: 15, marginLeft: 5 }}>
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

        <View style={{ marginTop: 30 }}>
          <Button
            //bStyle={{ width: Dimensions.get("window").width - 70 }}
            onPress={this.onSendPress}
          >
            KIRIM
          </Button>
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
          <View style={styles.modalContent}>
            <View style={styles.modalContainer}>
              <View>
                <View
                  style={{
                    width: 60,
                    height: 6,
                    backgroundColor: "#997b2e",
                    borderRadius: 5
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                  paddingTop: 30
                }}
              >
                <Text style={{ flex: 1 }}>Total Polis</Text>
                <NumberFormat
                  value={this.state.sumPolicy}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={value => (
                    <Text style={{ flex: 2 }}>: {value}</Text>
                  )}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 40,
                  //paddingLeft: 40
                }}
              >
                <Text style={{ flex: 1 }}>Total GWP</Text>
                <NumberFormat
                  value={this.state.sumPremiumProduction}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp "}
                  renderText={value => (
                    <Text style={{ flex: 2 }}>: {value}</Text>
                  )}
                />
              </View>
              <FlatList
                data={this.state.data}
                style={{ width: "100%" }}
                keyExtractor={item => item.COB}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 15,
                        paddingLeft: 20,
                        //paddingRight: 20
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            flex: 1,
                            textAlign: "left"
                          }}
                        >
                          COB
                        </Text>
                        <Text style={{ flex: 1 }}>{item.COB}</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            flex: 1,
                            textAlign: "left"
                          }}
                        >
                          Total Polis
                        </Text>
                        <NumberFormat
                          value={item.POLICY}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={value => (
                            <Text style={{ flex: 1 }}>{value}</Text>
                          )}
                        />
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            flex: 1,
                            textAlign: "left"
                          }}
                        >
                          Total GWP
                        </Text>
                        <NumberFormat
                          value={item.GWP}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp "}
                          renderText={value => (
                            <Text style={{ flex: 1 }}>{value}</Text>
                          )}
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
    padding: 35
  },
  textTitle: {
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold"
  },
  textDate: {
    color: "#fff",
    fontSize: "0.8rem"
  },
  datePicker: {
    width: Dimensions.get("window").width - 70
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
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 20,
    paddingBottom: 10,
    height:
      Dimensions.get("window").height / 2 + Dimensions.get("window").height / 4
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
export default connect(mapStateToProps)(PremiumProduction);
