import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const News = () => {
  const { viewStyle, textStyle } = styles;
  return (
    <View style={styles.container}>
      <View style={styles.rowTitle}>
        <View style={styles.textTitle}>
          <Text style={styles.textStyle}>News & Announcement</Text>
        </View>
        <TouchableOpacity style={styles.linkTitle}>
          <Text style={styles.textStyle}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
        >
          <View style={styles.card} />
          <View style={styles.card} />
          <View style={styles.card} />
          <View style={styles.card} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = {
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
  },
  textStyle: {
    color: "white",
    fontSize: 14
  }
};

export default News;
