import { Text, type TextProps, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export type CustomTextProps = TextProps & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "extraSmall";
};

export function CustomText({
  style,
  type = "default",
  ...rest
}: CustomTextProps) {
  const color = Colors.text;

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "extraSmall" ? styles.extraSmall : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  extraSmall: {
    lineHeight: 16,
    fontSize: 12,
  },
});
