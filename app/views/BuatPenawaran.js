import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  Alert,
  Image
} from "react-native";
import Button from "../components/Button";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import EStyleSheet from "react-native-extended-stylesheet";
import { Constants } from "../utils/Constants";
import { AddQuotationService } from "../services/AddQuotationService";
import { UploadImageService } from "../services/UploadImageService";
import Loader from "../components/Loader";
import ImagePicker from "react-native-image-picker";

// create a component
class BuatPenawaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refId: "",
      tanggalFaktur: moment(new Date()).format("YYYY-MM-DD"),
      namaTertanggung: "",
      alamatTertanggung: "",
      telpTertanggung: "",
      emailTertanggung: "",
      namaSTNK: "",
      nomorMesin: "",
      nomorRangka: "",
      peralatanTambahan: "",
      kodeKendaraan: "",
      tahunBuat: "",
      nomorPlat: "",
      tanggalEfektif: "",
      tenor: "",
      hargaPertanggungan: "",
      paket: "",
      merk: "",
      model: "",
      subModel: "",
      avatarSource: "",
      imageList: [],
      title: [],
      description: [],
      jenisFoto: "",
      keterangan: ""
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const dataSimulasi = navigation.getParam("dataSimulasi");
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
      subModel
    } = dataSimulasi;

    this.setState({
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
      refId:
        moment(new Date()).format("YYMMDDhhmmss") +
        "" +
        Math.floor(Math.random() * 100) +
        1
    });
  };

  onKirimPenawaranPress = async () => {
    this.setState({
      loading: true
    });

    const {
      namaTertanggung,
      alamatTertanggung,
      tanggalEfektif,
      kodeKendaraan,
      nomorPlat,
      tahunBuat,
      namaSTNK,
      nomorMesin,
      nomorRangka,
      paket,
      hargaPertanggungan,
      peralatanTambahan,
      tanggalFaktur,
      tenor,
      refId
    } = this.state;

    const dataPenawaran = {
      lob_code: "MV",
      tob_code: "MV",
      sob_code: "AGENT",
      insured_name: namaTertanggung,
      insured_address: alamatTertanggung,
      eff_date: tanggalEfektif,
      vehicle_merk_code: "3rds3ds3",
      vehicle_model_code: "s3drs3s",
      vehicle_code: kodeKendaraan,
      color: "color",
      plat_no: nomorPlat,
      center_license_no: "sdr3s34",
      sub_license_no: "4rr",
      manufacture_year: tahunBuat,
      stnk_name: namaSTNK,
      functional: "r43esx",
      engine_no: nomorMesin,
      chassis_no: nomorRangka,
      paket,
      tsi: hargaPertanggungan,
      additional: peralatanTambahan,
      interest_insured: "ser4w3sd",
      faktur_date: tanggalFaktur,
      tenor,
      vehicle_desc: "sd43sw34ss",
      premi: "50000000",
      policy_cost: "20000",
      stamp: "12000",
      refId
    };

    const kirimPenawaran = await AddQuotationService(dataPenawaran);

    if (kirimPenawaran.status === "SUCCESS") {
      this.onKirimGambar();

      // Alert.alert(
      //   "INFO",
      //   "Penawaran anda telah berhasil dikirim.",
      //   [
      //     {
      //       text: "OK",
      //       onPress: () => this.props.navigation.navigate("Penawaran")
      //     }
      //   ],
      //   { cancelable: false }
      // );
    } else {
      this.setState({
        loading: false
      });
      Alert.alert("Error", kirimPenawaran.message);
    }
  };

  onKirimGambar = () => {
    const promises = []; //here will be kept all returned promises

    this.state.imageList.map((data, i) => {
      //loop though something
      //call the asynchronous method and store the promise
      const dataImage = {
        refId: this.state.refId,
        title: this.state.title[i],
        description: this.state.description[i],
        size: data.fileSize,
        image: data.data
      };
      const kirimGambar = UploadImageService(dataImage);
      console.log(dataImage);
      console.log(kirimGambar);
      promises.push(kirimGambar);
    });
    Promise.all(promises).then(() => {
      //When all promises are donde, this code is executed;
      console.log("yaaay!");
      this.setState({
        loading: false
      });
      Alert.alert(
        "INFO",
        "Penawaran anda telah berhasil dikirim.",
        [
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("Penawaran")
          }
        ],
        { cancelable: false }
      );
    });
  };

  onUnggahPress = () => {
    const options = {
      title: "Select Photo",
      storageOptions: {
        skipBackup: true,
        path: "Agent",
        cameraRoll: true,
        waitUntilSaved: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      // console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: "data:image/jpeg;base64," + response.data };
        // console.log(source);
        this.state.imageList.push(response);
        this.state.title.push(this.state.jenisFoto);
        this.state.description.push(this.state.keterangan);
        this.setState({ jenisFoto: "", keterangan: "" });
        // this.setState(state => {
        //   const imageList = state.imageList.push(response);
        //   return {
        //     imageList
        //   };
        // });
      }
    });
    // console.log(JSON.stringify(this.state.imageList));
    // JSON.stringify(this.state.imageList)
  };

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <ScrollView>
          <View style={styles.formContainer}>
            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.title}>DATA TERGANTUNG</Text>
            </View>
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Nama Tertanggung</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.namaTertanggung}
              onChangeText={value => {
                this.setState({ namaTertanggung: value });
              }}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Alamat</Text>
            </View>
            <TextInput
              style={styles.inputLong}
              underlineColorAndroid="transparent"
              value={this.state.alamatTertanggung}
              onChangeText={value => {
                this.setState({ alamatTertanggung: value });
              }}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Nomor Telepon</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              value={this.state.telpTertanggung}
              onChangeText={value => {
                this.setState({ telpTertanggung: value });
              }}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Email</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.emailTertanggung}
              onChangeText={value => {
                this.setState({ emailTertanggung: value });
              }}
            />

            <View style={{ padding: 5, flexDirection: "row", marginTop: 30 }}>
              <Text style={styles.title}>DAFTAR KENDARAAN</Text>
            </View>
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Merk</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.merk}
              editable={false}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Model</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.model}
              editable={false}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>SubModel</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.subModel}
              editable={false}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Tahun Buat</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.tahunBuat}
              editable={false}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Nama STNK</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.namaSTNK}
              onChangeText={value => {
                this.setState({ namaSTNK: value });
              }}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Nomor Mesin</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.nomorMesin}
              onChangeText={value => {
                this.setState({ nomorMesin: value });
              }}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Nomor Rangka</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.nomorRangka}
              onChangeText={value => {
                this.setState({ nomorRangka: value });
              }}
            />
            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.textDate}>Tanggal Faktur</Text>
            </View>
            <View>
              <DatePicker
                style={styles.datePicker}
                customStyles={{
                  dateInput: {
                    borderRadius: 5,
                    borderColor: "white",
                    backgroundColor: "white",
                    marginBottom: 20
                  }
                }}
                date={this.state.tanggalFaktur} //initial date from state
                mode="date" //The enum of date, datetime and time
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={date => {
                  this.setState({ tanggalFaktur: date });
                }}
              />
            </View>
            <View style={{ padding: 3, flexDirection: "row", marginTop: 5 }}>
              <Text style={styles.Text}>Peralatan Tambahan</Text>
            </View>
            <TextInput
              style={styles.inputLong}
              multiline={true}
              value={this.state.peralatanTambahan}
              onChangeText={value => {
                this.setState({ peralatanTambahan: value });
              }}
            />

            <View style={{ padding: 5, flexDirection: "row", marginTop: 30 }}>
              <Text style={styles.title}>PAKET ASURANSI</Text>
            </View>
            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.textDate}>Tanggal Efektif</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.tanggalEfektif}
              editable={false}
            />
            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.textDate}>Tenor</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.tenor}
              editable={false}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Paket</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.paket}
              editable={false}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Harga Pertanggungan</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.hargaPertanggungan}
              editable={false}
            />

            <View style={styles.viewForm}>
              <Text style={styles.title}>UNGGAH FOTO</Text>
            </View>
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Jenis Foto</Text>
            </View>
            <TextInput
              value={this.state.jenisFoto}
              style={styles.input}
              underlineColorAndroid="transparent"
              onChangeText={value => {
                this.setState({ jenisFoto: value });
              }}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Keterangan</Text>
            </View>
            <TextInput
              value={this.state.keterangan}
              style={styles.input}
              underlineColorAndroid="transparent"
              multiline={true}
              onChangeText={value => {
                this.setState({ keterangan: value });
              }}
            />

            <Button onPress={() => this.onUnggahPress()}>UNGGAH</Button>
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", padding: 5 }}
            >
              {this.state.imageList.map(item => {
                return (
                  <Image
                    source={{ uri: item.uri }}
                    style={{ width: 50, height: 50 }}
                  />
                );
              })}
              {/* <Image
                    source={{ uri: this.state.avatarSource.uri }}
                    style={{ width: 50, height: 50 }}
                  /> */}
            </View>

            <Button onPress={() => this.onKirimPenawaranPress()}>
              KIRIM PENAWARAN
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#06397B"
  },
  formContainer: {
    flex: 2,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  title: {
    color: "white",
    fontSize: 14,
    textAlign: "left",
    flex: 1,
    fontWeight: "bold"
  },
  input: {
    width: Dimensions.get("window").width - 50,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5
  },
  Text: {
    color: "white",
    fontSize: 12,
    textAlign: "left",
    flex: 1
  },
  Text2: {
    color: "red",
    fontSize: 11,
    textAlign: "right",
    flex: 1
  },
  inputLong: {
    backgroundColor: "#fff",
    color: "#06397B",
    borderRadius: 5,
    width: 310,
    height: 120,
    marginBottom: 10
  },
  datePicker: {
    width: Dimensions.get("window").width - 50,
    marginLeft: 5,
    marginRight: 5
  },
  textDate: {
    color: "white",
    fontSize: 12,
    textAlign: "left",
    flex: 1,
    marginBottom: 8
  },
  viewForm: {
    padding: 3,
    flexDirection: "row",
    marginTop: 3
  }
});

//make this component available to the app
export default BuatPenawaran;
