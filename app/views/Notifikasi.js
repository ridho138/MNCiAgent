//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import RadioGroup from 'react-native-radio-buttons-group';
import {GetNotificationsService} from '../services/GetNotificationsService';
import Loader from '../components/Loader';

// create a component
class Notifikasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      Data: [],
      pilihanFilter: [
        {
          value: '0',
          label: 'Semua Notifikasi',
          color: '#997b2e',
        },
        {
          value: '1',
          label: 'Premi Jatuh Tempo',
          color: '#997b2e',
        },
        {
          value: '2',
          label: 'Kontrak Agent',
          color: '#997b2e',
        },
        {
          value: '3',
          label: 'Kontrak AAUI',
          color: '#997b2e',
        },
      ],
      filter: '',
    };
    this.arrayholder = [];
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerRight: (
        <View style={{flex: 1, flexDirection: 'row', paddingRight: 30}}>
          <TouchableOpacity onPress={() => params.toggleModal()}>
            <Image
              resizeMode="contain"
              style={{
                //paddingRight: 10,
                //position: "absolute",
                width: 30,
                height: 30,
              }}
              source={require('../assets/icons/sort.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    };
  };

  async componentDidMount() {
    this.props.navigation.setParams({toggleModal: this.toggleModal});
    this.setState({
      loading: true,
    });
    const notif = await GetNotificationsService();
    this.setState({
      loading: false,
    });
    if (notif.status === 'SUCCESS') {
      // console.log(notif)
      this.setState({
        Data: notif.data,
      });
      this.arrayholder = notif.data;
    } else {
      Alert.alert('Info', notif.message);
    }
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  onRadioButtonPress = data => {
    this.setState({pilihanFilter: data});
    let selectedButton = this.state.pilihanFilter.find(e => e.selected == true);
    selectedButton = selectedButton
      ? selectedButton.value
      : this.state.pilihanFilter[0].label;

    this.setState({filter: selectedButton});

    this.toggleModal();
    this.searchFilterFunction(selectedButton);
  };

  searchFilterFunction = async text => {
    const keyword = text === '0' ? '' : text;
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.TYPE.toUpperCase()}`;

      const textData = keyword.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    console.log(newData);
    this.setState({Data: newData});
    // if (newData.length === 0) {
    //   //this.loadData(text);
    // } else {
    //   this.setState({ Data: newData });
    // }
  };

  renderList = item => {
    let img = '';
    if (item.TYPE === '0') {
      img = require('../assets/icons/pelayanan_notif.png');
    } else if (item.TYPE === '1') {
      img = require('../assets/icons/premiBelumTerbayar_notif.png');
    } else if (item.TYPE === '2') {
      img = require('../assets/icons/agentProfile.png');
    } else if (item.TYPE === '3') {
      img = require('../assets/icons/qs.png');
    }
    console.log(img);
    return (
      <View
        style={{
          flexDirection: 'row',
          minHeight: 50,
          margin: 5,
          paddingLeft: 15,
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Image
            source={img}
            // style={{
            //   flex: 1,
            //   alignSelf: "stretch"
            // }}
            resizeMode="contain"
          />
        </View>
        <View style={{flex: 6, justifyContent: 'center', paddingRight: 10}}>
          <TouchableOpacity>
            <Text>{item.MESSAGE}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _handlePress() {
    console.log(this.state.Data);
  }

  renderSeparator = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            height: 1,
            width: '90%',
            backgroundColor: '#997A2D',
          }}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={{backgroundColor: '#1A1F61', flex: 1}}>
        <Loader loading={this.state.loading} />
        <View style={{backgroundColor: '#fff'}}>
          <FlatList
            // style={styles.container}
            data={this.state.Data}
            renderItem={({item}) => this.renderList(item)}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={item => item.ID}
          />
        </View>

        {/* <View style={{ backgroundColor: "#fff", alignItems: "center" }}>
          <View style={{ flexDirection: "row", minHeight: 80, margin: 5 }}>
            <View style={{ flex: 1 }}>
              <Image
                source={require("../assets/images/call.png")}
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  height: undefined,
                  width: undefined
                }}
                resizeMode="center"
              />
            </View>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text>Hubungi MNC Care</Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: "#997A2D"
              //marginLeft: "5%"
            }}
          />
          <View style={{ flexDirection: "row", minHeight: 80, margin: 5 }}>
            <View style={{ flex: 1 }}>
              <Image
                source={require("../assets/images/call.png")}
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  height: undefined,
                  width: undefined
                }}
                resizeMode="center"
              />
            </View>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text>Hubungi MNC Care</Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: "#997A2D"
              // marginLeft: "5%"
            }}
          />
          <View style={{ flexDirection: "row", minHeight: 80, margin: 5 }}>
            <View style={{ flex: 1 }}>
              <Image
                source={require("../assets/images/call.png")}
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  height: undefined,
                  width: undefined
                }}
                resizeMode="center"
              />
            </View>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text>Hubungi MNC Care</Text>
            </View>
          </View>
        </View> */}

        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.toggleModal()}
          onSwipeComplete={() => this.toggleModal()}
          onBackButtonPress={() => this.toggleModal()}
          style={styles.bottomModal}
          swipeDirection={['down']}
          propagateSwipe>
          <View style={styles.modalContent}>
            <View style={styles.modalContainer}>
              <View>
                <View
                  style={{
                    width: 60,
                    height: 6,
                    backgroundColor: '#997b2e',
                    borderRadius: 5,
                  }}
                />
              </View>
              <View>
                <RadioGroup
                  radioButtons={this.state.pilihanFilter}
                  onPress={this.onRadioButtonPress}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // alignItems: "center"
    // paddingLeft: 5,
    // paddingRight: 20,
    // borderRadius: 20
  },
  listPolis: {
    height: 35,
    color: 'black',
  },
  buttonContainer: {
    paddingTop: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  ViewList: {
    flex: 1,
    padding: 10,
    marginBottom: 20,
  },
  searchIcon: {
    padding: 10,
  },
  ImageStyle: {
    //padding: 1,
    //margin: 1,
    height: 20,
    width: 20,
    //resizeMode: "stretch",
    //alignItems: "center",
  },
  SectionStyle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 22,
    flex: 1,
    padding: 8,
  },
  rightContent: {
    flexDirection: 'column',
    paddingLeft: 5,
  },
  title: {
    color: '#000',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 14,
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
    backgroundColor: 'white',
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 20,
    paddingBottom: 10,
    height: Dimensions.get('window').height / 3,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

//make this component available to the app
export default Notifikasi;
