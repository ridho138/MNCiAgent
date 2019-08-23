import React from "react";
import { View, Image } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

import Header from "../components/Header";
import Login from "../components/Login"

const AppStackNavigator = createStackNavigator(
  {
    Home: {
      screen: Header,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: "white"
        },
        headerLeft: (
          <Image
            resizeMode="contain"
            style={{ marginLeft: 15, position: "absolute", width: 150, height: 80 }}
            source={require("../images/logo-gold.png")}
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
              // onPress={() => navigation.navigate('Notification')}
            />
          </View>
        )
      })
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const routeName = navigation.state.routeName;
      if (routeName != "Home") {
        return {
          headerTitle: routeName,
          headerStyle: {
            backgroundColor: "#06397B"
          },
          headerTintColor: "#fff",
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
