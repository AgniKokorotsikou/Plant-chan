import React, { Component } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";

export default class ToolsImageBackground extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.bubbleTextTutorial} source={require('./assets/IVYTREE_play_button.png')} resizeMode='stretch'>
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
  bubbleTextTutorial: {
    width: 1080,
    height: 1920,
    transform: [{ scale: 0.25 }],
    top: 240,
    left: 95,
  },
});
