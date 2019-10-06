import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import { toDate } from "../utils/Utils";

class BeritaDetail extends Component {
  state = {
    loading: false,
    news: {
      CRE_DATE: "",
      TITLE: "",
      DESCRIPTION: "",
      IMAGE_CODE: ""
    }
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    const news = navigation.getParam("item");
    console.log(news);
    this.setState({ news });
  };

  render() {
    const { IMAGE_CODE } = this.state;
   console.log(this.state)
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageView}>
            <Image
              style={{ flex: 1, height: undefined, width: undefined }}
              resizeMode="cover"
              source={{
                uri: `data:image/png;base64,${this.state.news.IMAGE_CODE}`
                //uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
              }}
              // source={require("../assets/images/image-3.jpg")}
            />
          </View>
          <View style={styles.contentView}>
            <View style={{ padding: 5 }}>
              <Text style={styles.newsDate}>
                {toDate(this.state.news.CRE_DATE)}
              </Text>
            </View>
            <View style={{ padding: 5 }}>
              <Text style={styles.newsTitle}>{this.state.news.TITLE}</Text>
            </View>
            <View style={{ padding: 5 }}>
              <Text style={styles.newsContent}>
                {this.state.news.DESCRIPTION}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#143360"
  },
  imageView: {
    width: "100%",
    height: (Dimensions.get("window").height * 1) / 4
  },
  contentView: {
    width: "100%",
    //height: (Dimensions.get("window").height * 3) / 4,
    padding: 15
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  newsDate: {
    fontSize: 12,
    color: "white"
  },
  newsContent: {
    fontSize: 14,
    color: "white"
  }
});

export default BeritaDetail;
