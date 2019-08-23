//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput
} from "react-native";
import Button from "../components/Button";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import { SearchPolicyService } from "../services/SearchPolicyService";
import Loader from "../components/Loader";
import { toDate } from "../utils/Utils";
import Icon from "react-native-vector-icons/FontAwesome";

// create a component
class DaftarPolis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: null,
      keyword: "",
      loading: false
    };
  }

  onClaimPress = (policy_no, license_no1, license_no2, license_no3, interest_insured) => {
    this.props.navigation.navigate("Pelapor Klaim",{
      policy_no,
      license_no1,
      license_no2,
      license_no3,
      interest_insured
    });
  };

  renderList = item => {
    return (
      <Card>
        <CardSection>
          <View style={{ flex: 1 }}>
            <View style={{ paddingLeft: 8 }}>
              <Text>Nomor Polis : {item.POLICY_NO}</Text>
              <Text>
                Nomor Plat : {item.license_no1}
                 {item.license_no2}
                 {item.license_no3}
              </Text>
              <Text>Nama Tertanggung : {item.INTEREST_INSURED}</Text>
              <Text>Tanggal Efektif : {toDate(item.EFF_DATE)}</Text>
              <Text>Tanggal Kadaluarsa : {toDate(item.EXP_DATE)}</Text>
              <Text>Status Polis : {item.POLICY_STATUS}</Text>
              <Text>Status Premi : {item.PAYMENT_STATUS}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                onPress={() => this.onClaimPress(item.POLICY_NO, item.license_no1, item.license_no2, item.license_no3,
                  item.INTEREST_INSURED)}
              >
                KLAIM
              </Button>
            </View>
          </View>
        </CardSection>
      </Card>
    );
  };

  _handlePress() {
    console.log(this.state.Data);
  }

  onSearchPolicyPress = async () => {
    this.setState({
      loading: true
    });
    const { keyword } = this.state;
    const policyData = await SearchPolicyService(keyword);

    if (policyData.status === "SUCCESS") {
      this.setState({
        Data: policyData.data
      });
    } else {
      Alert.alert("Error", login.message);
    }
    this.setState({
      loading: false
    });
  };

  render() {
    return (
      <View
        style={{ backgroundColor: "#1A1F61", flex: 1, flexDirection: "column" }}
      >
        <Loader loading={this.state.loading} />

        <Card>
          <CardSection>
            <View style={styles.searchSection}>
              <Icon
                style={styles.searchIcon}
                name="search"
                size={20}
                color="#ddd"
              />
              <TextInput
                style={styles.input}
                placeholder="Cari Polis"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ keyword: text })}
              />
              <Icon
                style={styles.searchIcon}
                name="arrow-right"
                size={25}
                color="#06397B"
                onPress={() => this.onSearchPolicyPress()}
              />
            </View>
          </CardSection>
        </Card>
        <View style={{ flex: 5, marginTop: 10 }}>
          <Text
            style={{
              paddingLeft: 32,
              color: "#fff",
              fontSize: 16,
              marginBottom: 5
            }}
          >
            Daftar Polis
          </Text>
          <FlatList
            style={styles.container}
            data={this.state.Data}
            renderItem={({ item }) => this.renderList(item)}
            keyExtractor={item => item.POLICY_NO}
          />
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20
  },
  buttonContainer: {
    paddingTop: 10,
    alignItems: "center",
    marginBottom: 10
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5
  },
  searchIcon: {
    padding: 8
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#06397B"
  }
});

//make this component available to the app
export default DaftarPolis;
