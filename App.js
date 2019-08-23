import React, { Fragment } from "react";
import { Provider } from "react-redux";
import store from "./app/store/Store";
import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Navigator from "./app/navigator/Navigator"

// define REM depending on screen width
const {width} = Dimensions.get('window');
const rem = width > 400 ? 18 : 15;

// calc styles
EStyleSheet.build({
  $rem: rem,
});

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
