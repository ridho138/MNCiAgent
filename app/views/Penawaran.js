//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import Loader from "../components/Loader";
import { toDate } from "../utils/Utils";
import Icon from "react-native-vector-icons/FontAwesome";
import { GetQuotationService } from "../services/GetQuotationService";
import { connect } from "react-redux";
import { setModalMenu } from "../actions";

// create a component
class Penawaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   Data: null,
      //   keyword: "",
      loading: false,
      Data: []
    };
    this.arrayholder = [];
  }

  componentDidMount = async () => {
    this.props.dispatch(setModalMenu(false));
    this.setState({
      loading: true
    });
    const penawaran = await GetQuotationService();
    this.setState({
      loading: false
    });
    if (penawaran.status === "SUCCESS") {
      this.setState({
        Data: penawaran.data
      });
      this.arrayholder = penawaran.data;
    } else {
      Alert.alert("Error", penawaran.message);
    }
  };

  onClaimPress = () => {
    this.props.navigation.navigate("Pelapor Klaim");
  };

  renderList = item => {
    return (
      <Card>
        <CardSection>
          <View style={{ flex: 1, borderRadius: 5 }}>
            <View style={{ paddingLeft: 8, borderRadius: 5 }}>
              <View style={{ padding: 5, flexDirection: "row" }}>
                <Text style={styles.text}>No. Penawaran</Text>
                <Text style={styles.text2}>{item.QS_NO}</Text>
              </View>
              <View style={{ padding: 5, flexDirection: "row" }}>
                <Text style={styles.text}>Status Penawaran</Text>
                <Text style={styles.text2}>{item.STATUS}</Text>
              </View>
              <View style={{ padding: 5, flexDirection: "row" }}>
                <Text style={styles.text}>Nama Tertanggung</Text>
                <Text style={styles.text2}>{item.INSURED_NAME}</Text>
              </View>
              <View style={{ padding: 5, flexDirection: "row" }}>
                <Text style={styles.text}>Paket</Text>
                <Text style={styles.text2}>{item.PACKAGE}</Text>
              </View>
              <View style={{ padding: 5, flexDirection: "row" }}>
                <Text style={styles.text}>Harga Pertanggungan</Text>
                <Text style={styles.text2}>{item.TSI}</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button onPress={this.onClaimPress}>LIHAT PENAWARAN</Button>
            </View>
          </View>
        </CardSection>
      </Card>
    );
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
              <Input
                //tstyle={styles.input}
                placeholder="Cari Penawaran"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ keyword: text })}
              />
              <Icon
                style={styles.searchIcon}
                name="arrow-right"
                size={25}
                color="#06397B"
                //onPress={() => this.onSearchPolicyPress()}
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
            Daftar Penawaran
          </Text>
          <FlatList
            style={styles.container}
            data={this.state.Data}
            renderItem={({ item }) => this.renderList(item)}
            keyExtractor={item => item.QS_NO}
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
    borderRadius: 20,
    marginBottom: 15
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
    fontSize: 13,
    textAlign: "left",
    flex: 1,
    fontWeight: "bold"
  },
  text2: {
    color: "black",
    fontSize: 12,
    textAlign: "left",
    flex: 1
  }
});
const mapStateToProps = state => {
  return {
    data: state.dataModalMenu.isOpen
  };
};

//make this component available to the app
export default connect(mapStateToProps)(Penawaran);
