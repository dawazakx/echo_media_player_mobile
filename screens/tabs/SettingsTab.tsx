import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { TabParamList } from "@/constants/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export interface SettingsProps {
  navigation: BottomTabScreenProps<TabParamList, "Settings">;
  route: RouteProp<TabParamList, "Settings">;
}

const SettingsTab: React.FC<SettingsProps> = ({ navigation, route }) => {
  return (
    <CustomView
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background,
        height: "100%",
      }}
    >
      <CustomText type="title" style={{ textAlign: "center" }}>
        Settings Tab
      </CustomText>
    </CustomView>
  );
};
export default SettingsTab;
const styles = StyleSheet.create({});
