import React, {Component} from 'react';
import {View, Text, Alert, Dimensions, FlatList} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import {connect} from 'react-redux';
import {setModalMenu} from '../actions';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import EStyleSheet from 'react-native-extended-stylesheet';
import { toDateWS } from "../utils/Utils"

// create a component
class InfoKlaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dariTanggal: moment(new Date()).format('DD/MM/YYYY'),
      sampaiTanggal: moment(new Date()).format('DD/MM/YYYY'),
      noPlat: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(setModalMenu(false));
  }

  onSearchPress = () => {
    const {dariTanggal, sampaiTanggal, noPlat} = this.state;

    if(dariTanggal && sampaiTanggal && noPlat){
      const plat = noPlat.split('-');
      if (plat.length === 3) {
        this.props.navigation.navigate('Daftar Info Klaim', {
          dariTanggal: toDateWS(dariTanggal),
          sampaiTanggal: toDateWS(sampaiTanggal),
          keyword: noPlat,
        });
      } else {
        Alert.alert('Info', 'Format nomor kendaraan salah. Contoh: B-1234-ABC');
      }
    }else {
      Alert.alert('Info', 'Data tidak boleh ada yang kosong.');
    }
    
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 5, marginLeft: 5}}>
          <Text style={styles.textDate}>Dari Tanggal</Text>
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
            date={this.state.dariTanggal} //initial date from state
            mode="date" //The enum of date, datetime and time
            format="DD/MM/YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={date => {
              this.setState({dariTanggal: date});
            }}
          />
        </View>
        <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
          <Text style={styles.textDate}>Sampai Tanggal</Text>
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
            date={this.state.sampaiTanggal} //initial date from state
            mode="date" //The enum of date, datetime and time
            format="DD/MM/YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={date => {
              this.setState({sampaiTanggal: date});
            }}
          />
        </View>
        <View style={{marginBottom: 5, marginTop: 15, marginLeft: 5}}>
          <Text style={styles.textDate}>No Plat</Text>
        </View>
        <View>
          <Input
            onChangeText={value => {
              this.setState({noPlat: value});
            }}
            placeholder="B-1234-ABC"
          />
        </View>

        <View style={{marginTop: 30}}>
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
    backgroundColor: '#06397B',
    padding: 35,
  },
  textDate: {
    color: '#fff',
    fontSize: '0.8rem',
  },
  datePicker: {
    width: '100%',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  modalContent: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    data: state.dataModalMenu.isOpen,
  };
};

//make this component available to the app
export default connect(mapStateToProps)(InfoKlaim);
