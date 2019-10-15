//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import Loader from '../components/Loader';
import Input from '../components/Input';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';
import {getData, toDateWS} from '../utils/Utils';
import {Constants} from '../utils/Constants';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {FirstReportClaimService} from '../services/FirstReportClaimService';

// create a component
class PelaporKlaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      policy_no: '',
      license_no: '',
      interest_insured: '',
      email: '',
      name: '',
      isEditable: false,
      tanggalKejadian: moment().format('DD/MM/YYYY'),
      waktuKejadian: moment().format('HH:mm'),
      nomortelepon: '',
      lokasikejadian: '',
      keterangan: '',
    };
  }

  componentDidMount = async () => {
    const {KEY_DATA_USER} = Constants;
    const {username, profile} = await getData(KEY_DATA_USER);

    const {navigation} = this.props;
    const policy_no = navigation.getParam('policy_no');
    const license_no = navigation.getParam('license_no');
    const interest_insured = navigation.getParam('interest_insured');
    const email = navigation.getParam('email', username);
    const name = navigation.getParam('nama', profile.NAME);

    this.setState({
      policy_no,
      license_no,
      interest_insured,
      email,
      name,
    });
  };

  onSendPress = async () => {
    const {
      interest_insured,
      license_no,
      nomortelepon,
      lokasikejadian,
      keterangan,
      policy_no,
      tanggalKejadian,
      waktuKejadian,
    } = this.state;

    const data = {
      phonenumber: nomortelepon,
      licenseno: license_no,
      policyno: policy_no,
      insuredname: interest_insured,
      lossdate: toDateWS(tanggalKejadian),
      losstime: waktuKejadian,
      lossplace: lokasikejadian,
      lossdescription: keterangan,
    };
    // console.log(data);
    if (
      nomortelepon !== '' &&
      tanggalKejadian !== '' &&
      waktuKejadian !== '' &&
      lokasikejadian !== '' &&
      keterangan !== ''
    ) {
      this.setState({
        loading: true,
      });
      const sendClaimReport = await FirstReportClaimService(data);
      this.setState({
        loading: false,
      });
      if (sendClaimReport.status === 'SUCCESS') {
        Alert.alert(
        "INFO",
        "Lapor klaim telah berhasil dikirim.",
        [
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("Home")
          }
        ],
        { cancelable: false }
      );
      } else {
        Alert.alert('Info', sendClaimReport.message);
      }
    } else {
      Alert.alert('Info', 'Data tidak boleh ada yang kosong.');
    }
  };

  render() {
    return (
      <View
        style={{backgroundColor: '#1A1F61', flex: 1, flexDirection: 'column'}}>
        <Loader loading={this.state.loading} />

        <ScrollView>
          <View style={styles.viewData}>
            <View style={{padding: 5, flexDirection: 'row'}}>
              <Text style={styles.text}>Email</Text>
              <Text style={styles.text2}>{this.state.email}</Text>
            </View>
            <View style={{padding: 5, flexDirection: 'row'}}>
              <Text style={styles.text}>Nama Pelapor</Text>
              <Text style={styles.text2}>{this.state.name}</Text>
            </View>
            <View style={{padding: 5, flexDirection: 'row'}}>
              <Text style={styles.text}>Nomor Kendaraan</Text>
              <Text style={styles.text2}>{this.state.license_no}</Text>
            </View>
            <View style={{padding: 5, flexDirection: 'row'}}>
              <Text style={styles.text}>Nomor Polis</Text>
              <Text style={styles.text2}>{this.state.policy_no}</Text>
            </View>
            <View style={{padding: 5, flexDirection: 'row'}}>
              <Text style={styles.text}>Nama Tertanggung</Text>
              <Text style={styles.text2}>{this.state.interest_insured}</Text>
            </View>
          </View>

          <View style={styles.viewData1}>
            <View style={{padding: 5, flexDirection: 'row'}}>
              <Text style={styles.formtext}>Nomor Telepon</Text>
              <Text style={styles.formtext2}>*Wajib Diisi</Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={value => this.setState({ nomortelepon: value })}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
            />
            <View style={{padding: 5, flexDirection: 'row'}}>
              <Text style={styles.formtext}>Tanggal Kejadian</Text>
              <Text style={styles.formtext2}>*Wajib Diisi</Text>
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
                date={this.state.tanggalKejadian} //initial date from state
                mode="date" //The enum of date, datetime and time
                format="DD/MM/YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={date => {
                  this.setState({tanggalKejadian: date});
                }}
              />
            </View>
            <View style={{padding: 5, flexDirection: 'row', marginTop: 10}}>
              <Text style={styles.formtext}>Waktu Kejadian</Text>
              <Text style={styles.formtext2}>*Wajib Diisi</Text>
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
                date={this.state.waktuKejadian} //initial date from state
                mode="time" //The enum of date, datetime and time
                format="HH:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={date => {
                  this.setState({waktuKejadian: date});
                }}
              />
            </View>
            <View style={{padding: 5, flexDirection: 'row', marginTop: 10}}>
              <Text style={styles.formtext}>Lokasi Kejadian</Text>
              <Text style={styles.formtext2}>*Wajib Diisi</Text>
            </View>
            <TextInput
              style={styles.inputLok}
              onChangeText={value => this.setState({ lokasikejadian: value })}
            />

            <View style={{padding: 5, flexDirection: 'row'}}>
              <Text style={styles.formtext}>Keterangan</Text>
              <Text style={styles.formtext2}>*Wajib Diisi</Text>
            </View>
            <TextInput
              style={styles.inputLok}
              onChangeText={value => this.setState({ keterangan: value })}
            />

            <View style={{marginTop: 20, marginBottom: 20}}>
              <Button onPress={() => this.onSendPress()}>KIRIM</Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  datePicker: {
    width: Dimensions.get('window').width - 50,
    marginLeft: 5,
    marginRight: 5,
  },
  viewData: {
    padding: 23,
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  viewData1: {
    marginLeft: 23,
    marginRight: 23,
    marginBottom: 10,
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
  },
  text: {
    color: 'white',
    fontSize: 12,
    textAlign: 'left',
    flex: 1,
  },
  text2: {
    color: 'white',
    fontSize: 12,
    textAlign: 'left',
    flex: 1,
    fontWeight: 'bold',
  },
  formtext: {
    color: 'white',
    fontSize: 12,
    textAlign: 'left',
    flex: 1,
  },
  formtext2: {
    color: 'red',
    fontSize: 10,
    textAlign: 'right',
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    color: '#06397B',
    borderRadius: 5,
    marginBottom: 10,
  },
  inputLok: {
    backgroundColor: '#fff',
    color: '#06397B',
    borderRadius: 5,
    marginBottom: 10,
    width: 320,
    height: 120,
  },
});

//make this component available to the app
export default PelaporKlaim;
