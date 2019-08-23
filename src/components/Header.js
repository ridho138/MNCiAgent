import React, { Component } from "react";
import {
  View,
  Dimensions
} from "react-native";
import AgentProfile from "./AgentProfile";
import Summary from "./Summary";
import MainMenu from "./MainMenu";
import Menu from "./Menu";
import News from "./News";
import AllMenu from "./AllMenu";
import Sample from "./Sample";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { setModalMenu } from "../actions";
import Home from "./Home";
class Header extends Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    //this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.dispatch(setModalMenu(!this.props.data));
  };

  render() {
    const { width, height } = Dimensions.get("window");
    return (
      // <Sample />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.firstrow}>
            <AgentProfile />
            <Summary />
          </View>
          <View style={styles.secondrow}>
            <MainMenu />
          </View>
        </View>

        <View style={styles.thirdrow}>
          <Home />
        </View>
        <View style={styles.fourthrow}>
          <News />
        </View>
        <Modal
          isVisible={this.props.data}
          onBackdropPress={() => this.toggleModal()}
          onSwipeComplete={() => this.toggleModal()}
          onBackButtonPress={() => this.toggleModal()}
          style={styles.bottomModal}
          swipeDirection={["down"]}
        >
          <View style={styles.modalContent}>
            <AllMenu />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
  container: {
    height: "100%"
  },
  subContainer: {
    height: "32%",
    // flex:1,
    alignItems: "center"
    // backgroundColor: "red"
  },
  firstrow: {
    backgroundColor: "#143360",
    width: "100%",
    height: "80%",
    zIndex: 1
    // position:"absolute",
  },
  secondrow: {
    backgroundColor: "#997a2d",
    width: "90%",
    height: "40%",
    // marginTop: '-15%',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    // position:"absolute",
    zIndex: 2,
    position: "absolute",
    bottom: 0
    // alignSelf: "flex-end"
  },
  thirdrow: {
    height: "43%",
    //paddingTop: 150,
    paddingLeft: 15,
    paddingRight: 15
  },
  fourthrow: {
    height: "25%",
    // flex:1,
    backgroundColor: "#143360",
    padding: 10
  },
  cover: {
    backgroundColor: "rgba(0,0,0,.5)"
  },
  sheet: {
    position: "absolute",
    top: Dimensions.get("window").height,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end"
  },
  popup: {
    backgroundColor: "grey",
    //marginHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: Dimensions.get("window").height / 2,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomModal: {
    justifyContent: "flex-end",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
  modalContent: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height:
      Dimensions.get("window").height / 2 + Dimensions.get("window").height / 4,
    backgroundColor: "white"
  }
};

const mapStateToProps = state => {
  console.log(state);
  return {
    data: state.dataModalMenu.isOpen
  };
};
export default connect(mapStateToProps)(Header);
