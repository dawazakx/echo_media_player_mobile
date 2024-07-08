import { Colors } from "@/constants/Colors";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
// import { Palette } from "../constants";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type SegmentedControlProps = {
  options: string[];
  selectedOption: string;
  onOptionPress?: (option: string) => void;
};

const SegmentedControl: React.FC<SegmentedControlProps> = React.memo(
  ({ options, selectedOption, onOptionPress }) => {
    const { width: windowWidth } = useWindowDimensions();

    const internalPadding = 45;
    const segmentedControlWidth = windowWidth - 25;

    const itemWidth =
      (segmentedControlWidth - internalPadding) / options.length;

    const rStyle = useAnimatedStyle(() => {
      return {
        left: withTiming(
          itemWidth * options.indexOf(selectedOption) + internalPadding / 2
        ),
      };
    }, [selectedOption, options, itemWidth]);

    return (
      <View
        style={[
          styles.container,
          {
            width: segmentedControlWidth,
            borderRadius: 10,
            paddingLeft: internalPadding / 2,
          },
        ]}
      >
        <Animated.View
          style={[
            {
              width: itemWidth,
            },
            rStyle,
            styles.activeBox,
          ]}
        />
        {options.map((option) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onOptionPress?.(option);
              }}
              key={option}
              style={[
                {
                  width: itemWidth,
                },
                styles.labelContainer,
              ]}
            >
              <Text style={styles.label}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 45,
    backgroundColor: "#E5E2DC",
  },
  activeBox: {
    position: "absolute",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    elevation: 3,
    height: "80%",
    top: "10%",
    backgroundColor: "#F1EEE8",
  },
  labelContainer: { justifyContent: "center", alignItems: "center" },
  label: {
    // fontFamily: "SF-Compact-Rounded-Medium",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export { SegmentedControl };
