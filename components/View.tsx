import { View, type ViewProps } from "react-native";
import { Colors } from "@/constants/Colors";

export type CustomViewProps = ViewProps;

export function CustomView({ style, ...otherProps }: ViewProps) {
  const backgroundColor = Colors.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
