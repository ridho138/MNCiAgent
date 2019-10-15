import React, {Component} from 'react';
import {View, Text, Alert, Dimensions, FlatList, TouchableOpacity, Image} from 'react-native';
import {OutstandingPremiumService} from '../services/OutstandingPremiumService';
import Loader from '../components/Loader';
import EStyleSheet from 'react-native-extended-stylesheet';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import {toDate} from '../utils/Utils';
import Input from '../components/Input';
import Button from '../components/Button';
import NumberFormat from 'react-number-format';
import {connect} from 'react-redux';
import {setModalMenu} from '../actions';

// create a component
class PremiBelumTerbayar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: null,
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
    this.props.navigation.setParams({loadData: this.loadData});
    this.loadData()
  };

  loadData = async () => {
    this.setState({
      loading: true,
    });

    const outstandingPremium = await OutstandingPremiumService();
    this.setState({
      loading: false,
    });
    if (outstandingPremium.status === 'SUCCESS') {
      this.setState({
        data: outstandingPremium.data,
      });
    } else {
      Alert.alert('Error', outstandingPremium.message);
    }
  }

  onDetailPress = cob => {
    this.props.navigation.navigate('Daftar Premi Belum Terbayar', {
      cob,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <FlatList
          data={this.state.data}
          style={{flex: 1, marginTop: 10}}
          keyExtractor={item => item.COB}
          renderItem={({item}) => {
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
                          <Text style={styles.textTitle}>COB</Text>
                        </View>
                        <View style={{flex: 1}}>
                          <Text style={styles.textContent}>{item.COB}</Text>
                        </View>
                      </View>

                      <View style={styles.rowView}>
                        <View style={{flex: 1}}>
                          <Text style={styles.textTitle}>Outstanding</Text>
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
                          <Text style={styles.textTitle}>Aging Undue</Text>
                        </View>
                        <View style={{flex: 1}}>
                          <NumberFormat
                            value={item.AGING_UNDUE}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp '}
                            renderText={value => (
                              <Text style={styles.textContent}>{value} ({item.POLICY_AGING_UNDUE} Polis)</Text>
                            )}
                          />
                        </View>
                      </View>

                      <View style={styles.rowView}>
                        <View style={{flex: 1}}>
                          <Text style={styles.textTitle}>Aging 1-30</Text>
                        </View>
                        <View style={{flex: 1}}>
                          <NumberFormat
                            value={item.AGING_1_30}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp '}
                            renderText={value => (
                              <Text style={styles.textContent}>{value} ({item.POLICY_AGING_1_30} Polis)</Text>
                            )}
                          />
                        </View>
                      </View>

                      <View style={styles.rowView}>
                        <View style={{flex: 1}}>
                          <Text style={styles.textTitle}>Aging 31-60</Text>
                        </View>
                        <View style={{flex: 1}}>
                          <NumberFormat
                            value={item.AGING_31_60}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp '}
                            renderText={value => (
                              <Text style={styles.textContent}>{value} ({item.POLICY_AGING_31_60} Polis)</Text>
                            )}
                          />
                        </View>
                      </View>

                      <View style={styles.rowView}>
                        <View style={{flex: 1}}>
                          <Text style={styles.textTitle}>Aging >60</Text>
                        </View>
                        <View style={{flex: 1}}>
                          <NumberFormat
                            value={
                              item.AGING_61_90 +
                              item.AGING_91_120 +
                              item.AGING_121_365 +
                              item.AGING_365_ABOVE
                            }
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp '}
                            renderText={value => (
                              <Text style={styles.textContent}>{value} ({item.POLICY_AGING_61_90 + item.POLICY_AGING_91_120 + item.POLICY_AGING_121_365 + item.POLICY_AGING_ABOVE_365} Polis)</Text>
                            )}
                          />
                        </View>
                      </View>
                    </View>

                    <View style={styles.buttonContainer}>
                      <Button
                        bStyle={{alignSelf: 'stretch', width: undefined}}
                        onPress={() => this.onDetailPress(item.COB)}>
                        LIHAT PREMI
                      </Button>
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
    paddingBottom: 5,
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
  buttonContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    alignItems: 'center',
  },
});
const mapStateToProps = state => {
  return {
    data: state.dataModalMenu.isOpen,
  };
};

//make this component available to the app
export default connect(mapStateToProps)(PremiBelumTerbayar);
