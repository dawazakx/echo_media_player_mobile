import React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ViewStyle,
  TextStyle,
  DimensionValue,
  ActivityIndicator,
} from "react-native";
import { CustomText } from "./Text";
import { Colors } from "@/constants/Colors";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  borderRadius?: number;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: ViewStyle | (ViewStyle | undefined)[];
  textStyle?: TextStyle | (TextStyle | undefined)[];
  width?: DimensionValue | undefined;
  textColor?: string;
  disabled?: boolean;
  loading?: boolean;
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
  disabled = false,
  loading = false,
}) => {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.button,
        { borderRadius, opacity: pressed ? 0.8 : 1, width },
        ...(Array.isArray(style) ? style : [style]),
      ]}
    >
      <View style={styles.content}>
        {iconLeft && iconLeft}
        {
          loading
            ? <ActivityIndicator size="small" color={textColor} />
            : <CustomText style={[{ color: textColor }, textStyle]}>
              {title}
            </CustomText>
        }
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
