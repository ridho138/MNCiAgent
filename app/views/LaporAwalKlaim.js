import React, {Component} from 'react';
import {View, Text, Alert, Dimensions, FlatList} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import {connect} from 'react-redux';
import {setModalMenu} from '../actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import {LicenseCheckExistService} from '../services/LicenseCheckExistService';
import Loader from '../components/Loader';
import {Constants} from '../utils/Constants';
import {getData} from '../utils/Utils';

// create a component
class LaporAwalKlaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      nama: '',
      nomorKendaraan: '',
    };
  }

  componentDidMount = async () => {
    this.props.dispatch(setModalMenu(false));
    const {KEY_DATA_USER} = Constants;
    const {username, profile} = await getData(KEY_DATA_USER);
    this.setState({
      email: username,
      nama: profile.NAME,
    });
  };

  onSendPress = async () => {
    const {nomorKendaraan, email, nama} = this.state;
    if (nomorKendaraan !== '') {
      const plat = nomorKendaraan.split('-');
      if (plat.length === 3) {
        this.setState({
          loading: true,
        });
        const licenseCheck = await LicenseCheckExistService(nomorKendaraan);

        this.setState({
          loading: false,
        });

        if (licenseCheck.status === 'SUCCESS') {
          //Alert.alert("Info", JSON.stringify(licenseCheck.data));
          const {POLICY_NO, INTEREST_INSURED} = licenseCheck.data[0];
          this.props.navigation.navigate('Pelapor Klaim', {
            policy_no: POLICY_NO,
            license_no: nomorKendaraan,
            interest_insured: INTEREST_INSURED,
            email,
            nama,
          });
        } else {
          Alert.alert('Info', licenseCheck.message);
        }
      } else {
        Alert.alert('Info', 'Format nomor kendaraan salah. Contoh: B-1234-ABC');
      }
    } else {
      Alert.alert('Info', 'Nomor kendaraan tidak boleh kosong.');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <View
          style={{alignSelf: 'flex-start', paddingLeft: 40, paddingTop: 40}}>
          <Text style={styles.textTitle}>Laporan Awal</Text>
        </View>
        <View
          style={{
            alignSelf: 'flex-start',
            paddingLeft: 40,
            paddingTop: 21,
            paddingBottom: 5,
          }}>
          <Text style={styles.textLabel}>Email</Text>
        </View>
        <View style={styles.component}>
          <Input
            value={this.state.email}
            onChangeText={value => this.setState({email: value})}
            editable={false}
          />
        </View>
        <View
          style={{
            alignSelf: 'flex-start',
            paddingLeft: 40,
            paddingBottom: 5,
            paddingTop: 15,
          }}>
          <Text style={styles.textLabel}>Nama Pelapor</Text>
        </View>
        <View style={styles.component}>
          <Input
            value={this.state.nama}
            onChangeText={value => this.setState({nama: value})}
            editable={false}
          />
        </View>
        <View
          style={{
            alignSelf: 'flex-start',
            paddingLeft: 40,
            paddingBottom: 5,
            paddingTop: 15,
          }}>
          <Text style={styles.textLabel}>Nomor Kendaraan</Text>
        </View>
        <View style={styles.component}>
          <Input
            onChangeText={value => {
              this.setState({nomorKendaraan: value});
            }}
            placeholder="B-1234-ABC"
          />
        </View>

        <View style={[styles.component, {marginTop: 30}]}>
          <Button onPress={this.onSendPress}>KIRIM</Button>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06397B',
    alignItems: 'center',
  },
  textTitle: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  textLabel: {
    color: '#fff',
    fontSize: '0.8rem',
  },
  component: {
    paddingLeft: 35,
    paddingRight: 35,
    width: '100%',
  },
});

const mapStateToProps = state => {
  return {
    data: state.dataModalMenu.isOpen,
  };
};

//make this component available to the app
export default connect(mapStateToProps)(LaporAwalKlaim);
