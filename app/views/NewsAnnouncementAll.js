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

// create a component
class NewsAnnouncementAll extends Component {

    
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [
        {
          id: "1",
          title: "Title Sample 001",
          date: "12-Agustus-2019",
          content:
            "Below are summary of the activities log which we have sent its solution to you, please check and send us feedback 'Finished/Closed' if the solution meet with your requirement or other respond to let us take further action.",
          image: ""
        },
        {
          id: "2",
          title: "Title Sample 002",
          date: "12-Agustus-2019",
          content:
            "Below are summary of the activities log which we have sent its solution to you, please check and send us feedback 'Finished/Closed' if the solution meet with your requirement or other respond to let us take further action.",
          image: ""
        },
        {
          id: "3",
          title: "Title Sample 003",
          date: "12-Agustus-2019",
          content:
            "Below are summary of the activities log which we have sent its solution to you, please check and send us feedback 'Finished/Closed' if the solution meet with your requirement or other respond to let us take further action.",
          image: ""
        },
        {
          id: "4",
          title: "Title Sample 004",
          date: "12-Agustus-2019",
          content:
            "Below are summary of the activities log which we have sent its solution to you, please check and send us feedback 'Finished/Closed' if the solution meet with your requirement or other respond to let us take further action.",
          image: ""
        },
        {
          id: "5",
          title: "Title Sample 005",
          date: "12-Agustus-2019",
          content:
            "Below are summary of the activities log which we have sent its solution to you, please check and send us feedback 'Finished/Closed' if the solution meet with your requirement or other respond to let us take further action.",
          image: ""
        },
        {
          id: "6",
          title: "Title Sample 006",
          date: "12-Agustus-2019",
          content:
            "Below are summary of the activities log which we have sent its solution to you, please check and send us feedback 'Finished/Closed' if the solution meet with your requirement or other respond to let us take further action.",
          image: ""
        },
        {
          id: "7",
          title: "Title Sample 007",
          date: "12-Agustus-2019",
          content:
            "Below are summary of the activities log which we have sent its solution to you, please check and send us feedback 'Finished/Closed' if the solution meet with your requirement or other respond to let us take further action.",
          image: ""
        }
      ]
    };
  }

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={this.onNewsPress}>
      <View style={{ padding: 5 }}>
        <Text style={styles.newsDate}>{item.date}</Text>
      </View>
      <View style={{ padding: 5 }}>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.newsTitle}>{item.title}</Text>
      </View>
      <View style={{ padding: 5, paddingBottom: 15 }}>
        <Text numberOfLines={2} ellipsizeMode='tail'>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  onNewsPress = () => {
    this.props.navigation.navigate("Berita Detail");
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
            data={this.state.data}
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
    width: (Dimensions.get("window").width - 50),
    marginBottom: 10,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 5,
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

//make this component available to the app
export default NewsAnnouncementAll;
