import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  Alert
} from "react-native";
import Button from "../components/Button";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import Input from "../components/Input";
import Pickers from "../components/Pickers";
import EStyleSheet from "react-native-extended-stylesheet";
import { Constants } from "../utils/Constants";
import CheckBox from "@react-native-community/checkbox";
import RadioGroup from "react-native-radio-buttons-group";
import { PremiumCalculationService } from "../services/PremiumCalculationService";
import Loader from "../components/Loader";
import Modal from "react-native-modal";
import NumberFormat from "react-number-format";

// create a component
class Simulasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isModalVisible: false,
      tanggalEfektif: moment(new Date()).format("YYYY-MM-DD"),
      premi: "",
      materai: "",
      biayaPolis: "",
      kodeKendaraan: "",
      merk: "",
      model: "",
      subModel: "",
      tahunBuat: "",
      nomorPlat: "",
      tenor: "1",
      paket: "COMON",
      hargaPertanggungan: "",
      mainCoverage: "1",
      pilihanTenor: [
        {
          label: "1 Tahun",
          value: "1"
        },
        {
          label: "2 Tahun",
          value: "2"
        },
        {
          label: "3 Tahun",
          value: "3"
        },
        {
          label: "4 Tahun",
          value: "4"
        },
        {
          label: "5 Tahun",
          value: "5"
        }
      ],
      pilihanPaket: [
        {
          label: "COMPREHENSIVE + TPL",
          value: "COMON"
        },
        {
          label: "COMPREHENSIVE + AOG + RSCCTS + TPL",
          value: "COMPL"
        },
        {
          label: "TLO ONLY",
          value: "TPLON"
        }
      ],
      pilihanCoverage: [
        {
          value: "1",
          label: "Comprehensive",
          color: "#fff"
        },
        {
          value: "0",
          label: "Total lost Only",
          color: "#fff"
        }
      ],
      eqCoverage: {
        checked: false,
        value: ""
      },
      rsccCoverage: {
        checked: false,
        value: ""
      },
      stfwdCoverage: {
        checked: false,
        value: ""
      },
      tsCoverage: {
        checked: false,
        value: ""
      },
      tplCoverage: {
        checked: false,
        value: ""
      },
      baCoverage: {
        checked: false,
        value: ""
      }
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const item = navigation.getParam("item");
    this.setState({
      kodeKendaraan: item.code,
      merk: item.vehicle_merk,
      model: item.vehicle_model,
      subModel: item.description
    });
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onHitungPremi = async () => {
     
    
    const {
      kodeKendaraan,
      tahunBuat,
      nomorPlat,
      tanggalEfektif,
      tenor,
      hargaPertanggungan,
      paket,
      mainCoverage,
      eqCoverage,
      stfwdCoverage,
      rsccCoverage,
      tsCoverage,
      tplCoverage,
      baCoverage
    } = this.state;

    const plat = nomorPlat.split("-")
    if(plat.length === 3){
      this.setState({
        loading: true
      });
      const data = {
        package: paket,
        vehicle_code: kodeKendaraan,
        plat_no: plat[0],
        tsi: hargaPertanggungan,
        tenor: tenor,
        manufacture_year: tahunBuat,
        effective_date: tanggalEfektif,
        main_coverage: mainCoverage,
        eq_coverage: eqCoverage.value,
        stfwd_coverage: stfwdCoverage.value,
        rscc_coverage: rsccCoverage.value,
        ts_coverage: tsCoverage.value,
        tpl_coverage: tplCoverage.value,
        ba_coverage: baCoverage.value
      };
      console.log(data);
      const hitungPremi = await PremiumCalculationService(data);
      this.setState({
        loading: false
      });
  
      if (hitungPremi.status === "SUCCESS") {
        let premi = 0;
        let materai = 0;
        let biayaPolis = 0;
  
        hitungPremi.data.map(data => {
          if (data.YEARS !== 0) {
            premi += data.PREMIUM_AMMOUNT;
          } else {
            materai += data.COVERAGE_CODE === "stamp" ? data.PREMIUM_AMMOUNT : 0;
            biayaPolis +=
              data.COVERAGE_CODE === "cost" ? data.PREMIUM_AMMOUNT : 0;
          }
        });
  
        this.setState({
          premi,
          materai,
          biayaPolis
        });
  
        this.toggleModal();
        console.log(hitungPremi.data);
      } else {
        Alert.alert("Error", hitungPremi.message);
      }
    }
    else {
      Alert.alert("Info", "Format nomor kendaraan salah. Contoh: B-1234-ABC");
    }
    
  };

  onRadioButtonPress = data => {
    this.setState({ pilihanCoverage: data });
    let selectedButton = this.state.pilihanCoverage.find(
      e => e.selected == true
    );
    selectedButton = selectedButton
      ? selectedButton.value
      : this.state.pilihanCoverage[0].label;

    this.setState({ mainCoverage: selectedButton });
  };

  onBuatPenawaranPress = () => {
    this.toggleModal();
    const {
      kodeKendaraan,
      tahunBuat,
      nomorPlat,
      tanggalEfektif,
      tenor,
      hargaPertanggungan,
      paket,
      merk,
      model,
      subModel,
      mainCoverage,
      eqCoverage,
      stfwdCoverage,
      rsccCoverage,
      tsCoverage,
      tplCoverage,
      baCoverage
    } = this.state;
    const dataSimulasi = {
      kodeKendaraan,
      tahunBuat,
      nomorPlat,
      tanggalEfektif,
      tenor,
      hargaPertanggungan,
      paket,
      merk,
      model,
      subModel,
      mainCoverage,
      eqCoverage,
      stfwdCoverage,
      rsccCoverage,
      tsCoverage,
      tplCoverage,
      baCoverage
    };

    this.props.navigation.navigate("Buat Penawaran", { dataSimulasi });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Loader loading={this.state.loading} />
          <View
            style={{ alignSelf: "flex-start", paddingLeft: 40, paddingTop: 40 }}
          >
            <Text style={styles.textTitle}>Data Kendaraan</Text>
          </View>
          <View
            style={{
              alignSelf: "flex-start",
              paddingLeft: 40,
              paddingTop: 21,
              paddingBottom: 5
            }}
          >
            <Text style={styles.textLabel}>Merk</Text>
          </View>
          <View style={styles.component}>
            <Input value={this.state.merk} editable={false} />
          </View>
          <View
            style={{
              alignSelf: "flex-start",
              paddingLeft: 40,
              paddingBottom: 5,
              paddingTop: 15
            }}
          >
            <Text style={styles.textLabel}>Model</Text>
          </View>
          <View style={styles.component}>
            <Input value={this.state.model} editable={false} />
          </View>
          <View
            style={{
              alignSelf: "flex-start",
              paddingLeft: 40,
              paddingBottom: 5,
              paddingTop: 15
            }}
          >
            <Text style={styles.textLabel}>Sub Model</Text>
          </View>
          <View style={styles.component}>
            <Input value={this.state.subModel} editable={false} />
          </View>

          <View
            style={{
              alignSelf: "flex-start",
              paddingLeft: 40,
              paddingBottom: 5,
              paddingTop: 15
            }}
          >
            <Text style={styles.textLabel}>Tahun Buat</Text>
          </View>
          <View style={styles.component}>
            <Input
              onChangeText={value => {
                this.setState({ tahunBuat: value });
              }}
              keyboardType="numeric"
            />
          </View>

          <View
            style={{
              alignSelf: "flex-start",
              paddingLeft: 40,
              paddingBottom: 5,
              paddingTop: 15
            }}
          >
            <Text style={styles.textLabel}>Nomor Kendaraan</Text>
          </View>
          <View style={styles.component}>
            <Input
              onChangeText={value => {
                this.setState({ nomorPlat: value });
              }}
              placeholder="B-1234-HYK"
            />
          </View>
          <View
            style={{ alignSelf: "flex-start", paddingLeft: 40, paddingTop: 40 }}
          >
            <Text style={styles.textTitle}>Paket Asuransi</Text>
          </View>

          <View
            style={{
              alignSelf: "flex-start",
              paddingLeft: 40,
              paddingBottom: 5,
              paddingTop: 15
            }}
          >
            <Text style={styles.textLabel}>Tanggal Efektif</Text>
          </View>
          <View style={styles.component}>
            <DatePicker
              style={styles.datePicker}
              customStyles={{
                dateInput: {
                  borderRadius: 5,
                  borderColor: "white",
                  backgroundColor: "white",
                  padding: 7
                  //marginBottom: 20
                }
              }}
              date={this.state.tanggalEfektif} //initial date from state
              mode="date" //The enum of date, datetime and time
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={date => {
                this.setState({ tanggalEfektif: date });
              }}
            />
          </View>

          <View
            style={{
              alignSelf: "flex-start",
              paddingLeft: 40,
              paddingBottom: 5,
              paddingTop: 15
            }}
          >
            <Text style={styles.textLabel}>Tenor</Text>
          </View>
          <View style={styles.component}>
            <Pickers
              pStyle={{ flex: 1 }}
              selectedValue={this.state.tenor}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ tenor: itemValue })
              }
              List={this.state.pilihanTenor}
            />
          </View>

          <View
            style={{
              alignSelf: "flex-start",
              paddingLeft: 40,
              paddingBottom: 5,
              paddingTop: 15
            }}
          >
            <Text style={styles.textLabel}>Harga Pertanggungan</Text>
          </View>
          <View style={styles.component}>
            <Input
              onChangeText={value => {
                this.setState({ hargaPertanggungan: value });
              }}
              keyboardType="numeric"
            />
          </View>

          <View
            style={{
              alignSelf: "flex-start",
              paddingLeft: 40,
              paddingBottom: 5,
              paddingTop: 15
            }}
          >
            <Text style={styles.textLabel}>Paket</Text>
          </View>
          <View style={styles.component}>
            <Pickers
              pStyle={{ flex: 1 }}
              selectedValue={this.state.paket}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ paket: itemValue })
              }
              List={this.state.pilihanPaket}
            />
          </View>

          <View
            style={{
              alignSelf: "flex-start",
              paddingLeft: 40,
              paddingBottom: 5,
              paddingTop: 15
            }}
          >
            <Text style={styles.textLabel}>Main Coverage</Text>
          </View>
          <View style={styles.component}>
            <RadioGroup
              radioButtons={this.state.pilihanCoverage}
              onPress={this.onRadioButtonPress}
              flexDirection="row"
            />
          </View>

          <View
            style={{
              alignSelf: "flex-start",
              paddingLeft: 40,
              paddingBottom: 5,
              paddingTop: 15
            }}
          >
            <Text style={styles.textLabel}>Additional Coverage</Text>
          </View>
          <View
            style={[
              styles.component,
              { flexDirection: "row", alignItems: "center" }
            ]}
          >
            <View style={{ flex: 2 }}>
              <Text style={styles.textLabel}>Earthquake</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              {/* <CheckBox
                checked={this.state.eqCoverage.checked}
                onPress={() =>
                  this.setState({
                    eqCoverage: {
                      checked: !this.state.eqCoverage.checked,
                      value: "58"
                    }
                  })
                }
              /> */}
              <CheckBox
                value={this.state.eqCoverage.checked}
                onValueChange={() =>
                  this.setState({
                    eqCoverage: {
                      checked: !this.state.eqCoverage.checked,
                      value: "58"
                    }
                  })
                }
                tintColors={{ true: "#fff", false: "#fff" }}
              />
            </View>
          </View>

          <View
            style={[
              styles.component,
              { flexDirection: "row", alignItems: "center" }
            ]}
          >
            <View style={{ flex: 2 }}>
              <Text style={styles.textLabel}>
                Storm, Typhoon, Flood and Water Damage (STFWD)
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
            {/* <CheckBox
                checked={this.state.stfwdCoverage.checked}
                onPress={() =>
                  this.setState({
                    stfwdCoverage: {
                      checked: !this.state.stfwdCoverage.checked,
                      value: "58"
                    }
                  })
                }
              /> */}
              <CheckBox
                value={this.state.stfwdCoverage.checked}
                onValueChange={() =>
                  this.setState({
                    stfwdCoverage: {
                      checked: !this.state.stfwdCoverage.checked,
                      value: "59"
                    }
                  })
                }
                tintColors={{ true: "#fff", false: "#fff" }}
              />
            </View>
          </View>

          <View
            style={[
              styles.component,
              { flexDirection: "row", alignItems: "center" }
            ]}
          >
            <View style={{ flex: 2 }}>
              <Text style={styles.textLabel}>
                Riot, Strike and Civil Commotion (RSCC)
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
            {/* <CheckBox
                checked={this.state.rsccCoverage.checked}
                onPress={() =>
                  this.setState({
                    rsccCoverage: {
                      checked: !this.state.rsccCoverage.checked,
                      value: "58"
                    }
                  })
                }
              /> */}
              <CheckBox
                value={this.state.rsccCoverage.checked}
                onValueChange={() =>
                  this.setState({
                    rsccCoverage: {
                      checked: !this.state.rsccCoverage.checked,
                      value: "63"
                    }
                  })
                }
                tintColors={{ true: "#fff", false: "#fff" }}
              />
            </View>
          </View>

          <View
            style={[
              styles.component,
              { flexDirection: "row", alignItems: "center" }
            ]}
          >
            <View style={{ flex: 2 }}>
              <Text style={styles.textLabel}>Terrorism and Sabotage (TS)</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
            {/* <CheckBox
                checked={this.state.tsCoverage.checked}
                onPress={() =>
                  this.setState({
                    tsCoverage: {
                      checked: !this.state.tsCoverage.checked,
                      value: "58"
                    }
                  })
                }
              /> */}
              <CheckBox
                value={this.state.tsCoverage.checked}
                onValueChange={() =>
                  this.setState({
                    tsCoverage: {
                      checked: !this.state.tsCoverage.checked,
                      value: "65"
                    }
                  })
                }
                tintColors={{ true: "#fff", false: "#fff" }}
              />
            </View>
          </View>

          <View
            style={[
              styles.component,
              { flexDirection: "row", alignItems: "center" }
            ]}
          >
            <View style={{ flex: 2 }}>
              <Text style={styles.textLabel}>Third Party Liability (TPL)</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
            {/* <CheckBox
                checked={this.state.tplCoverage.checked}
                onPress={() =>
                  this.setState({
                    tplCoverage: {
                      checked: !this.state.tplCoverage.checked,
                      value: "58"
                    }
                  })
                }
              /> */}
              <CheckBox
                value={this.state.tplCoverage.checked}
                onValueChange={() =>
                  this.setState({
                    tplCoverage: {
                      checked: !this.state.tplCoverage.checked,
                      value: "9"
                    }
                  })
                }
                tintColors={{ true: "#fff", false: "#fff" }}
              />
            </View>
          </View>

          <View
            style={[
              styles.component,
              { flexDirection: "row", alignItems: "center" }
            ]}
          >
            <View style={{ flex: 2 }}>
              <Text style={styles.textLabel}>Bengkel Authorized</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
            {/* <CheckBox
                checked={this.state.baCoverage.checked}
                onPress={() =>
                  this.setState({
                    baCoverage: {
                      checked: !this.state.baCoverage.checked,
                      value: "58"
                    }
                  })
                }
              /> */}
              <CheckBox
                value={this.state.baCoverage.checked}
                onValueChange={() =>
                  this.setState({
                    baCoverage: {
                      checked: !this.state.baCoverage.checked,
                      value: "AW01"
                    }
                  })
                }
                tintColors={{ true: "#fff", false: "#fff" }}
              />
            </View>
          </View>

          <View style={[styles.component, { marginBottom: 30 }]}>
            <Button onPress={() => this.onHitungPremi()}>HITUNG PREMI</Button>
          </View>
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
                <Text style={{ flex: 1 }}>Hasil Hitung Premi</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                  paddingTop: 30
                }}
              >
                <Text style={{ flex: 1 }}>Premi</Text>
                <NumberFormat
                  value={this.state.premi}
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
                  marginBottom: 10
                }}
              >
                <Text style={{ flex: 1 }}>Materai</Text>
                <NumberFormat
                  value={this.state.materai}
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
                  marginBottom: 10
                }}
              >
                <Text style={{ flex: 1 }}>Biaya Polis</Text>
                <NumberFormat
                  value={this.state.biayaPolis}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={value => (
                    <Text style={{ flex: 2 }}>: {value}</Text>
                  )}
                />
              </View>
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: "red"
                }}
              >
                <Button onPress={() => this.onBuatPenawaranPress()}>
                  BUAT PENAWARAN
                </Button>
              </View>
              {/* <Text>Premi : {this.state.premi}</Text>
              <Text>Materai : {this.state.materai}</Text>
              <Text>Biata Polis : {this.state.biayaPolis}</Text> */}
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#06397B",
    alignItems: "center"
  },
  textTitle: {
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold"
  },
  textLabel: {
    color: "#fff",
    fontSize: "0.8rem"
  },
  component: {
    paddingLeft: 35,
    paddingRight: 35,
    width: "100%"
  },
  datePicker: {
    // alignSelf: "stretch"
    width: Dimensions.get("window").width - 70
    // marginLeft: 5,
    // marginRight: 5
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
    height: Dimensions.get("window").height / 2
  },
  modalContainer: {
    flex: 1,
    alignItems: "center"
  }
});
//make this component available to the app
export default Simulasi;
