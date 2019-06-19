import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { gyroscope } from "react-native-sensors";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      z: 0
    };
  }

  componentDidMount() {
    const subscription = gyroscope.subscribe(({ x, y, z }) => {
      x = x.toFixed(2);
      y = y.toFixed(2);
      z = z.toFixed(2);
      this.setState({ x, y, z });
    });

    this.setState({ subscription });
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> X ----> {this.state.x} </Text>
        <Text> Y ----> {this.state.y} </Text>
        <Text> Z ----> {this.state.z} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
