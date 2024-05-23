import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { TabParamList } from "@/constants/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import React from "react";

export interface MoviesProps {
  navigation: BottomTabScreenProps<TabParamList, "Movies">;
  route: RouteProp<TabParamList, "Movies">;
}

const MoviesTab: React.FC<MoviesProps> = ({ navigation, route }) => {
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
        Movies Tab
      </CustomText>
    </CustomView>
  );
};
export default MoviesTab;
