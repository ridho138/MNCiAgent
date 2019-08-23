import React, { Component } from "react";
import { View, Text, Alert, Dimensions, FlatList } from "react-native";
import { OutstandingPremiumDetailService } from "../services/OutstandingPremiumDetailService";
import Loader from "../components/Loader";
import EStyleSheet from "react-native-extended-stylesheet";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import { toDate } from "../utils/Utils";
import Input from "../components/Input";
import NumberFormat from "react-number-format";

// create a component
class DaftarPremiBelumTerbayar extends Component {
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
    const cob = navigation.getParam("cob");

    const outstandingPremium = await OutstandingPremiumDetailService(cob);
    this.setState({
      loading: false
    });
    if (outstandingPremium.status === "SUCCESS") {
      this.setState({
        data: outstandingPremium.data
      });
      this.arrayholder = outstandingPremium.data;
    } else {
      Alert.alert("Error", outstandingPremium.message);
    }
  };

  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.POLICY_NO.toUpperCase()}   
      ${item.INTEREST_INSURED.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({ data: newData });
  };

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <Input
          placeholder="Cari Polis"
          onChangeText={val => {
            this.searchFilterFunction(val);
          }}
          tStyle={{
            width: Dimensions.get("window").width - 30,
            marginBottom: 0
          }}
        />
        <FlatList
          data={this.state.data}
          style={{ flex: 1, marginTop: 10 }}
          keyExtractor={item => item.POLICY_NO}
          renderItem={({ item }) => {
            return (
              <Card>
                <CardSection>
                  <View
                    style={{
                      flex: 1,
                      padding: 15
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
                        <Text style={styles.textTitle}>Nama Tertanggung</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textContent}>
                          {item.INSURED_NAME}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.rowView}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textTitle}>Premi</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <NumberFormat
                          value={item.CURRENT_TOTAL}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp "}
                          renderText={value => (
                            <Text style={styles.textContent}>{value}</Text>
                          )}
                        />
                      </View>
                    </View>
                    <View style={styles.rowView}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textTitle}>Aging</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textContent}>{item.Aging}</Text>
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
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
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
  }
});

//make this component available to the app
export default DaftarPremiBelumTerbayar;
