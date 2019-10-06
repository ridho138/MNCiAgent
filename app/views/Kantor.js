//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import Button from "../components/Button";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import { BranchService } from "../services/BranchService";
import Loader from "../components/Loader";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { setModalMenu } from "../actions";

// create a component
class Kantor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: null,
      keyword: "",
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
              <Text>{item.CODE}</Text>
              <Text>{item.ADDRESS}</Text>
              <Text>{item.PHONE_NO}</Text>
              <Text>{item.FAX_NO}</Text>
              <Text>{item.AREA_MANAGER_EMAIL}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button>LIHAT LOKASI</Button>
            </View>
          </View>
        </CardSection>
      </Card>
    );
  };

  _handlePress() {
    console.log(this.state.Data);
  }

  onSearchOfficePress = async () => {
    this.setState({
      loading: true
    });
    const { keyword } = this.state;
    const officeData = await BranchService(keyword);
    this.setState({
      loading: false
    });
    if (officeData.status === "SUCCESS") {
      this.setState({
        Data: officeData.data
      });
    } else {
      Alert.alert("Error", officeData.message);
    }
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
                placeholder="Cari Kantor"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ keyword: text })}
              />
              <Icon
                style={styles.searchIcon}
                name="arrow-right"
                size={25}
                color="#06397B"
                onPress={() => this.onSearchOfficePress()}
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
            Daftar Kantor
          </Text>
          <FlatList
            style={styles.container}
            data={this.state.Data}
            renderItem={({ item }) => this.renderList(item)}
            keyExtractor={item => item.CODE}
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

const mapStateToProps = state => {
  return {
    data: state.dataModalMenu.isOpen
  };
};

//make this component available to the app
export default connect(mapStateToProps)(Kantor);
