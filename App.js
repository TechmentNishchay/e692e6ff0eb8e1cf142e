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
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';



class App extends Component {

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View>
              <Text>sdfjsdjkfsbdkfbdskfdsbfkjdsf</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }

}


const styles = StyleSheet.create({
});

export default App;




