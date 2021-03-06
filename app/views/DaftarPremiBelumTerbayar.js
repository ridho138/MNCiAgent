import React, {Component} from 'react';
import {View, Text, Alert, Dimensions, FlatList, Image, TouchableOpacity} from 'react-native';
import {OutstandingPremiumDetailService} from '../services/OutstandingPremiumDetailService';
import Loader from '../components/Loader';
import EStyleSheet from 'react-native-extended-stylesheet';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import {toDate} from '../utils/Utils';
import Input from '../components/Input';
import NumberFormat from 'react-number-format';

// create a component
class DaftarPremiBelumTerbayar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: null,
      hasilFilter: '',
      keyword: '',
    };
    this.arrayholder = [];
  }

  componentDidMount = async () => {
    this.setState({
      loading: true,
    });
    const {navigation} = this.props;
    const cob = navigation.getParam('cob');

    const outstandingPremium = await OutstandingPremiumDetailService(cob);
    this.setState({
      loading: false,
    });
    if (outstandingPremium.status === 'SUCCESS') {
      this.setState({
        data: outstandingPremium.data,
      });
      this.arrayholder = outstandingPremium.data;
    } else {
      Alert.alert('Error', outstandingPremium.message);
    }
  };

  searchFilterFunction = () => {
    const text = this.state.keyword;
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.POLICY_NO.toUpperCase()}   
      ${item.INSURED_NAME.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    let hasilFilter = '';
    if (newData.length === 0) {
      hasilFilter = 'Data tidak ditemukan';
    }
    this.setState({data: newData, hasilFilter});
  };
  onBatalPress = async () => {
    await this.setState({keyword: ''});
    this.searchFilterFunction();
  };
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
  hasilFilter = () => {
    const {hasilFilter} = this.state;
    if (hasilFilter !== '') {
      return (
        <Text
          style={{
            color: 'red',
            fontSize: 14,
            paddingLeft: 10,
          }}>
          {hasilFilter}
        </Text>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
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
        {this.hasilFilter()}
        <FlatList
          data={this.state.data}
          style={{flex: 1, marginTop: 10}}
          keyExtractor={item => item.POLICY_NO}
          renderItem={({item}) => {
            return (
              <Card>
                <CardSection>
                  <View
                    style={{
                      flex: 1,
                      padding: 15,
                    }}>
                    <View style={styles.rowView}>
                      <View style={{flex: 1}}>
                        <Text style={styles.textTitle}>COB</Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={styles.textContent}>{item.COB}</Text>
                      </View>
                    </View>
                    <View style={styles.rowView}>
                      <View style={{flex: 1}}>
                        <Text style={styles.textTitle}>No. Polis</Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={styles.textContent}>{item.POLICY_NO}</Text>
                      </View>
                    </View>
                    <View style={styles.rowView}>
                      <View style={{flex: 1}}>
                        <Text style={styles.textTitle}>Nama Tertanggung</Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={styles.textContent}>
                          {item.INSURED_NAME}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.rowView}>
                      <View style={{flex: 1}}>
                        <Text style={styles.textTitle}>Premi</Text>
                      </View>
                      <View style={{flex: 1}}>
                        <NumberFormat
                          value={item.CURRENT_TOTAL}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'Rp '}
                          renderText={value => (
                            <Text style={styles.textContent}>{value}</Text>
                          )}
                        />
                      </View>
                    </View>
                    <View style={styles.rowView}>
                      <View style={{flex: 1}}>
                        <Text style={styles.textTitle}>Aging</Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={styles.textContent}>{item.Aging}</Text>
                      </View>
                    </View>
                  </View>
                </CardSection>
              </Card>
            );
          }}
        />
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06397B',
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  rowView: {
    flexDirection: 'row',
  },
  textTitle: {
    color: 'black',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  textContent: {
    color: 'black',
    fontSize: '0.75rem',
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
});

//make this component available to the app
export default DaftarPremiBelumTerbayar;
