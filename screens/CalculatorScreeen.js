require("../lib/swisscalc.lib.format.js");
require("../lib/swisscalc.lib.operator.js");
require("../lib/swisscalc.lib.operatorCache.js");
require("../lib/swisscalc.lib.shuntingYard.js");
require("../lib/swisscalc.display.numericDisplay.js");
require("../lib/swisscalc.display.memoryDisplay.js");
require("../lib/swisscalc.calc.calculator.js");

import React from "react";
import {
  Text,
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import CalcButton from "../components/CalcButton.js";
import CalcDisplay from "../components/CalcDisplay.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export default class CalculatorScreeen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "0",
      orientation: "potrait",
    };

    // init calc functions
    this.oc = global.swisscalc.lib.operatorCache;
    this.calc = new global.swisscalc.calc.calculator();

    Dimensions.addEventListener("change", () => {
      const { width, height } = Dimensions.get("window");
      var orientation = width > height ? "landscape" : "potrait";
      this.setState({ orientation });
    });

    // init PanResponder
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        if (Math.abs(gestureState.dx) >= 50) {
          this.onBackSpacePress();
        }
      },
    });
  }

  onBackSpacePress() {
    this.calc.backspace();
    this.setState({ display: this.calc.getMainDisplay() });
  }

  onKeyPress(key) {
    this.calc.addDigit(key);
    this.setState({ display: this.calc.getMainDisplay() });
  }

  onClearPress() {
    this.calc.clear();
    this.setState({ display: this.calc.getMainDisplay() });
  }

  onAddSubtractPress() {
    this.calc.negate();
    this.setState({ display: this.calc.getMainDisplay() });
  }

  onBinaryOperatiorPress(operator) {
    this.calc.addBinaryOperator(operator);
    this.setState({ display: this.calc.getMainDisplay() });
  }

  OnEqualsPress() {
    this.calc.equalsPressed();
    this.setState({ display: this.calc.getMainDisplay() });
  }

  onUnaryOperatorPress(operator) {
    this.calc.addUnaryOperator(operator);
    this.setState({ display: this.calc.getMainDisplay() });
  }

  renderPotrait() {
    return (
      <View style={styles.potraitContainer}>
        <View
          {...this.panResponder.panHandlers}
          style={styles.displayContainer}
        >
          <CalcDisplay display={this.state.display} />
        </View>

        {/* controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.controlsRow}>
            {/* history */}
            {/* backspace */}
            <TouchableOpacity style={styles.controlContainer}>
              <SimpleLineIcons name="clock" size={20} color="gray" />
            </TouchableOpacity>

            {/* ruler */}
            {/* backspace */}
            <TouchableOpacity style={styles.controlContainer}>
              <FontAwesome5 name="ruler-horizontal" size={20} color="gray" />
            </TouchableOpacity>

            {/* calculator */}
            {/* backspace */}
            <TouchableOpacity style={styles.controlContainer}>
              <SimpleLineIcons name="calculator" size={20} color="gray" />
            </TouchableOpacity>
          </View>

          <View>
            {/* backspace */}
            <TouchableOpacity
              style={styles.controlContainer}
              onPress={() => this.onBackSpacePress()}
            >
              <MaterialCommunityIcons
                name="backspace-outline"
                size={20}
                color="#64dd17"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* hr */}
        <View style={styles.hr} />

        <View style={styles.btnsContainer}>
          <View style={styles.btnsRow}>
            <CalcButton
              label="C"
              color
              onPress={() => this.onClearPress()}
              color="#ff7043"
              backgroundColor="#263238"
            />
            <CalcButton
              label="+/-"
              onPress={() => this.onAddSubtractPress()}
              color="#64dd17"
              backgroundColor="#263238"
            />
            <CalcButton
              label="%"
              onPress={() => this.onUnaryOperatorPress(this.oc.PercentOperator)}
              color="#64dd17"
              backgroundColor="#263238"
            />
            <CalcButton
              label="/"
              onPress={() =>
                this.onBinaryOperatiorPress(this.oc.DivisionOperator)
              }
              color="#64dd17"
              backgroundColor="#263238"
            />
          </View>

          <View style={styles.btnsRow}>
            <CalcButton
              label="7"
              onPress={() => this.onKeyPress(7)}
              color="white"
              backgroundColor="#263238"
            />
            <CalcButton
              label="8"
              onPress={() => this.onKeyPress(8)}
              color="white"
              backgroundColor="#263238"
            />
            <CalcButton
              label="9"
              onPress={() => this.onKeyPress(9)}
              color="white"
              backgroundColor="#263238"
            />
            <CalcButton
              label="x"
              onPress={() =>
                this.onBinaryOperatiorPress(this.oc.MultiplicationOperator)
              }
              color="#64dd17"
              backgroundColor="#263238"
            />
          </View>

          <View style={styles.btnsRow}>
            <CalcButton
              label="4"
              onPress={() => this.onKeyPress(4)}
              color="white"
              backgroundColor="#263238"
            />
            <CalcButton
              label="5"
              onPress={() => this.onKeyPress(5)}
              color="white"
              backgroundColor="#263238"
            />
            <CalcButton
              label="6"
              onPress={() => this.onKeyPress(6)}
              color="white"
              backgroundColor="#263238"
            />
            <CalcButton
              label="-"
              onPress={() =>
                this.onBinaryOperatiorPress(this.oc.SubtractionOperator)
              }
              color="#64dd17"
              backgroundColor="#263238"
            />
          </View>

          <View style={styles.btnsRow}>
            <CalcButton
              label="1"
              onPress={() => this.onKeyPress(1)}
              color="white"
              backgroundColor="#263238"
              color="white"
              backgroundColor="#263238"
            />
            <CalcButton
              label="2"
              onPress={() => this.onKeyPress(2)}
              color="white"
              backgroundColor="#263238"
              color="white"
              backgroundColor="#263238"
            />
            <CalcButton
              label="3"
              onPress={() => this.onKeyPress(3)}
              color="white"
              backgroundColor="#263238"
              color="white"
              backgroundColor="#263238"
            />
            <CalcButton
              label="+"
              onPress={() =>
                this.onBinaryOperatiorPress(this.oc.AdditionOperator)
              }
              color="#64dd17"
              backgroundColor="#263238"
            />
          </View>

          <View style={styles.btnsRow}>
            <CalcButton
              label="0"
              color="white"
              backgroundColor="#263238"
              style={styles.multiSpan}
            />
            <CalcButton
              label="."
              onPress={() => this.onKeyPress(".")}
              color="white"
              backgroundColor="#263238"
            />
            <CalcButton
              label="="
              onPress={() => this.OnEqualsPress()}
              color="white"
              backgroundColor="#64dd17"
            />
          </View>
        </View>
      </View>
    );
  }

  renderLandScape() {
    return (
      <Text style={{ color: "white" }}>LandScape mode coming soon...</Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" />
        {this.state.orientation === "potrait"
          ? this.renderPotrait()
          : this.renderLandScape()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  potraitContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  btnsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  displayContainer: {
    flex: 1,
    // justifyContent: "flex-end",
    margin: 20,
  },
  multiSpan: {
    flex: 2,
  },
  hr: {
    height: 1,
    backgroundColor: "#212121",
  },
  controlsContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  controlContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  btnsContainer: {
    paddingTop: 20,
  },
  controlsRow: {
    flexDirection: "row",
  },
});
