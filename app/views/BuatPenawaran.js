import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import Button from '../components/Button';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Constants} from '../utils/Constants';
import {AddQuotationService} from '../services/AddQuotationService';
import {UploadImageService} from '../services/UploadImageService';
import Loader from '../components/Loader';
import ImagePicker from 'react-native-image-picker';
import Input from '../components/Input';

// create a component
class BuatPenawaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refId: '',
      tanggalFaktur: moment(new Date()).format('YYYY-MM-DD'),
      namaTertanggung: '',
      alamatTertanggung: '',
      telpTertanggung: '',
      emailTertanggung: '',
      namaSTNK: '',
      nomorMesin: '',
      nomorRangka: '',
      peralatanTambahan: '',
      kodeKendaraan: '',
      tahunBuat: '',
      nomorPlat: '',
      tanggalEfektif: '',
      tenor: '',
      hargaPertanggungan: '',
      paket: '',
      merk: '',
      model: '',
      subModel: '',
      avatarSource: '',
      imageList: [],
      title: [],
      description: [],
      jenisFoto: '',
      keterangan: '',
    };
  }

  componentDidMount = () => {
    const {navigation} = this.props;
    const dataSimulasi = navigation.getParam('dataSimulasi');
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
        moment(new Date()).format('YYMMDDhhmmss') +
        '' +
        Math.floor(Math.random() * 100) +
        1,
    });
  };

  onKirimPenawaranPress = async () => {
    this.setState({
      loading: true,
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
      refId,
    } = this.state;

    const dataPenawaran = {
      lob_code: 'MV',
      tob_code: 'MV',
      sob_code: 'AGENT',
      insured_name: namaTertanggung,
      insured_address: alamatTertanggung,
      eff_date: tanggalEfektif,
      vehicle_merk_code: '3rds3ds3',
      vehicle_model_code: 's3drs3s',
      vehicle_code: kodeKendaraan,
      color: 'color',
      plat_no: nomorPlat,
      center_license_no: 'sdr3s34',
      sub_license_no: '4rr',
      manufacture_year: tahunBuat,
      stnk_name: namaSTNK,
      functional: 'r43esx',
      engine_no: nomorMesin,
      chassis_no: nomorRangka,
      paket,
      tsi: hargaPertanggungan,
      additional: peralatanTambahan,
      interest_insured: 'ser4w3sd',
      faktur_date: tanggalFaktur,
      tenor,
      vehicle_desc: 'sd43sw34ss',
      premi: '50000000',
      policy_cost: '20000',
      stamp: '12000',
      refId,
    };

    const kirimPenawaran = await AddQuotationService(dataPenawaran);

    if (kirimPenawaran.status === 'SUCCESS') {
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
        loading: false,
      });
      Alert.alert('Error', kirimPenawaran.message);
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
        image: data.data,
      };
      const kirimGambar = UploadImageService(dataImage);
      console.log(dataImage);
      console.log(kirimGambar);
      promises.push(kirimGambar);
    });
    Promise.all(promises).then(() => {
      //When all promises are donde, this code is executed;
      console.log('yaaay!');
      this.setState({
        loading: false,
      });
      Alert.alert(
        'INFO',
        'Penawaran anda telah berhasil dikirim.',
        [
          {
            text: 'OK',
            onPress: () => this.props.navigation.navigate('Penawaran'),
          },
        ],
        {cancelable: false},
      );
    });
  };

  onUnggahPress = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'Agent',
        cameraRoll: true,
        waitUntilSaved: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      // console.log("Response = ", response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: "data:image/jpeg;base64," + response.data };
        // console.log(source);
        this.state.imageList.push(response);
        this.state.title.push(this.state.jenisFoto);
        this.state.description.push(this.state.keterangan);
        this.setState({jenisFoto: '', keterangan: ''});
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

  hapusGambar = index => {
    Alert.alert('Konfirmasi', 'Anda yakin ingin menghapus foto ini?', [
      {
        text: 'Tidak',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Ya',
        onPress: () => {
          this.setState({
            imageList: this.state.imageList.filter((_, i) => i !== index),
          });
        },
      },
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <ScrollView>
          <View style={{marginBottom: 5, marginLeft: 5}}>
            <Text style={styles.title}>Data Tertanggung</Text>
          </View>
          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Nama Tertanggung</Text>
          </View>
          <View>
            <Input
              onChangeText={value => {
                this.setState({namaTertanggung: value});
              }}
            />
          </View>
          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Alamat</Text>
          </View>
          <View>
            <Input
              onChangeText={value => {
                this.setState({alamatTertanggung: value});
              }}
              multiline={true}
              tStyle={{height: 100}}
            />
          </View>
          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>No. Telepon</Text>
          </View>
          <View>
            <Input
              onChangeText={value => {
                this.setState({telpTertanggung: value});
              }}
            />
          </View>
          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Email</Text>
          </View>
          <View>
            <Input
              onChangeText={value => {
                this.setState({emailTertanggung: value});
              }}
            />
          </View>

          <View style={{marginBottom: 5, marginTop: 25, marginLeft: 5}}>
            <Text style={styles.title}>Data Kendaraan</Text>
          </View>
          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Merk</Text>
          </View>
          <View>
            <Input value={this.state.merk} editable={false} />
          </View>
          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Model</Text>
          </View>
          <View>
            <Input value={this.state.model} editable={false} />
          </View>
          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Submodel</Text>
          </View>
          <View>
            <Input value={this.state.subModel} editable={false} />
          </View>

          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Tahun Buat</Text>
          </View>
          <View>
            <Input value={this.state.tahunBuat} editable={false} />
          </View>

          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Nama STNK</Text>
          </View>
          <View>
            <Input
              onChangeText={value => {
                this.setState({stnk_name: value});
              }}
            />
          </View>

          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Nomor Mesin</Text>
          </View>
          <View>
            <Input
              onChangeText={value => {
                this.setState({nomorMesin: value});
              }}
            />
          </View>

          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Nomor Rangka</Text>
          </View>
          <View>
            <Input
              onChangeText={value => {
                this.setState({nomorRangka: value});
              }}
            />
          </View>

          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Tanggal Faktur</Text>
          </View>
          <View>
            <DatePicker
              style={styles.datePicker}
              customStyles={{
                dateInput: {
                  borderRadius: 5,
                  borderColor: 'white',
                  backgroundColor: 'white',
                },
              }}
              date={this.state.tanggalFaktur} //initial date from state
              mode="date" //The enum of date, datetime and time
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={date => {
                this.setState({tanggalFaktur: date});
              }}
            />
          </View>

          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Peralatan Tambahan</Text>
          </View>
          <View>
            <Input
              onChangeText={value => {
                this.setState({peralatanTambahan: value});
              }}
              multiline={true}
              tStyle={{height: 100}}
            />
          </View>
          <View style={{marginBottom: 5, marginTop: 25, marginLeft: 5}}>
            <Text style={styles.title}>Paket Asuransi</Text>
          </View>
          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Tanggal Efektif</Text>
          </View>
          <View>
            <Input value={this.state.tanggalEfektif} editable={false} />
          </View>
          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Tenor</Text>
          </View>
          <View>
            <Input value={this.state.tenor} editable={false} />
          </View>

          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Paket</Text>
          </View>
          <View>
            <Input value={this.state.paket} editable={false} />
          </View>

          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Harga Pertanggungan</Text>
          </View>
          <View>
            <Input value={this.state.hargaPertanggungan} editable={false} />
          </View>

          <View style={{marginBottom: 5, marginTop: 25, marginLeft: 5}}>
            <Text style={styles.title}>Unggah Foto</Text>
          </View>
          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Jenis Foto</Text>
          </View>
          <View>
            <Input
              value={this.state.jenisFoto}
              onChangeText={value => {
                this.setState({jenisFoto: value});
              }}
            />
          </View>
          <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
            <Text style={styles.textDate}>Keterangan</Text>
          </View>
          <View>
            <Input
              value={this.state.keterangan}
              onChangeText={value => {
                this.setState({keterangan: value});
              }}
            />
          </View>

          <View style={{marginTop: 30}}>
            <Button onPress={() => this.onUnggahPress()}>UNGGAH FOTO</Button>
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap', padding: 5}}>
            {this.state.imageList.map((item, i) => {
              return (
                <View style={{padding: 10}}>
                  <TouchableOpacity onPress={() => this.hapusGambar(i)}>
                    <Image
                      source={{uri: item.uri}}
                      style={{width: 80, height: 80}}
                    />
                    <View>
                      <Image
                        source={require('../assets/icons/group2.png')}
                        style={{
                          width: 30,
                          height: 30,
                          position: 'absolute',
                          left: 65,
                          top: -15,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <View style={{marginTop: 30}}>
            <Button onPress={() => this.onKirimPenawaranPress()}>KIRIM</Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06397B',
    padding: 35,
  },
  textDate: {
    color: '#fff',
    fontSize: '0.8rem',
  },
  title: {
    color: '#fff',
    fontSize: '1rem',
  },
  datePicker: {
    width: '100%',
  },
});

//make this component available to the app
export default BuatPenawaran;
