import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
const LiveTvTab = () => {
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
