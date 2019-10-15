//import liraries
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {setModalMenu} from '../actions';

// create a component
class Pelayanan extends Component {
  componentDidMount() {
    this.props.dispatch(setModalMenu(false));
  }

  render() {
    return (
      <View style={{backgroundColor: '#1A1F61'}}>
        <ScrollView>
          <View style={[styles.ViewDescription, {height: 150}]}>
            <Image
              source={require('../assets/images/total_care.png')}
              // style={{borderWidth: 5, borderColor: "red"}}
              resizeMode="center"
            />
          </View>
          <View style={styles.ViewDescription}>
            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Image
              source={require('../assets/images/thumb.png')}
              // style={{borderWidth: 5, borderColor: "red"}}
              resizeMode="center"
            />
              <Text style={styles.Prosedur}>NEW FOR OLD</Text>
            </View>
            <View>
              <Text style={styles.SubProsedur}>
                Bagi mobil baru* yang mengalami Total Loss Accident pada 8 bulan
                pertama masa pertanggungan diberikan mobil baru**
              </Text>
              <Text style={styles.SubProsedur}>
                *yang termaksuk dalam kategori mobil baru, usia maksimum 1 bulan sejak
                tanggal berlakunya STNK 
              </Text>
              <Text style={styles.SubProsedur}>
                **Pergantian mobil baru adalah sesuai dengan merk dan tipe mobile yang di Asuransikan
              </Text>
            </View>
          </View>
          <View style={styles.ViewDescription}>
            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Image
              source={require('../assets/images/pe.png')}
              // style={{borderWidth: 5, borderColor: "red"}}
              resizeMode="center"
            />
              <Text style={styles.Prosedur}>PERSONAL EFECT</Text>
            </View>
            <View>
            <Text style={styles.SubProsedur}>
                Jaminan ganti rugi maksimum senilai Rp. 2 juta terhadap
                kerusakan atau kehilangan barang pribadi (pengecualian pada
                barang-barang tertentu) yang terdapat dalam kendaraan yang
                dipertanggungkan, yang mengalami Total Loss
              </Text>
            </View>
          </View>
          <View style={styles.ViewDescription}>
            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Image
              source={require('../assets/images/towing.png')}
              // style={{borderWidth: 5, borderColor: "red"}}
              resizeMode="center"
            />
              <Text style={styles.Prosedur}>TOWING CAR</Text>
            </View>
            <View>
            <Text style={styles.SubProsedur}>
                Fasilitas Derek gratis bagi mobil yang mengalami musibah saat
                berkendara atau memberikan pergantian biaya Derek maksimum 0,5%
                dari harga pertanggungan (bagi kendaraan yang mengalami
                kecelakaan) dan maksimal Rp. 300 ribu per kejadian (bagi
                kendaraan yang mengalami kerusakan mesin/mogok)
              </Text>
            </View>
          </View>
          <View style={styles.ViewDescription}>
            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Image
              source={require('../assets/images/ambulance.png')}
              // style={{borderWidth: 5, borderColor: "red"}}
              resizeMode="center"
            />
              <Text style={styles.Prosedur}>AMBULANCE</Text>
            </View>
            <View>
            <Text style={styles.SubProsedur}>
            Fasilitas ambulans gratis bagi pengemudi dan penumpang yang
                berada di dalam kendaraan yang diasuransikan yang diakibatkan
                langsung oleh kecelakaan atau memberikan penggantian biaya
                ambulans maksimum Rp. 300.000.-per kejadian
              </Text>
            </View>
          </View>
          <View style={styles.ViewDescription}>
            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Image
              source={require('../assets/images/pliers.png')}
              // style={{borderWidth: 5, borderColor: "red"}}
              resizeMode="center"
            />
              <Text style={styles.Prosedur}>EMERGENCY ROADSIDE ASSISTANCE</Text>
            </View>
            <View>
            <Text style={styles.SubProsedur}>
            Bantuan perbaikan gratis bagi kendaraan yang mengalami gangguan
                ringan saat berkendara di jalan
              </Text>
            </View>
          </View>
          <View style={styles.ViewDescription}>
            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Image
              source={require('../assets/images/support.png')}
              // style={{borderWidth: 5, borderColor: "red"}}
              resizeMode="center"
            />
              <Text style={styles.Prosedur}>CALL CENTER 24 JAM (1 500 899)</Text>
            </View>
            <View>
            <Text style={styles.SubProsedur}>
            Memiliki Layanan Customer Care 24 Jam mengenai informasi produk,
                Keluhan, Complain, Saran dan Masukan, dll. Anda dapat
                menyampaikan nya 24 jam / 7 hari Nasional
              </Text>
            </View>
          </View>
          </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  ImageStyle: {
    height: 53,
    width: 100,
  },
  ViewImage: {
    flex: 1,
    marginTop: 13,
    marginRight: 10,
  },
  ViewDescription: {
    backgroundColor: 'white',
    // flex: 1,
    marginTop: 22,
    marginLeft: 22,
    marginRight: 22,
    borderRadius: 5,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Number: {
    flex: 1,
    textAlign: 'left',
    color: 'white',
    margin: 5,
  },
  Prosedur: {
    // textAlign: 'left',
    // marginRight: 10,
    // color: 'white',
    fontSize: 15,
    // marginTop: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  SubProsedur: {
    textAlign: 'justify',
    // color: 'white',
    // marginRight: 10,
    fontSize: 12,
    // marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15
  },
});

const mapStateToProps = state => {
  return {
    data: state.dataModalMenu.isOpen,
  };
};

//make this component available to the app
export default connect(mapStateToProps)(Pelayanan);

//make this component available to the app
// export default Pelayanan;
