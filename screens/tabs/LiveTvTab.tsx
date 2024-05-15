import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
const LiveTvTab = () => {
  return (
    <CustomView
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.tint,
        height: "100%",
      }}
    >
      <CustomText
        type="title"
        style={{ textAlign: "center", color: Colors.background }}
      >
        LiveTV Tab
      </CustomText>
    </CustomView>
  );
};
export default LiveTvTab;
const styles = StyleSheet.create({});
