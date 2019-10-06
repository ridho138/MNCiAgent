import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView
} from "react-native";
import Button from "../components/Button";
import { getData, toDate } from "../utils/Utils";
import { Constants } from "../utils/Constants";
import { UpdateProfileService } from "../services/UpdateProfileService";
import Loader from "../components/Loader";

// create a component
class UbahProfil extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Button onPress={() => params.onUbahPress()}>Simpan</Button>
        </View>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      namaAgent: "",
      kodeAgent: "",
      periodeKontrak: "",
      periodeAaui: "",
      telpAgent: "",
      email: "",
      loading: false
    };
  }

  componentDidMount = async () => {
    this.props.navigation.setParams({ onUbahPress: this.onUbahPress });
    const { profile } = await getData(Constants.KEY_DATA_USER);
    const {
      NAME,
      EMAIL,
      phonenumber,
      code,
      CONTRACT_END_DATE,
      EXPIRY_CARD_AGENT
    } = profile;

    this.setState({
      namaAgent: NAME,
      kodeAgent: code,
      telpAgent: phonenumber,
      email: EMAIL,
      periodeKontrak: CONTRACT_END_DATE,
      periodeAaui: EXPIRY_CARD_AGENT
    });
  };

  onUbahPress = async () => {
    this.setState({
      loading: true
    });
    const ubahProfil = await UpdateProfileService(this.state.telpAgent);

    if (ubahProfil.status === "SUCCESS") {
      Alert.alert("Info", ubahProfil.message, [
        {
          text: "OK",
          onPress: () => this.props.navigation.navigate("Profil")
        }
      ]);
    } else {
      Alert.alert("Error", ubahProfil.message);
    }
    this.setState({
      loading: false
    });
  };

  render() {
    const {
      namaAgent,
      kodeAgent,
      periodeKontrak,
      periodeAaui,
      telpAgent,
      email
    } = this.state;
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <ScrollView>
          <View style={styles.formContainer}>
            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.Text}>Nama Agent</Text>
            </View>
            <TextInput
              style={styles.input}
              editable={false}
              value={namaAgent}
            />

            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.Text}>Kode Agent</Text>
            </View>
            <TextInput
              style={styles.input}
              editable={false}
              value={kodeAgent}
            />

            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.Text}>Periode Kontrak</Text>
            </View>
            <TextInput
              style={styles.input}
              editable={false}
              value={toDate(periodeKontrak)}
            />

            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.Text}>Periode Keanggotaan AAUI</Text>
            </View>
            <TextInput
              style={styles.input}
              editable={false}
              value={toDate(periodeAaui)}
            />

            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.Text}>Nomor Telepon</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="0877766554433"
              underlineColorAndroid="transparent"
              value={telpAgent}
              onChangeText={value => this.setState({ telpAgent: value })}
            />

            <View style={{ padding: 5, flexDirection: "row" }}>
              <Text style={styles.Text}>Email</Text>
            </View>
            <TextInput
              style={{
                width: Dimensions.get("window").width - 50,
                backgroundColor: "#fff",
                marginBottom: 35,
                borderRadius: 5
              }}
              placeholder="mnc-insurance@gmail.com"
              underlineColorAndroid="transparent"
              value={email}
              onChangeText={value => this.setState({ email: value })}
            />

            {/* <Button>SIMPAN</Button> */}
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
    backgroundColor: "#143260"
  },
  formContainer: {
    flex: 2,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  input: {
    width: Dimensions.get("window").width - 50,
    backgroundColor: "#fff",
    marginBottom: 18,
    borderRadius: 5
  },
  Text: {
    color: "white",
    fontSize: 12,
    textAlign: "left",
    flex: 1
  },
  Text2: {
    color: "red",
    fontSize: 11,
    textAlign: "right",
    flex: 1
  }
});

//make this component available to the app
export default UbahProfil;
