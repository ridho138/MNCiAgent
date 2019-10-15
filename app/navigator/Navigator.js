import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from '../views/Login';
import Home from '../views/Home_';
import PremiumProduction from '../views/PremiumProduction';
import PolisJatuhTempo from '../views/PolisJatuhTempo';
import PolisJatuhTempoCOB from '../views/PolisJatuhTempoCOB';
import InfoKlaim from '../views/InfoKlaim';
import DaftarInfoKlaim from '../views/DaftarInfoKlaim';
import PremiBelumTerbayar from '../views/PremiBelumTerbayar';
import DaftarPremiBelumTerbayar from '../views/DaftarPremiBelumTerbayar';
import LaporAwalKlaim from '../views/LaporAwalKlaim';
import NewsAnnouncementAll from '../views/NewsAnnouncementAll';
import BeritaDetail from '../views/BeritaDetail';
import Notifikasi from '../views/Notifikasi';
import DaftarPolis from '../views/DaftarPolis';
import Kantor from '../views/Kantor';
import Bengkel from '../views/Bengkel';
import PelaporKlaim from '../views/PelaporKlaim';
import Simulasi from '../views/Simulasi';
import Penawaran from '../views/Penawaran';
import CariKendaraan from '../views/CariKendaraan';
import BuatPenawaran from '../views/BuatPenawaran';
import LupaKataSandi from '../views/LupaKataSandi';
import Pengaturan from '../views/Pengaturan';
import Profil from '../views/Profil';
import UbahProfil from '../views/UbahProfil';
import SplashScreen from '../views/SplashScreen';
import ProsedurKlaim from '../views/ProsedurKlaim';
import Produk from '../views/Produk';
import MncCare from '../views/MncCare';
import LihatPenawaran from '../views/LihatPenawaran';
import ViewPdf from '../views/ViewPdf';
import Pelayanan from '../views/Pelayanan';
import withBadge from '../components/withBadge';

const BadgedIcon = withBadge(1)(Image);

const AppStackNavigator = createStackNavigator(
  {
    // "Lupa Kata Sandi": {
    //   screen: LupaKataSandi
    // },
    Home: {
      screen: Home,
      // navigationOptions: ({navigation}) => ({
      //   headerStyle: {
      //     backgroundColor: 'white',
      //   },
      //   headerLeft: (
      //     <Image
      //       resizeMode="contain"
      //       style={{
      //         marginLeft: 15,
      //         position: 'absolute',
      //         width: 146,
      //         height: 43,
      //       }}
      //       source={require('../assets/images/logo-gold.png')}
      //     />
      //   ),
      //   headerRight: (
      //     <View style={{flex: 1, flexDirection: 'row', paddingRight: 30}}>
      //       <TouchableOpacity onPress={() => navigation.navigate('Pengaturan')}>
      //         <Image
      //           resizeMode="contain"
      //           style={{
      //             //paddingRight: 20,
      //             //position: "absolute",
      //             width: 30,
      //             height: 30,
      //             marginRight: 20,
      //           }}
      //           source={require('../assets/icons/settings.png')}
      //         />
      //       </TouchableOpacity>

      //       <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')}>
      //         <BadgedIcon
      //           resizeMode="contain"
      //           style={{
      //             width: 30,
      //             height: 30,
      //           }}
      //           source={require('../assets/icons/notification.png')}
      //         />
      //         {/* <Image
      //           resizeMode="contain"
      //           style={{
      //             width: 30,
      //             height: 30
      //           }}
      //           source={require("../assets/icons/notification.png")}
      //         /> */}
      //       </TouchableOpacity>
      //     </View>
      //   ),
      // }),
    },
    'Produksi Premi': {
      screen: PremiumProduction,
    },
    'Polis Jatuh Tempo': {
      screen: PolisJatuhTempo,
    },
    'Daftar Polis Jatuh Tempo': {
      screen: PolisJatuhTempoCOB,
    },
    'Info Klaim': {
      screen: InfoKlaim,
    },
    'Daftar Info Klaim': {
      screen: DaftarInfoKlaim,
    },
    'Premi Belum Terbayar': {
      screen: PremiBelumTerbayar,
    },
    'Daftar Premi Belum Terbayar': {
      screen: DaftarPremiBelumTerbayar,
    },
    'Lapor Klaim': {
      screen: LaporAwalKlaim,
    },
    'Berita & Informasi': {
      screen: NewsAnnouncementAll,
    },
    'Berita Detail': {
      screen: BeritaDetail,
      navigationOptions: {
        headerTitle: 'Berita & Informasi',
      },
    },
    Notifikasi: {
      screen: Notifikasi,
    },
    'Daftar Polis': {
      screen: DaftarPolis,
    },
    'Daftar Bengkel': {
      screen: Bengkel,
    },
    Kantor: {
      screen: Kantor,
    },
    'Pelapor Klaim': {
      screen: PelaporKlaim,
    },
    Simulasi: {
      screen: Simulasi,
    },
    Penawaran: {
      screen: Penawaran,
      navigationOptions: ({navigation}) => ({
        headerRight: (
          <View style={{flex: 1, flexDirection: 'row', paddingRight: 30}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Cari Kendaraan')}>
              <Image
                resizeMode="contain"
                style={{
                  //paddingRight: 10,
                  //position: "absolute",
                  width: 30,
                  height: 30,
                }}
                source={require('../assets/icons/plus.png')}
              />
            </TouchableOpacity>
          </View>
        ),
      }),
    },
    'Cari Kendaraan': {
      screen: CariKendaraan,
    },
    'Buat Penawaran': {
      screen: BuatPenawaran,
    },
    Pengaturan: {
      screen: Pengaturan,
    },
    Profil: {
      screen: Profil,
    },
    'Ubah Profil': {
      screen: UbahProfil,
    },
    'Prosedur Klaim': {
      screen: ProsedurKlaim,
    },
    Produk: {
      screen: Produk,
    },
    'MNC Care': {
      screen: MncCare,
    },
    'Lihat Penawaran': {
      screen: LihatPenawaran,
    },
    ViewPdf: {
      screen: ViewPdf,
    },
    Pelayanan: {
      screen: Pelayanan,
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      const routeName = navigation.state.routeName;
      if (routeName != 'Home') {
        return {
          headerTitle: routeName,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#997A2D',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        };
      }
    },
  },
);

const AppStackNavigator2 = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    'Lupa Kata Sandi': {
      screen: LupaKataSandi,
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      const routeName = navigation.state.routeName;
      if (routeName != 'Home') {
        return {
          headerTitle: routeName,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#997A2D',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        };
      }
    },
  },
);

const AppSwitchNavigator = createSwitchNavigator({
  SplashScreen: {screen: SplashScreen},
  LoginScreen: {screen: AppStackNavigator2},
  // Login: { screen: Login },
  // "Lupa Kata Sandi": {
  //   screen: LupaKataSandi
  // },
  Dashboard: {screen: AppStackNavigator},
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;
