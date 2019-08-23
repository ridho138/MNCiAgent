import React from "react";
import { View, Image } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

import Login from "../views/Login"
import Home from "../views/Home"
import PremiumProduction from "../views/PremiumProduction"
import PolisJatuhTempo from "../views/PolisJatuhTempo"
import PolisJatuhTempoCOB from "../views/PolisJatuhTempoCOB"
import InfoKlaim from "../views/InfoKlaim"
import DaftarInfoKlaim from "../views/DaftarInfoKlaim"
import PremiBelumTerbayar from "../views/PremiBelumTerbayar"
import DaftarPremiBelumTerbayar from "../views/DaftarPremiBelumTerbayar"
import LaporAwalKlaim from "../views/LaporAwalKlaim"
import NewsAnnouncementAll from "../views/NewsAnnouncementAll"
import BeritaDetail from "../views/BeritaDetail"
import Notifikasi from "../views/Notifikasi"
import DaftarPolis from "../views/DaftarPolis"
import Kantor from "../views/Kantor"
import Bengkel from "../views/Bengkel"

const AppStackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: "white"
        },
        headerLeft: (
          <Image
            resizeMode="contain"
            style={{ marginLeft: 15, position: "absolute", width: 150, height: 80 }}
            source={require("../assets/images/logo-gold.png")}
          />
        ),
        headerRight: (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Icon
              style={{ paddingRight: 20 }}
              name="cog"
              size={25}
              color="#AE8E36"
              // onPress={() => navigation.navigate('Profile')}
            />
            <Icon
              style={{ paddingRight: 10 }}
              name="bell"
              size={25}
              color="#AE8E36"
              onPress={() => navigation.navigate('Notifikasi')}
            />
          </View>
        )
      })
    },
    "Produksi Premi": {
      screen: PremiumProduction
    },
    "Polis Jatuh Tempo": {
      screen: PolisJatuhTempo
    },
    "Daftar Polis Jatuh Tempo": {
      screen: PolisJatuhTempoCOB
    },
    "Info Klaim": {
      screen: InfoKlaim
    },
    "Daftar Info Klaim": {
      screen: DaftarInfoKlaim
    },
    "Premi Belum Terbayar": {
      screen: PremiBelumTerbayar
    },
    "Daftar Premi Belum Terbayar": {
      screen: DaftarPremiBelumTerbayar
    },
    "Lapor Klaim": {
      screen: LaporAwalKlaim
    },
    "Berita & Informasi": {
      screen: NewsAnnouncementAll
    },
    "Berita Detail": {
      screen: BeritaDetail,
      navigationOptions: {
        headerTitle: "Berita & Informasi"
      }
    },
    "Notifikasi": {
      screen: Notifikasi,
      navigationOptions: {
        headerRight: (
          <View style={{ flex: 1, flexDirection: "row" }}>
            
            <Icon
              style={{ paddingRight: 10 }}
              name="filter"
              size={25}
              color="#AE8E36"
              // onPress={() => navigation.navigate('Notification')}
            />
          </View>
        )
      }
    },
    "Daftar Polis": {
      screen: DaftarPolis
    },
    "Daftar Bengkel": {
      screen: Bengkel
    },
    "Kantor": {
      screen: Kantor
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const routeName = navigation.state.routeName;
      if (routeName != "Home") {
        return {
          headerTitle: routeName,
          headerStyle: {
            backgroundColor: "white"
          },
          headerTintColor: "#997A2D",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        };
      }
    }
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  //SplashScreen: { screen: SplashScreen },
  Login: { screen: Login },
  Dashboard: { screen: AppStackNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;
