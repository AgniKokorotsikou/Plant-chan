import React, { Component } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class ToolsImageTutorial extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.toolBackground} source={require('./assets/IVYTREE_tools_background.png')} resizeMode='stretch'>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },
  toolBackground: {
    flex: 1,
    height: hp('100%'),
    width: wp('100%'), 
    alignItems: 'stretch',
    zIndex: 1,
  },
});
