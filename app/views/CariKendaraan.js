//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import Button from "../components/Button";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import { GetVehicleService } from "../services/GetVehicleService";
import Loader from "../components/Loader";
import { toDate } from "../utils/Utils";
import Icon from "react-native-vector-icons/FontAwesome";

// create a component
class CariKendaraan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: null,
      keyword: "",
      loading: false
    };
  }

  onPilihPress = item => {
    this.props.navigation.navigate("Simulasi", { item });
  };

  renderList = item => {
    return (
      <Card>
        <CardSection>
          <View style={{ flex: 1, borderRadius: 5 }}>
            <View style={{ paddingLeft: 8, borderRadius: 5 }}>
              <View style={styles.textView}>
                <Text style={styles.text}>Code</Text>
                <Text style={styles.text2}>{item.code}</Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.text}>Description</Text>
                <Text style={styles.text2}>{item.description}</Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.text}>Merk</Text>
                <Text style={styles.text2}>{item.vehicle_merk}</Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.text}>Model</Text>
                <Text style={styles.text2}>{item.vehicle_model}</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button onPress={() => this.onPilihPress(item)}>Pilih</Button>
            </View>
          </View>
        </CardSection>
      </Card>
    );
  };

  onSearchKendaraanPress = async () => {
    this.setState({
      loading: true
    });
    const { keyword } = this.state;
    const dataKendaraan = await GetVehicleService(keyword);

    if (dataKendaraan.status === "SUCCESS") {
      this.setState({
        Data: dataKendaraan.data
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
                placeholder="Search Kendaraan"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ keyword: text })}
              />
              <Icon
                style={styles.searchIcon}
                name="arrow-right"
                size={25}
                color="#06397B"
                onPress={() => this.onSearchKendaraanPress()}
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
              marginBottom: 5,
              marginTop: 10
            }}
          >
            Daftar Kendaraan
          </Text>
          <FlatList
            style={styles.container}
            data={this.state.Data}
            renderItem={({ item }) => this.renderList(item)}
            keyExtractor={item => item.code}
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
  },
  text: {
    color: "black",
    //fontSize: 12,
    textAlign: "left",
    flex: 1,
    fontWeight: "bold"
  },
  text2: {
    color: "black",
    fontSize: 12,
    textAlign: "left",
    flex: 1
  },
  textView: {
    padding: 5,
    flexDirection: "row"
  }
});

//make this component available to the app
export default CariKendaraan;
