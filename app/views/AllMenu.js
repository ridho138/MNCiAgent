import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MainMenu from "./MainMenu";
import EStyleSheet from 'react-native-extended-stylesheet';

const AllMenu = ({ Navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ padding: 5 }}>
        <View
          style={{
            width: 60,
            height: 6,
            backgroundColor: "#AE8E36",
            borderRadius: 5
          }}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.secondrow}>
          <MainMenu Navigation={Navigation} />
        </View>
        <View style={styles.menuRow}>
          <TouchableOpacity
            style={styles.card}
            // onPress={() => this.onMenuPress("")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="envelope" color="#20bf6b" size={30}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={styles.textTitle}>Info Klaim</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            // onPress={() => this.onMenuPress("")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="list-alt" color="#3867d6" size={30}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.textTitle}>Daftar Polis</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            // onPress={() => this.onMenuPress("Attendance")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="history" color="#f7b731" size={30}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.textTitle}>Polis Jatuh Tempo</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            // onPress={() => this.onMenuPress("Staff Contact")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="building" color="#eb3b5a" size={30}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.textTitle}>Kantor</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            // onPress={() => this.onMenuPress("")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="wrench" color="#8854d0" size={30}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={styles.textTitle}>Bengkel</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            // onPress={() => this.onMenuPress("Approval")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="map" color="#fc5c65" size={30}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={styles.textTitle}>Prosedur Klaim</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            // onPress={() => this.onMenuPress("")}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="cube" color="#26de81" size={30}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={styles.textTitle}>Produk</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={this.toggleModal}>
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="user" color="#2bcbba" size={30}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={styles.textTitle}>Profile</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={this.toggleModal}>
            <View style={{ flex: 1 }}>
              <View style={styles.icon}>
                <Icon name="circle" color="#45aaf2" size={30}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={styles.textTitle}>Pelayanan</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = EStyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column"
  },
  menuRow: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  secondrow: {
    backgroundColor: "#997a2d",
    width: Dimensions.get("window").width - 30,
    height: 90,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 7
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 12,
    width: Dimensions.get("window").width / 4 - 20,
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d8e0",
    width: Dimensions.get("window").width / 4 - 30,
    height: Dimensions.get("window").width / 4 - 30
  },
  textTitle: {
    color: "black",
    fontSize: '0.7rem',
    fontWeight: "bold",
    textAlign: "center"
  }
});
export default AllMenu;
