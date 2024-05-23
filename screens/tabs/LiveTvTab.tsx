import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { TabParamList } from "@/constants/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";

export interface LiveTvProps {
  navigation: BottomTabScreenProps<TabParamList, "LiveTV">;
  route: RouteProp<TabParamList, "LiveTV">;
}

const LiveTvTab: React.FC<LiveTvProps> = ({ navigation, route }) => {
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
        LiveTV Tab
      </CustomText>
    </CustomView>
  );
};
export default LiveTvTab;
const styles = StyleSheet.create({});
