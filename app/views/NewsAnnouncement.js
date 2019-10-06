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
import { EventScheduleService } from "../services/EventScheduleService";

import { connect } from "react-redux";

// create a component
class NewsAnnouncement extends Component {
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

  onLinkPress = () => {
    this.props.Navigation.navigate("Berita & Informasi");
  };

  onNewsPress = item => {
    this.props.Navigation.navigate("Berita Detail", { item });
  };

  render() {
    console.log(this.state.data);
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <View style={styles.rowTitle}>
          <View style={styles.textTitle}>
            <Text style={styles.textStyle}>Berita & Informasi</Text>
          </View>
          <TouchableOpacity style={styles.linkTitle} onPress={this.onLinkPress}>
            <Text style={styles.textStyle}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <FlatList
            data={this.props.data}
            keyExtractor={item => item.ID}
            renderItem={this.renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1
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
  content: {
    flex: 4
  },
  scroll: {
    flexDirection: "row"
  },
  card: {
    width: (Dimensions.get("window").width * 2) / 3,
    marginRight: 10,
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
  
  return {
    data: state.dataNewsAnnouncementList.data
  };
};

//make this component available to the app
export default connect(mapStateToProps)(NewsAnnouncement);
