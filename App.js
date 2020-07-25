/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import axios from 'axios'
import { SvgUri } from 'react-native-svg';
import Svg from 'react-native-svg';

class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      countryText: '',
      buttonEnableDisable: true,
      countryData: [],
      weatherObject: null
    }
  }

  onCounterChange = (text) => {
    this.setState({ countryText: text })
    if (text != '') {
      this.setState({ buttonEnableDisable: false })
    } else {
      this.setState({ buttonEnableDisable: true })
    }
  }


  clickOnSubmit = async () => {
    const { countryText } = this.state;
    await axios.get(`https://restcountries.eu/rest/v2/name/${countryText}`)
      .then((response) => {
        console.log('response.data  response.data ', response.data)
        this.setState({ countryData: response.data })
      })
      .catch(function (error) {
        console.log(error);
      })


  }

  capitalWeatherClick = async (capital) => {

    await axios.get(`http://api.weatherstack.com/current?access_key=c3bd1bf2b382d5ec917693248648caa7&query=${capital}`)
      .then((response) => {
        console.log('response.data  response.data ', response.data)
        this.setState({ weatherObject: response.data.current, countryText: '', buttonEnableDisable: true })
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  renderCounterItem = (item) => {
    return (
      <View style={styles.tableRow}>
        <View style={styles.tableColumn}>
          <Text>{item.capital}</Text>
        </View>
        <View style={styles.tableColumn}>
          <Text>{item.population}</Text>
        </View >
        <View style={styles.tableColumn}>
          <Text>{'(' + item.latlng[0] + ',' + item.latlng[1] + ')'}</Text>
        </View>
        <View style={styles.tableColumn}>
          <Svg width="50" height="30">
            <SvgUri
              uri={item.flag}
            />
          </Svg>
        </View>
        <TouchableOpacity style={styles.tableColumn} onPress={() => this.capitalWeatherClick(item.capital)}>
          <Text style={{ fontWeight: '600' }}>Capital Weather</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { buttonEnableDisable, countryData, weatherObject } = this.state;
    return (
      <>
        {weatherObject != null ? <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity style={styles.backButtonMain} onPress={() => this.setState({ weatherObject: null })}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={{ width: '100%', paddingTop: 30, justifyContent: 'center', alignItems: 'center' }}>
              <View >
                <Image style={{ width: 100, height: 100 }}
                  resizeMode={'contain'}
                  source={{
                    uri: weatherObject.weather_icons[0],
                  }} />
              </View>
              <View style={styles.weatherCenterMain}>
                <Text> <Text style={{ fontWeight: '600' }}>Temperature :</Text>{weatherObject.temperature}</Text>
              </View>
              <View tyle={styles.weatherCenterMain}>
                <Text> <Text style={{ fontWeight: '600' }}>Wind Speed :</Text>{weatherObject.wind_speed}</Text>
              </View>
              <View tyle={styles.weatherCenterMain}>
                <Text><Text style={{ fontWeight: '600' }}>Precip :</Text>{weatherObject.precip}</Text>
              </View>
            </View>
          </SafeAreaView>
        </> :
          <>
            {
              countryData.length > 0 ? <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={{ flex: 1 }}>
                  <TouchableOpacity style={styles.backButtonMain} onPress={() => this.setState({ countryData: [] })}>
                    <Text style={styles.backButtonText}>Back</Text>
                  </TouchableOpacity>
                  <View style={styles.tableHeader}>
                    <View style={styles.tableColumn}>
                      <Text style={{ fontWeight: '600' }}>Capital</Text>
                    </View>
                    <View style={styles.tableColumn}>
                      <Text style={{ fontWeight: '600' }}>Population</Text>
                    </View >
                    <View style={styles.tableColumn}>
                      <Text style={{ fontWeight: '600' }}>Latlng</Text>
                    </View>
                    <View style={styles.tableColumn}>
                      <Text style={{ fontWeight: '600' }}>Flag</Text>
                    </View>
                    <View style={styles.tableColumn}>
                      <Text style={{ fontWeight: '600' }}>Action</Text>
                    </View>
                  </View>
                  <FlatList
                    data={countryData}
                    renderItem={(item) => this.renderCounterItem(item.item)}
                    keyExtractor={item => item.name}
                  />
                </SafeAreaView>
              </> :
                <>
                  <StatusBar barStyle="dark-content" />
                  <SafeAreaView style={styles.mainContainer}>
                    <View style={styles.mainView}>
                      <View style={styles.textView}>
                        <TextInput
                          placeholder='Enter country'
                          value={this.state.countryText}
                          onChangeText={(text) => this.onCounterChange(text)}
                        />
                      </View>
                      <View style={styles.buttonView}>
                        <TouchableOpacity disabled={buttonEnableDisable}
                          style={[styles.touchableButton, buttonEnableDisable ? { opacity: 0.5 } : { opacity: 1 }]}
                          onPress={() => this.clickOnSubmit()}>
                          <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </SafeAreaView>
                </>
            }
          </>}
      </>
    )
  }


}


const styles = StyleSheet.create({
  mainContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mainView: { width: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  textView: { width: '70%', borderWidth: 1, borderColor: 'grey', padding: 10, borderRadius: 25 },
  buttonView: { width: '100%', paddingTop: 20, justifyContent: 'center', alignItems: 'center' },
  touchableButton: { width: '50%', borderRadius: 25, height: 40, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' },
  submitText: { color: 'white', fontWeight: '600' },
  tableColumn: { width: '20%', justifyContent: 'center', alignItems: 'center' },
  tableHeader: { marginTop: 30, width: '100%', paddingHorizontal: 10, paddingBottom: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'grey' },
  tableRow: { width: '100%', paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'grey' },
  backButtonMain: { marginTop: 10, width: '100%' },
  backButtonText: { color: 'black', paddingLeft: 20, fontWeight: '700' },
  weatherCenterMain: { paddingTop: 20, justifyContent: 'center', alignItems: 'center' }

});

export default App;




