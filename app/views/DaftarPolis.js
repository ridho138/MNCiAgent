//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import {SearchPolicyService} from '../services/SearchPolicyService';
import Loader from '../components/Loader';
import {toDate} from '../utils/Utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../components/Input';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';
import {setModalMenu} from '../actions';

// create a component
class DaftarPolis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: null,
      keyword: '',
      loading: false,
    };
    this.arrayholder = [];
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerRight: (
        <View style={{flex: 1, flexDirection: 'row', paddingRight: 30}}>
          <TouchableOpacity onPress={() => params.loadData()}>
            <Image
              resizeMode="contain"
              style={{
                //paddingRight: 10,
                //position: "absolute",
                width: 30,
                height: 30,
              }}
              source={require('../assets/icons/refresh.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    };
  };

  componentDidMount = () => {
    this.props.dispatch(setModalMenu(false));
    this.props.navigation.setParams({loadData: this.getData});
    this.loadData('');
  };

  getData = () => {
    this.setState({keyword: ''});
    this.loadData('');
  };

  loadData = async keyword => {
    this.arrayholder = [];
    this.setState({
      loading: true,
    });
    const policyData = await SearchPolicyService(keyword);
    this.setState({
      loading: false,
    });
    if (policyData.status === 'SUCCESS') {
      this.setState({
        Data: policyData.data,
      });
      this.arrayholder = policyData.data;
    } else {
      Alert.alert('Info', policyData.message);
    }
  };

  onClaimPress = (
    policy_no,
    license_no1,
    license_no2,
    license_no3,
    interest_insured,
  ) => {
    const license_no = `${license_no1}-${license_no2}-${license_no3}`;
    this.props.navigation.navigate('Pelapor Klaim', {
      policy_no,
      license_no,
      interest_insured,
    });
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
                  <Text style={styles.textTitle}>Nomor Polis</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>{item.POLICY_NO}</Text>
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textTitle}>Nomor Plat</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>
                    {item.license_no1}-{item.license_no2}-{item.license_no3}
                  </Text>
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textTitle}>Nama Tertanggung</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>
                    {item.INTEREST_INSURED}
                  </Text>
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textTitle}>Tanggal Efektif</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>
                    {toDate(item.EFF_DATE)}
                  </Text>
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textTitle}>Tanggal Kaduluarsa</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>
                    {toDate(item.EXP_DATE)}
                  </Text>
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textTitle}>Status Polis</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>{item.POLICY_STATUS}</Text>
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textTitle}>Status Premi</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>{item.PAYMENT_STATUS}</Text>
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                bStyle={{alignSelf: 'stretch', width: undefined}}
                onPress={() =>
                  this.onClaimPress(
                    item.POLICY_NO,
                    item.license_no1,
                    item.license_no2,
                    item.license_no3,
                    item.INTEREST_INSURED,
                  )
                }>
                KLAIM
              </Button>
            </View>
          </View>
        </CardSection>
      </Card>
    );
  };

  _handlePress() {
    console.log(this.state.Data);
  }

  searchFilterFunction = () => {
    const text = this.state.keyword;
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.POLICY_NO.toUpperCase()}   
      ${item.INTEREST_INSURED.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    console.log(newData);
    if (newData.length === 0) {
      this.loadData(text);
    } else {
      this.setState({Data: newData});
    }
  };
  onBatalPress = async () => {
    await this.setState({keyword: ''});
    this.searchFilterFunction();
  }
  renderBatal = () => {
    const {keyword} = this.state;
    if (keyword !== '') {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.onBatalPress()}>
            <Text style={{color: 'white'}}>Batal</Text>
          </TouchableOpacity>
        </View>
      );
    }
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

        {/* <Card
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
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: 10,
              borderBottomWidth: 0,
              padding: 0,
            }}>
            <View style={styles.searchSection}>
              
              <Image
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 15,
                }}
                source={require('../assets/icons/search.png')}
              />
              <Input
                tStyle={styles.input}
                placeholder="Cari Polis"
                placeholderTextColor="#fff"
                underlineColorAndroid="transparent"
                onChangeText={val => {
                  this.setState({keyword: val});
                }}
                onSubmitEditing={() => this.searchFilterFunction()}
                value={this.state.keyword}
                returnKeyType="search"
                onBlur={() => this.setState({keyword:""})}
              />
              
            </View>
          </CardSection>
        </Card> */}
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
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: 10,
                  borderBottomWidth: 0,
                  padding: 0,
                }}>
                <View style={styles.searchSection}>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 15,
                      height: 15,
                    }}
                    source={require('../assets/icons/search.png')}
                  />
                  <Input
                    tStyle={styles.input}
                    placeholder="Cari Polis"
                    placeholderTextColor="#fff"
                    underlineColorAndroid="transparent"
                    onChangeText={val => {
                      this.setState({keyword: val});
                    }}
                    onSubmitEditing={() => this.searchFilterFunction()}
                    value={this.state.keyword}
                    returnKeyType="search"
                  />
                </View>
              </CardSection>
            </Card>
          </View>
          {this.renderBatal()}
        </View>
        <View style={{flex: 5, marginTop: 29}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              paddingLeft: 10,
              fontWeight: 'bold',
            }}>
            Daftar Polis
          </Text>
          <FlatList
            style={styles.flatList}
            data={this.state.Data}
            renderItem={({item}) => this.renderList(item)}
            keyExtractor={item =>
              item.POLICY_NO + Math.floor(Math.random() * 100) + 1
            }
          />
        </View>
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
    // width:'100%',
    color: '#fff',
    backgroundColor: 'transparent',
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
});

const mapStateToProps = state => {
  return {
    data: state.dataModalMenu.isOpen,
  };
};

//make this component available to the app
export default connect(mapStateToProps)(DaftarPolis);
