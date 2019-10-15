import React, { Component } from "react";
import { View, Text, Alert, Dimensions, FlatList, Image } from "react-native";
import { ClaimInfoService } from "../services/ClaimInfoService";
import Loader from "../components/Loader";
import EStyleSheet from "react-native-extended-stylesheet";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import { toDate } from "../utils/Utils";
import Input from "../components/Input"
// create a component
class DaftarInfoKlaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: null
    };
    this.arrayholder = [];
  }

  componentDidMount = async () => {
    this.setState({
      loading: true
    });
    const { navigation } = this.props;
    const dariTanggal = navigation.getParam("dariTanggal");
    const sampaiTanggal = navigation.getParam("sampaiTanggal");
    const keyword = navigation.getParam("keyword");
    const claimInfo = await ClaimInfoService(
      dariTanggal,
      sampaiTanggal,
      keyword
    );
    this.setState({
      loading: false
    });
    if (claimInfo.status === "SUCCESS") {
      this.setState({
        data: claimInfo.data
      });
      this.arrayholder = claimInfo.data
    } else {
      Alert.alert("Error", claimInfo.message);
    }
  };

  searchFilterFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.POLICY_NO.toUpperCase()}   
      ${item.INTEREST_INSURED.toUpperCase()} ${item.OBJECT_INFO_1.toUpperCase()}`;
      
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    
    this.setState({ data: newData });  
  };

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        {/* <Input placeholder="Cari Polis" onChangeText={(val) => {this.searchFilterFunction(val)}} tStyle={{width: Dimensions.get("window").width - 30, marginBottom: 0}} /> */}
        {/* <Card
          cStyle={{
            borderRadius: 10,
            borderColor: "transparent",
            shadowRadius: 10,
            marginLeft: 0,
            marginBottom: 0,
            marginTop: 0,
            marginRight: 0
          }}
        >
          <CardSection
            cStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: 10,
              borderBottomWidth: 0,
              padding: 0
            }}
          >
            <View style={styles.searchSection}>
            <Image
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 15
                }}
                source={require("../assets/icons/search.png")}
              />
              <Input
                tStyle={styles.input}
                placeholder="Cari Polis"
                placeholderTextColor="#fff"
                underlineColorAndroid="transparent"
                onChangeText={(val) => {this.searchFilterFunction(val)}}
              />
              
            </View>
          </CardSection>
        </Card> */}
        <FlatList
          data={this.state.data}
          style={styles.flatList}
          keyExtractor={item => `${item.POLICY_NO}-${item.POLICY_UNIT_NO}-${item.LOSS_DATE}`}
          renderItem={({ item }) => {
            return (
              <Card>
                <CardSection>
                  <View
                    style={{
                      flex: 1,
                      padding: 20
                    }}
                  >
                    <View style={styles.rowView}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textTitle}>COB</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textContent}>{item.COB}</Text>
                      </View>
                    </View>
                    <View style={styles.rowView}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textTitle}>No. Polis</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textContent}>{item.POLICY_NO}</Text>
                      </View>
                    </View>
                    <View style={styles.rowView}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textTitle}>No. Unit Polis</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textContent}>{item.POLICY_UNIT_NO}</Text>
                      </View>
                    </View>
                    <View style={styles.rowView}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textTitle}>Nama Tertanggung</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textContent}>{item.INTEREST_INSURED}</Text>
                      </View>
                    </View>
                    <View style={styles.rowView}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textTitle}>Objek Info</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textContent}>{item.OBJECT_INFO_1} {item.OBJECT_INFO_2} {item.OBJECT_INFO_3} {item.OBJECT_INFO_4} {item.OBJECT_INFO_5}</Text>
                      </View>
                    </View>
                    <View style={styles.rowView}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textTitle}>Tanggal Kejadian</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textContent}>{toDate(item.LOSS_DATE)}</Text>
                      </View>
                    </View>
                    <View style={styles.rowView}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textTitle}>Tanggal Lapor</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textContent}>{toDate(item.REPORT_DATE)}</Text>
                      </View>
                    </View>
                  </View>
                </CardSection>
              </Card>
            );
          }}   
        />
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#06397B",
    padding: 30
  },
  rowView: {
    flexDirection: "row"
  },
  textTitle: {
    color: "black",
    fontSize: "0.8rem",
    fontWeight: "bold"
  },
  textContent: {
    color: "black",
    fontSize: "0.75rem"
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 3
  },
  searchIcon: {
    paddingLeft: 15,
    paddingRight: 15
  },
  input: {
    flex: 1,
    color: "#fff",
    backgroundColor: "transparent"
  },
  flatList: {
    flex: 1,
    marginTop: 15
  },
});

//make this component available to the app
export default DaftarInfoKlaim;
