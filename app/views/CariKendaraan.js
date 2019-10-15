//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import {GetVehicleService} from '../services/GetVehicleService';
import Loader from '../components/Loader';
import {toDate} from '../utils/Utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../components/Input';
import EStyleSheet from 'react-native-extended-stylesheet';

// create a component
class CariKendaraan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: null,
      keyword: '',
      loading: false,
    };
  }

  onPilihPress = item => {
    this.props.navigation.navigate('Simulasi', {item});
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
                  <Text style={styles.textTitle}>Code</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>{item.code}</Text>
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textTitle}>Description</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>{item.description}</Text>
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={{flex: 1}}>
                  <Text style={styles.textTitle}>Merk</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.textContent}>{item.vehicle_model}</Text>
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                bStyle={{alignSelf: 'stretch', width: undefined}}
                onPress={() => this.onPilihPress(item)}>
                PILIH
              </Button>
            </View>
          </View>
        </CardSection>
      </Card>
    );
  };

  onSearchKendaraanPress = async () => {
    this.setState({
      loading: true,
    });
    const {keyword} = this.state;
    const dataKendaraan = await GetVehicleService(keyword);

    if (dataKendaraan.status === 'SUCCESS') {
      this.setState({
        Data: dataKendaraan.data,
      });
    } else {
      Alert.alert('Error', dataKendaraan.message);
    }
    this.setState({
      loading: false,
    });
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
              {/* <Icon
                style={styles.searchIcon}
                name="search"
                size={15}
                color="#ddd"
              /> */}
              <Image
                resizeMode="contain"
                style={{
                  //paddingRight: 10,
                  //position: "absolute",
                  width: 15,
                  height: 15,
                }}
                source={require('../assets/icons/search.png')}
              />
              <Input
                tStyle={styles.input}
                placeholder="Cari Kendaraan"
                placeholderTextColor="#fff"
                underlineColorAndroid="transparent"
                onChangeText={val => {
                  this.setState({keyword: val});
                }}
                onSubmitEditing={() => this.onSearchKendaraanPress()}
                returnKeyType="search"
              />
            </View>
          </CardSection>
        </Card>
        <View style={{flex: 5, marginTop: 29}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              paddingLeft: 10,
              fontWeight: 'bold',
            }}>
            Daftar Kendaraan
          </Text>
          <FlatList
            style={styles.flatList}
            data={this.state.Data}
            renderItem={({item}) => this.renderList(item)}
            keyExtractor={item => item.code}
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

//make this component available to the app
export default CariKendaraan;
