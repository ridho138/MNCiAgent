import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { connect } from "react-redux";
import { setModalMenu } from "../actions";
import Modal from "react-native-modal";
import AgentProfileInfo from "./AgentProfileInfo";
import ProductionSummary from "./ProductionSummary";
import MainMenu from "./MainMenu";
import Menu from "./Menu";
import NewsAnnouncement from "./NewsAnnouncement";
import AllMenu from "./AllMenu";
import Loader from "../components/Loader";
import { getData } from "../utils/Utils";
import { Constants } from "../utils/Constants";
import { PremiumProductionService } from "../services/PremiumProductionService";

class Home extends Component {
  state = {
    isModalVisible: false,
    loading: false,
    profileAgent: {
      EMAIL: "",
      NAME: "",
      address: "",
      phonenumber: "",
      password: "",
      PASSWORD_EXP_DATE: "",
      code: ""
    },
    sumPremiumProduction: 0
  };

  toggleModal = () => {
    this.props.dispatch(setModalMenu(!this.props.data));
  };

  componentDidMount = async () => {
    this.setState({
      loading: true
    });

    const profile = await getData(Constants.KEY_DATA_USER);
    this.setState({ profileAgent: profile.profile });

    // const premiumProduction = await PremiumProductionService();
    // let sumPremiumProduction = 0;
    // premiumProduction.map(data => {
    //   sumPremiumProduction += data.GWP;
    // });
    
    this.setState({
      // sumPremiumProduction,
      loading: false
    });
  };

  

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <View style={styles.subContainer01}>
          <View style={styles.firstrow}>
            <AgentProfileInfo Data={this.state.profileAgent} />
            <ProductionSummary Data={this.state.sumPremiumProduction} />
          </View>
          <View style={styles.secondrow}>
            <MainMenu Navigation={this.props.navigation} />
          </View>
        </View>
        <View style={styles.subContainer02}>
          <Menu Navigation={this.props.navigation} />
        </View>
        <View style={styles.subContainer03}>
          <NewsAnnouncement Navigation={this.props.navigation} />
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
            <AllMenu Navigation={this.props.navigation} />
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
  subContainer01: {
    height: "32%",
    alignItems: "center"
  },
  firstrow: {
    backgroundColor: "#143360",
    width: "100%",
    height: "80%",
    zIndex: 1
  },
  secondrow: {
    backgroundColor: "#997a2d",
    width: "90%",
    height: "40%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 2,
    position: "absolute",
    bottom: 0
  },
  subContainer02: {
    height: "43%",
    paddingLeft: 15,
    paddingRight: 15
  },
  subContainer03: {
    height: "25%",
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
  return {
    data: state.dataModalMenu.isOpen
  };
};
export default connect(mapStateToProps)(Home);
