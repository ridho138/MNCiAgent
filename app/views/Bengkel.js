//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import {WorkshopService} from '../services/WorkshopService';
import Loader from '../components/Loader';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {setModalMenu} from '../actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import Input from '../components/Input';
import Modal from 'react-native-modal';

// create a component
class Bengkel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: null,
      city: 'Dki Jakarta',
      loading: false,
      arrayCity: ['Dki Jakarta','Jawa Timur','Sulawesi Utara','Kalimantan Timur','Sulawesi Selatan','Banten','Daerah Istimewa Yogyakarta','Riau','Jawa Tengah','Jawa Barat','Bali','Kalimantan Selatan','Sumatera Selatan','Lampung','Sumatera Utara','Kalimantan Barat'],
      isModalVisible: false,
    };
    this.arrayholder = [];
  }
  componentDidMount = () => {
    this.props.dispatch(setModalMenu(false));
    this.onWorkshopPress();
  };
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  renderList = item => {
    return (
      <Card>
        <CardSection>
          <View style={{flex: 1}}>
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                paddingBottom: 15,
              }}>
              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textTitle}>Nama</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>{item.name}</Text>
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textTitle}>Alamat</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>{item.address}</Text>
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textTitle}>Nomor Telepon</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>{item.phone_no}</Text>
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textTitle}>Nomor Fax</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>{item.fax_no}</Text>
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textTitle}>Kota</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>{item.CITY}</Text>
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textTitle}>Provinsi</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>{item.PROVINCE}</Text>
                </View>
              </View>
            </View>

            {/* <View style={styles.buttonContainer}>
              <Button
                bStyle={{alignSelf: 'stretch', width: undefined}}
                onPress={() => this.onLihatPenawaranPress(item)}>
                LIHAT PENAWARAN
              </Button>
            </View> */}
          </View>
        </CardSection>
      </Card>
    );
  };

  _handlePress() {
    console.log(this.state.Data);
  }

  onWorkshopPress = async () => {
    this.setState({
      loading: true,
    });
    const bengkel = await WorkshopService("");

    this.setState({
      loading: false,
    });
    if (bengkel.status === 'SUCCESS') {
      this.setState({
        Data: bengkel.data,
      });
      this.arrayholder = bengkel.data;
      this.searchFilterFunction("Dki Jakarta")
    } else {
      Alert.alert('Error', bengkel.message);
    }
  };

  searchFilterFunction = async text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.PROVINCE.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    console.log(newData);
    this.setState({Data: newData});
  };

  renderCityList = item => {
    return (
      <View>
        <View style={{padding: 10}}>
          <TouchableOpacity onPress={() => this.onCityPress(item)}>
            <Text style={styles.textBranch}>{item}</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    );
  };

  onCityPress = (item) => {
    // console.log(item)
    this.setState({city: item});
    this.toggleModal();
    this.searchFilterFunction(item)
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#1A1F61',
          flex: 1,
          flexDirection: 'column',
          padding: 30,
        }}>
        <Loader loading={this.state.loading} />

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 5, flexDirection: 'column'}}>
            <Card
              cStyle={{
                borderRadius: 10,
                borderColor: 'transparent',
                shadowRadius: 10,
                marginLeft: 0,
                marginBottom: 0,
                marginTop: 0,
                marginRight: 0,
              }}>
              <CardSection
                cStyle={{
                  // backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: 10,
                  borderBottomWidth: 0,
                  padding: 0,
                }}>
                <View style={styles.searchSection}>
                  <Input
                    tStyle={styles.input}
                    editable={false}
                    value={this.state.city}
                  />
                </View>
              </CardSection>
            </Card>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.toggleModal()}>
              <Image
                resizeMode="contain"
                // style={{
                //   width: 15,
                //   height: 15,
                // }}
                source={require('../assets/icons/down.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 5, marginTop: 29}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              paddingLeft: 10,
              fontWeight: 'bold',
            }}>
            Daftar Bengkel
          </Text>
          <FlatList
            style={styles.flatList}
            data={this.state.Data}
            renderItem={({item}) => this.renderList(item)}
            keyExtractor={item => item.name}
          />
        </View>
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
              <FlatList
                style={styles.flatList}
                data={this.state.arrayCity}
                renderItem={({item}) => this.renderCityList(item)}
                showsVerticalScrollIndicator={false}
                // keyExtractor={item => item.name}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  flatList: {
    flex: 1,
    marginTop: 15,
  },
  rowView: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
  buttonContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    alignItems: 'center',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 3,
  },
  searchIcon: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  input: {
    flex: 1,
    color: '#000',
    // backgroundColor: 'transparent',
  },
  textTitle: {
    color: 'black',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    flex: 1,
  },
  textContent: {
    color: 'black',
    fontSize: '0.75rem',
    flex: 1,
  },
  textBranch: {
    color: 'black',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    textAlign: 'center'
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

const mapStateToProps = state => {
  return {
    data: state.dataModalMenu.isOpen,
  };
};

//make this component available to the app
export default connect(mapStateToProps)(Bengkel);
