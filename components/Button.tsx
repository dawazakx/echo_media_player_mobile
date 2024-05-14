import React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ViewStyle,
  TextStyle,
  DimensionValue,
} from "react-native";
import { CustomText } from "./Text";
import { Colors } from "@/constants/Colors";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  borderRadius?: number;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  width?: DimensionValue | undefined;
  textColor?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  borderRadius = 4,
  iconLeft,
  iconRight,
  style,
  textStyle,
  width,
  textColor = Colors.text,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { borderRadius, opacity: pressed ? 0.8 : 1, width },
        style,
      ]}
    >
      <View style={styles.content}>
        {iconLeft && iconLeft}
        <CustomText style={[{ color: textColor }, textStyle]}>
          {title}
        </CustomText>
        {iconRight && iconRight}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: Colors.background,
    gap: 10,
  },
});

export default CustomButton;
