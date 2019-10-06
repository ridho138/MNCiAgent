import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Alert
} from "react-native";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { getData } from "../utils/Utils";
import { Constants } from "../utils/Constants";
import { ChangePasswordService } from "../services/ChangePasswordService";

// create a component
class Pengaturan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Data: null,
      currentpassword: "",
      newpassword: "",
      newpasswordulang: "",
      loading: false
    };
  }
  onSimpanPress = async () => {
    const { currentpassword, newpassword, newpasswordulang } = this.state;

    const { password } = await getData(Constants.KEY_DATA_USER);

    if (
      currentpassword !== "" &&
      newpassword !== "" &&
      newpasswordulang !== ""
    ) {
      if (password === currentpassword) {
        if (newpassword === newpasswordulang) {
          this.setState({
            loading: true
          });
          const ubahKataSandi = await ChangePasswordService(newpassword);
          this.setState({
            loading: false
          });
          if (ubahKataSandi.status === "SUCCESS") {
            Alert.alert("Info", ubahKataSandi.message, [
              {
                text: "OK",
                onPress: () => this.props.navigation.navigate("Home")
              }
            ]);
          } else {
            Alert.alert("Info", ubahKataSandi.message);
          }
          
        } else {
          Alert.alert(
            "Info",
            "Kata sandi baru berbeda dengan Ulangi kata sandi baru."
          );
        }
      } else {
        Alert.alert("Info", "Kata sandi sekarang salah.");
      }
    } else {
      Alert.alert("Info", "Data tidak ada yang boleh kosong.");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <View style={styles.formContainer}>
          <View style={{ padding: 5, flexDirection: "row" }}>
            <Text style={styles.Text}>Kata sandi sekarang</Text>
            <Text style={styles.Text2}>*Wajib Diisi</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={value => this.setState({ currentpassword: value })}
            secureTextEntry
          />

          <View style={{ padding: 5, flexDirection: "row" }}>
            <Text style={styles.Text}>Kata sandi baru</Text>
            <Text style={styles.Text2}>*Wajib Diisi</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={value => this.setState({ newpassword: value })}
            secureTextEntry
          />

          <View style={{ padding: 5, flexDirection: "row" }}>
            <Text style={styles.Text}>Ulangi sandi baru</Text>
            <Text style={styles.Text2}>*Wajib Diisi</Text>
          </View>
          <TextInput
            style={{
              width: Dimensions.get("window").width - 50,
              backgroundColor: "#fff",
              marginBottom: 35,
              borderRadius: 5
            }}
            onChangeText={value => this.setState({ newpasswordulang: value })}
            secureTextEntry
          />

          <Button onPress={() => this.onSimpanPress()}>SIMPAN</Button>
        </View>
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
export default Pengaturan;
