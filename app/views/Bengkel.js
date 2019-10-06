//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput
} from "react-native";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import { WorkshopService } from "../services/WorkshopService";
import Loader from "../components/Loader";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { setModalMenu } from "../actions";

// create a component
class Bengkel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: null,
      city: "",
      loading: false
    };
  }
  componentDidMount = () => {
    this.props.dispatch(setModalMenu(false));
  }
  renderList = item => {
    return (
      <Card>
        <CardSection>
          <View style={{ flex: 1 }}>
            <View style={{ paddingLeft: 8 }}>
              <Text>Nama : {item.name}</Text>
              <Text>Alamat : {item.address}</Text>
              <Text>Telepon : {item.phone_no}</Text>
              <Text>Kota : {item.CITY}</Text>
              <Text>Provinsi : {item.PROVINCE}</Text>
              <Text>Kode Provinsi : {item.PROVINCE_CODE}</Text>
            </View>
          </View>
        </CardSection>
      </Card>
    );
  };

  _handlePress() {
    console.log(this.state.Data);
  }

  onWorkshopPress = async () => {
    this.setState({
      loading: true
    });
    const { city } = this.state;
    const bengkel = await WorkshopService(city);

    if (bengkel.status === "SUCCESS") {
      this.setState({
        Data: bengkel.data
      });
    } else {
      Alert.alert("Error", bengkel.message);
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
                placeholder="Cari Bengkel"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ city: text })}
              />
              <Icon
                style={styles.searchIcon}
                name="arrow-right"
                size={25}
                color="#06397B"
                onPress={() => this.onWorkshopPress()}
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
            Daftar Bengkel
          </Text>
          <FlatList
            style={styles.container}
            data={this.state.Data}
            renderItem={({ item }) => this.renderList(item)}
            keyExtractor={item => item.name}
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
  listPolis: {
    height: 35,
    color: "black"
  },
  buttonContainer: {
    paddingTop: 10,
    alignItems: "center",
    marginBottom: 10
  },
  ViewList: {
    flex: 1,
    padding: 10,
    marginBottom: 20
  },
  ImageStyle: {
    //padding: 1,
    //margin: 1,
    height: 20,
    width: 20
    //resizeMode: "stretch",
    //alignItems: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 5
    // margin: 22,
    // flex: 1
    //padding: 8
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

const mapStateToProps = state => {
  return {
    data: state.dataModalMenu.isOpen
  };
};

//make this component available to the app
export default connect(mapStateToProps)(Bengkel);
