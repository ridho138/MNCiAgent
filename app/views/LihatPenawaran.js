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
  PermissionsAndroid
} from 'react-native';
import Button from '../components/Button';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Constants} from '../utils/Constants';
import Loader from '../components/Loader';
import ImagePicker from 'react-native-image-picker';
import Pdf from 'react-native-pdf';
import {CreateQuotationDocumentService} from '../services/CreateQuotationDocumentService';


// create a component
class LihatPenawaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refId: '',
      tanggalFaktur: '',
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
      dokumen: '',
      qs_no: '',
      warna: '',
      fungsional: '',
    };
  }
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Buat Penawaran (Approved)',
    };
  };
  componentDidMount = () => {
    const {navigation} = this.props;
    const data = navigation.getParam('item');
    console.log(data.TSI);
    this.setState({
      refId: data.REFID,
      tanggalFaktur: data.FAKTUR_DATE,
      namaTertanggung: data.INSURED_NAME,
      alamatTertanggung: data.INSURED_ADDRESS,
      telpTertanggung: data.INSURED_PHONE_NO,
      emailTertanggung: data.INSURED_EMAIL,
      namaSTNK: data.STNK_NAME,
      nomorMesin: data.ENGINE_NUMBER,
      nomorRangka: data.CHASSIS_NUMBER,
      peralatanTambahan: data.ADDITIONAL,
      kodeKendaraan: data.VEHICLE_CODE,
      tahunBuat: data.MANUFACTURE_YEAR,
      nomorPlat: data.PLAT_NO,
      tanggalEfektif: data.EFF_DATE,
      tenor: data.TENOR,
      hargaPertanggungan: data.TSI,
      paket: data.PACKAGE,
      merk: data.VEHICLE_MERK,
      model: data.VEHICLE_MODEL,
      subModel: data.VEHICLE_SUBMODEL,
      dokumen: data.DOKUMEN,
      qs_no: data.QS_NO,
      warna: data.COLOR,
      fungsional: data.FUNCTIONAL,
    });
  };

  onPrintPress = async () => {
    const {dokumen, qs_no} = this.state;
    // console.log(dokumen);
    // const pdfPath = `${RNFS.DocumentDirectoryPath}/${qs_no}.pdf`;
    // const dirs = RNFetchBlob.fs.dirs;

    // const file_path = dirs.DownloadDir + '/' + qs_no + '.pdf';

    if (dokumen !== '' && dokumen !== null) {
      // RNFetchBlob.fs.writeFile(file_path, dokumen, 'base64');
      // RNFS.writeFile(pdfPath, dokumen, 'base64').then(() =>
      //   console.log('Image converted to jpg and saved at ' + pdfPath),
      // );
      // RNFS.writeFile(pdfPath, dokumen, 'base64')
      //   .then(res =>
      //     // console.log('Image converted to jpg and saved at ' + pdfPath + res),
      //     console.log(res)
      //   )
      //   .catch(err => {
      //     console.log(err.message, err.code);
      //   });
      this.props.navigation.navigate('ViewPdf', {dokumen});
    } else {
      this.setState({
        loading: true,
      });
      const print = await CreateQuotationDocumentService(qs_no);
      this.setState({
        loading: false,
      });
      console.log(print);
      if (print.status === 'SUCCESS') {
        // RNFS.writeFile(pdfPath, print.data, 'base64').then(() =>
        //   console.log('Image converted to jpg and saved at ' + pdfPath),
        // );
        // RNFetchBlob.fs.writeFile(file_path, print.data, 'base64');
        this.props.navigation.navigate('ViewPdf', {dokumen: print.data});
      } else {
        Alert.alert('Error', print.message);
      }
    }

    // const source = {uri: `data:application/pdf;base64,${this.state.dokumen}`};
    // console.log(source)
    // return (
    //   <View
    //     style={{
    //       flex: 1,
    //       justifyContent: 'flex-start',
    //       alignItems: 'center',
    //       marginTop: 25,
    //     }}>
    //     <Pdf
    //       source={source}
    //       onLoadComplete={(numberOfPages, filePath) => {
    //         console.log(`number of pages: ${numberOfPages}`);
    //       }}
    //       onPageChanged={(page, numberOfPages) => {
    //         console.log(`current page: ${page}`);
    //       }}
    //       onError={error => {
    //         console.log(error);
    //       }}
    //       style={{
    //         flex: 1,
    //         width: Dimensions.get('window').width,
    //         height: Dimensions.get('window').height,
    //       }}
    //     />
    //   </View>
    // );
  };

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <ScrollView>
          <View style={styles.formContainer}>
            <View style={{padding: 5, flexDirection: 'row'}}>
              <Text style={styles.title}>DATA TERGANTUNG</Text>
            </View>
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Nama Tertanggung</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.namaTertanggung}
              editable={false}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Alamat</Text>
            </View>
            <TextInput
              style={styles.inputLong}
              underlineColorAndroid="transparent"
              value={this.state.alamatTertanggung}
              editable={false}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Nomor Telepon</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              value={this.state.telpTertanggung}
              editable={false}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Email</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.emailTertanggung}
              editable={false}
            />

            <View style={{padding: 5, flexDirection: 'row', marginTop: 30}}>
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
              editable={false}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Nomor Mesin</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.nomorMesin}
              editable={false}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Nomor Rangka</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.nomorRangka}
              editable={false}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Fungsional</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.nomorRangka}
              editable={false}
            />
            <View style={styles.viewForm}>
              <Text style={styles.Text}>Warna</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.nomorRangka}
              editable={false}
            />
            <View style={{padding: 5, flexDirection: 'row'}}>
              <Text style={styles.textDate}>Tanggal Faktur</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                value={this.state.tanggalFaktur}
                editable={false}
              />
            </View>
            <View style={{padding: 3, flexDirection: 'row', marginTop: 5}}>
              <Text style={styles.Text}>Peralatan Tambahan</Text>
            </View>
            <TextInput
              style={styles.inputLong}
              multiline={true}
              value={this.state.peralatanTambahan}
              editable={false}
            />

            <View style={{padding: 5, flexDirection: 'row', marginTop: 30}}>
              <Text style={styles.title}>PAKET ASURANSI</Text>
            </View>
            <View style={{padding: 5, flexDirection: 'row'}}>
              <Text style={styles.textDate}>Tanggal Efektif</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.tanggalEfektif}
              editable={false}
            />
            <View style={{padding: 5, flexDirection: 'row'}}>
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
              value={`${this.state.hargaPertanggungan}`}
              editable={false}
            />

            {/* <View style={styles.viewForm}>
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
                this.setState({jenisFoto: value});
              }}
              editable={false}
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
                this.setState({keterangan: value});
              }}
              editable={false}
            /> */}

            {/* <Button onPress={() => this.onUnggahPress()}>UNGGAH</Button> */}
            {/* <View style={{flexDirection: 'row', flexWrap: 'wrap', padding: 5}}>
              {this.state.imageList.map(item => {
                return (
                  <Image
                    source={{uri: item.uri}}
                    style={{width: 50, height: 50}}
                  />
                );
              })}
            </View> */}

            <Button onPress={() => this.onPrintPress()}>PRINT PENAWARAN</Button>
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
    backgroundColor: '#06397B',
  },
  formContainer: {
    flex: 2,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    color: 'white',
    fontSize: 14,
    textAlign: 'left',
    flex: 1,
    fontWeight: 'bold',
  },
  input: {
    width: Dimensions.get('window').width - 50,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  Text: {
    color: 'white',
    fontSize: 12,
    textAlign: 'left',
    flex: 1,
  },
  Text2: {
    color: 'red',
    fontSize: 11,
    textAlign: 'right',
    flex: 1,
  },
  inputLong: {
    backgroundColor: '#fff',
    color: '#06397B',
    borderRadius: 5,
    width: 310,
    height: 120,
    marginBottom: 10,
  },
  datePicker: {
    width: Dimensions.get('window').width - 50,
    marginLeft: 5,
    marginRight: 5,
  },
  textDate: {
    color: 'white',
    fontSize: 12,
    textAlign: 'left',
    flex: 1,
    marginBottom: 8,
  },
  viewForm: {
    padding: 3,
    flexDirection: 'row',
    marginTop: 3,
  },
});

//make this component available to the app
export default LihatPenawaran;
