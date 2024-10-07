import React, { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";

import { CustomView } from "./View";
import { Feather } from "@expo/vector-icons";
import { CustomText } from "./Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import SettingsTab from "@/screens/tabs/SettingsTab";

const Header = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <CustomView
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: insets.top,
        paddingBottom: 5,
        paddingHorizontal: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: "#111827F2",
      }}
    >
      <Pressable style={styles.iconContainer} onPress={() => {}}>
        {/* <Feather name="menu" size={24} color="white" /> */}
        <Image
          source={require("../assets/logob.png")}
          contentFit="contain"
          style={{
            width: 35,
            height: 35,
            backgroundColor: "white",
            borderRadius: 18,
            padding: 10,
          }}
        />
        <CustomText type="defaultSemiBold">Echo Media Player</CustomText>
      </Pressable>
      <Pressable
        style={styles.iconContainer}
        onPress={() => navigation.navigate("Search")}
      >
        <Feather name="search" size={24} color="white" />
      </Pressable>
    </CustomView>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Header;
