import React, {Component} from 'react';
import {View, Dimensions, Alert, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {setModalMenu, seNewsAnnouncementList} from '../actions';
import Modal from 'react-native-modal';
import AgentProfileInfo from './AgentProfileInfo';
import ProductionSummary from './ProductionSummary';
import MainMenu from './MainMenu';
import Menu from './Menu';
import NewsAnnouncement from './NewsAnnouncement';
import AllMenu from './AllMenu';
import Loader from '../components/Loader';
import {getData} from '../utils/Utils';
import {Constants} from '../utils/Constants';
import {PremiumProductionService} from '../services/PremiumProductionService';
import {EventScheduleService} from '../services/EventScheduleService';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import withBadge from '../components/withBadge';
import { GetNotificationsService } from "../services/GetNotificationsService"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      loading: false,
      profileAgent: {
        EMAIL: '',
        NAME: '',
        address: '',
        phonenumber: '',
        password: '',
        PASSWORD_EXP_DATE: '',
        code: '',
        newsData: [],
      },
      sumPremiumProduction: 0,
      monthName: '',
      year: '',
      bulanProduksi: '',
      notifCount: '0'
    };
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    const BadgedIcon = withBadge(params.notifCount)(Image);
    return {
      headerStyle: {
        backgroundColor: 'white',
      },
      headerLeft: (
        <Image
          resizeMode="contain"
          style={{
            marginLeft: 15,
            position: 'absolute',
            width: 146,
            height: 43,
          }}
          source={require('../assets/images/logo-gold.png')}
        />
      ),
      headerRight: (
        <View style={{flex: 1, flexDirection: 'row', paddingRight: 30}}>
          <TouchableOpacity onPress={() => navigation.navigate('Pengaturan')}>
            <Image
              resizeMode="contain"
              style={{
                //paddingRight: 20,
                //position: "absolute",
                width: 30,
                height: 30,
                marginRight: 20,
              }}
              source={require('../assets/icons/settings.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')}>
            <BadgedIcon
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
              source={require('../assets/icons/notification.png')}
            />
            {/* <Image
              resizeMode="contain"
              style={{
                width: 30,
                height: 30
              }}
              source={require("../assets/icons/notification.png")}
            /> */}
          </TouchableOpacity>
        </View>
      )
    };
  };

  toggleModal = () => {
    this.props.dispatch(setModalMenu(!this.props.data));
  };

  componentDidMount = async () => {
    try {
      this.setState({
        loading: true,
      });

      // // Hitung Notifikasi belum baca
      // let notifCount = 0;
      // const notif = await GetNotificationsService()
      // if (notif.status === 'SUCCESS') {
      //   notif.data.map(data => {
      //     if(data.ISREAD === "0"){
      //       notifCount += 1;
      //     }
         
      //   });
      // }
      // console.log(notif)
      // this.setState({notifCount})
      // this.props.navigation.setParams({notifCount: this.state.notifCount});

      // Set data profil
      const profile = await getData(Constants.KEY_DATA_USER);
      this.setState({profileAgent: profile.profile});

      // Berita & Informasi
      const news = await EventScheduleService();
      // console.log(news.data);
      this.props.dispatch(seNewsAnnouncementList(news.data));

      // Summary Production
      const dateFrom = moment()
        .startOf('month')
        .format('YYYY-MM-DD');
      const dateTo = moment(new Date()).format('YYYY-MM-DD');
      const bulanProduksi = moment(new Date()).format('MMMM YYYY');

      const premiumProduction = await PremiumProductionService(
        dateFrom,
        dateTo,
      );
      let sumPremiumProduction = 0;
      if (premiumProduction.status === 'SUCCESS') {
        premiumProduction.data.map(data => {
          sumPremiumProduction += data.GWP;
        });
      }

      this.setState({
        sumPremiumProduction,
        loading: false,
        bulanProduksi,
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
      // console.error(e.message);
      Alert.alert('Error', e.message);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <View style={styles.subContainer01}>
          <View style={styles.firstrow}>
            <AgentProfileInfo Data={this.state.profileAgent} />
            <ProductionSummary
              Data={this.state.sumPremiumProduction}
              Month={this.state.bulanProduksi}
            />
          </View>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#7b572d', '#835f2c', '#9e7b28', '#ae8925', '#b49024']}
            style={styles.secondrow}>
            <MainMenu Navigation={this.props.navigation} />
          </LinearGradient>
        </View>
        <View style={styles.subContainer02}>
          <Menu Navigation={this.props.navigation} />
        </View>
        <View style={styles.subContainer03}>
          <NewsAnnouncement
            Navigation={this.props.navigation}
            Data={this.state.newsData}
          />
        </View>
        <Modal
          isVisible={this.props.data}
          onBackdropPress={() => this.toggleModal()}
          onSwipeComplete={() => this.toggleModal()}
          onBackButtonPress={() => this.toggleModal()}
          style={styles.bottomModal}
          swipeDirection={['down']}>
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
    height: '100%',
  },
  subContainer01: {
    height: '32%',
    alignItems: 'center',
  },
  firstrow: {
    backgroundColor: '#143360',
    width: '100%',
    height: '80%',
    zIndex: 1,
  },
  secondrow: {
    //backgroundColor: "#997a2d",
    width: '90%',
    height: '40%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
  },
  subContainer02: {
    height: '43%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  subContainer03: {
    height: '25%',
    backgroundColor: '#143360',
    padding: 10,
  },
  cover: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  sheet: {
    position: 'absolute',
    top: Dimensions.get('window').height,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
  },
  popup: {
    backgroundColor: 'grey',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: Dimensions.get('window').height / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  modalContent: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height:
      Dimensions.get('window').height / 2 + Dimensions.get('window').height / 4,
    backgroundColor: 'white',
  },
};

const mapStateToProps = state => {
  return {
    data: state.dataModalMenu.isOpen,
  };
};
export default connect(mapStateToProps)(Home);
