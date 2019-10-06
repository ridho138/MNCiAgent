import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  Dimensions,
  FlatList,
  TouchableOpacity
} from "react-native";
import { ClaimInfoService } from "../services/ClaimInfoService";
import Loader from "../components/Loader";
import EStyleSheet from "react-native-extended-stylesheet";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import { toDate } from "../utils/Utils";
import Input from "../components/Input";

import { connect } from "react-redux";
// create a component
class NewsAnnouncementAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => this.onNewsPress(item)}
    >
      <View style={{ padding: 5 }}>
        <Text style={styles.newsDate}>{toDate(item.CRE_DATE)}</Text>
      </View>
      <View style={{ padding: 5 }}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.newsTitle}>
          {item.TITLE}
        </Text>
      </View>
      <View style={{ padding: 5 }}>
        <Text numberOfLines={2} ellipsizeMode="tail">
          {item.DESCRIPTION}
        </Text>
      </View>
    </TouchableOpacity>
  );

  onNewsPress = item => {
    this.props.navigation.navigate("Berita Detail", { item });
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#143360",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  rowTitle: {
    flex: 1,
    flexDirection: "row"
  },
  textTitle: {
    flex: 3
  },
  linkTitle: {
    flex: 1,
    alignItems: "flex-end"
  },
  card: {
    width: Dimensions.get("window").width - 50,
    marginBottom: 10,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 5
    // paddingBottom: 10
  },
  textStyle: {
    color: "white",
    fontSize: 14
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: "bold"
  },
  newsDate: {
    fontSize: 12,
    color: "grey"
  }
});

const mapStateToProps = state => {
  console.log(state);
  return {
    data: state.dataNewsAnnouncementList.data
  };
};

//make this component available to the app
export default connect(mapStateToProps)(NewsAnnouncementAll);
