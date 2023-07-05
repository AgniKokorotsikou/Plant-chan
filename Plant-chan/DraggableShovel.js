import React, { Component } from "react";
import { StyleSheet, View, PanResponder, Animated, Image } from "react-native";

export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY({ x: 0, y: 0 }),
    };
  }

   UNSAFE_componentWillMount() {
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener((value) => (this._val = value));

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y },
      ]),
      onPanResponderRelease: (e, gesture) => {
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
        }).start();
      },
    });
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };

    return (
      <View style={styles.container}>
        <Animated.View style={panStyle}>
          <Image
            source={require("./assets/IVYTREE_tools_shovel.png")}
            style={styles.toolsDraggableImage}
            {...this.panResponder.panHandlers}
          />
        </Animated.View>
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

  toolsDraggableImage: {
    top: 0,
    right: 0,
    width: 399,
    height: 451,
    transform: [{ scale: 0.45 }],
    zIndex: 25,
  },
});
