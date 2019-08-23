import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { setModalMenu } from "../actions";
import EStyleSheet from 'react-native-extended-stylesheet';

class Menu extends Component {
  toggleModal = () => {
    //this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.dispatch(setModalMenu(!this.props.data));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menuRow}>
          <TouchableOpacity
            style={styles.card}
            // onPress={() => this.onMenuPress("")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="envelope" color="#20bf6b" size={25}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={styles.iconText}
              >
                <Text style={styles2.textTitle}>Info Klaim</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            // onPress={() => this.onMenuPress("")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="list-alt" color="#3867d6" size={25}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={styles.iconText}
              >
                <Text style={styles2.textTitle}>Daftar Polis</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            // onPress={() => this.onMenuPress("")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="history" color="#f7b731" size={25}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={styles.iconText}
              >
                <Text style={styles2.textTitle}>Polis Jatuh Tempo</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            // onPress={() => this.onMenuPress("")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="building" color="#eb3b5a" size={25}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={styles.iconText}
              >
                <Text style={styles2.textTitle}>Kantor</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.menuRow}>
          <TouchableOpacity
            style={styles.card}
            // onPress={() => this.onMenuPress("")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="wrench" color="#8854d0" size={25}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={styles.iconText}
              >
                <Text style={styles2.textTitle}>Bengkel</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            // onPress={() => this.onMenuPress("")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="map" color="#fc5c65" size={25}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={styles.iconText}
              >
                <Text style={styles2.textTitle}>Prosedur Klaim</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            // onPress={() => this.onMenuPress("")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="cube" color="#26de81" size={25}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={styles.iconText}
              >
                <Text style={styles2.textTitle}>Produk</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={this.toggleModal}>
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="ellipsis-h" color="#fd9644" size={25}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={styles.iconText}
              >
                <Text style={styles2.textTitle}>Menu Lainnya</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles2 = EStyleSheet.create({
  textTitle: {
    color: "black",
    fontSize: '0.6rem',
    fontWeight: "bold",
    textAlign: "center"
  }
});

const styles = {
  container: {
    flex: 1
  },
  menuRow: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey"
  },
  card: {
    padding: 5,
    margin: 10,
    width: Dimensions.get("window").width / 4 - 30,
    //height: Dimensions.get("window").width / 4 - 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green"
  },
  icon: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d8e0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    width: Dimensions.get("window").width / 4 - 40,
    height: Dimensions.get("window").width / 4 - 40
  },
  textTitle: {
    color: "black",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center"
  },
  iconText: {
    alignItems: "center",
    alignContent: "center",
    flexWrap: "wrap",
    //flex: 1
  }
};

const mapStateToProps = state => {
  console.log(state);
  return {
    data: state.dataModalMenu.isOpen
  };
};
export default connect(mapStateToProps)(Menu);
