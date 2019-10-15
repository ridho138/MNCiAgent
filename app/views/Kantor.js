//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import {BranchService} from '../services/BranchService';
import Loader from '../components/Loader';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {setModalMenu} from '../actions';
import Input from '../components/Input';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';

// create a component
class Kantor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: null,
      keyword: 'Kantor Pusat',
      loading: false,
      isModalVisible: false,
    };
    this.arrayholder = [];
  }
  componentDidMount = () => {
    this.props.dispatch(setModalMenu(false));
    this.onSearchOfficePress();
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
                  <Text style={styles.textTitle}>{item.NAME}</Text>
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>{item.ADDRESS}</Text>
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>TEL {item.PHONE_NO}</Text>
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>FAX {item.FAX_NO}</Text>
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

  onSearchOfficePress = async () => {
    this.setState({
      loading: true,
    });
    const {keyword} = this.state;
    const officeData = await BranchService(keyword);
    this.setState({
      loading: false,
    });
    if (officeData.status === 'SUCCESS') {
      this.setState({
        Data: officeData.data,
      });
      this.arrayholder = officeData.data;
      this.searchFilterFunction("HO")
    } else {
      Alert.alert('Error', officeData.message);
    }
  };

  onFilterPress = text => {
    this.setState({keyword: text});
    this.toggleModal();
    let filter = ''
    if(text === "Kantor Pusat"){
      filter = 'HO'
    } else if(text === "Kantor Cabang"){
      filter = 'BRANC'
    } else if(text === "Kantor Pemasaran"){
      filter = 'REP'
    }
    this.searchFilterFunction(filter)
  };

  searchFilterFunction = async text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.BRANCH_TYPE_GSC.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    
    this.setState({Data: newData});
  };

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
                    value={this.state.keyword}
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
            Daftar Kantor
          </Text>
          <FlatList
            style={styles.flatList}
            data={this.state.Data}
            renderItem={({item}) => this.renderList(item)}
            keyExtractor={item => item.code}
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
              <View style={{padding: 10, marginTop: 20}}>
                <TouchableOpacity onPress={() => this.onFilterPress('Kantor Pusat')}>
                  <Text style={styles.textBranch}>Kantor Pusat</Text>
                </TouchableOpacity>
              </View>
              <View style={{padding: 10}}>
                <TouchableOpacity onPress={() => this.onFilterPress('Kantor Cabang')}>
                  <Text style={styles.textBranch}>Kantor Cabang</Text>
                </TouchableOpacity>
              </View>
              <View style={{padding: 10}}>
                <TouchableOpacity onPress={() => this.onFilterPress('Kantor Pemasaran')}>
                  <Text style={styles.textBranch}>Kantor Pemasaran</Text>
                </TouchableOpacity>
              </View>
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
export default connect(mapStateToProps)(Kantor);
