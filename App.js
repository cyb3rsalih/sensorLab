import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  gyroscope,
  accelerometer,
  magnetometer,
  barometer,
  setUpdateIntervalForType,
  SensorTypes
} from "react-native-sensors";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gx: 0,
      gy: 0,
      gz: 0,
      ax: 0,
      ay: 0,
      az: 0,
      mx: 0,
      my: 0,
      mz: 0,
      timestamp: 0,
      pressure: 0
    };
  }

  componentDidMount() {
    setUpdateIntervalForType(SensorTypes.accelerometer, 500);
    setUpdateIntervalForType(SensorTypes.gyroscope, 500);
    setUpdateIntervalForType(SensorTypes.magnetometer, 500);
    setUpdateIntervalForType(SensorTypes.barometer, 500);

    const subscription = gyroscope.subscribe(({ x, y, z }) => {
      gx = x.toFixed(2);
      gy = y.toFixed(2);
      gz = z.toFixed(2);
      this.setState({ gx, gy, gz });
    });

    const subscription2 = accelerometer.subscribe(({ x, y, z }) => {
      ax = x.toFixed(2);
      ay = y.toFixed(2);
      az = z.toFixed(2);
      this.setState({ ax, ay, az });
    });

    const subscription3 = magnetometer.subscribe(({ x, y, z }) => {
      mx = x.toFixed(2);
      my = y.toFixed(2);
      mz = z.toFixed(2);

      this.setState({ mx, my, mz });
    });

    const subscription4 = barometer.subscribe(({ pressure }) => {
      pressure = pressure.toFixed(2);
      this.setState({ pressure });
    });

    this.setState({
      subscription,
      subscription2,
      subscription3,
      subscription4
    });

    alert("LAAN");
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
    this.state.subscription2.unsubscribe();
    this.state.subscription3.unsubscribe();
    this.state.subscription4.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Gyroscope </Text>
        <Text> X ----> {this.state.gx} </Text>
        <Text> Y ----> {this.state.gy} </Text>
        <Text> Z ----> {this.state.gz} </Text>
        <Text> --------------------------------------------</Text>
        <Text> Accelerometer </Text>
        <Text> X ----> {this.state.ax} </Text>
        <Text> Y ----> {this.state.ay} </Text>
        <Text> Z ----> {this.state.az} </Text>
        <Text> --------------------------------------------</Text>
        <Text> Magnetometer </Text>
        <Text> X ----> {this.state.mx} </Text>
        <Text> Y ----> {this.state.my} </Text>
        <Text> Z ----> {this.state.mz} </Text>
        <Text> --------------------------------------------</Text>
        <Text> Barometer </Text>
        <Text> Pressure ----> {this.state.pressure} </Text>
        <Text> --------------------------------------------</Text>
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
