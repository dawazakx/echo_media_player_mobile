import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { TabParamList } from "@/constants/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import React from "react";

export interface SportsProps {
  navigation: BottomTabScreenProps<TabParamList, "Sports">;
  route: RouteProp<TabParamList, "Sports">;
}

const SportsTab: React.FC<SportsProps> = ({ navigation, route }) => {
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
        Sports Tab
      </CustomText>
    </CustomView>
  );
};
export default SportsTab;
