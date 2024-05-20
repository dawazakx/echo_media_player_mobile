import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
const SettingsTab = () => {
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
