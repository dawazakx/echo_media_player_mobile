import React, { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";

import { CustomView } from "./View";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { CustomText } from "./Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import SettingsTab from "@/screens/tabs/SettingsTab";
import { PlaylistContext } from "@/providers/PlaylistProvider";

const Header = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { activePlaylist } = useContext(PlaylistContext);

  return (
    <CustomView
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: insets.top,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: "#111827F2",
      }}
    >
      <Pressable
        style={{
          backgroundColor: "transparent",
          paddingVertical: 7,
          paddingHorizontal: 9,
          flexDirection: "row",
          alignContent: "center",
          borderRadius: 15,
          borderWidth: 1,
          borderColor: "#3f3f46",
          gap: 2,
        }}
      >
        <MaterialIcons name="playlist-play" size={22} color="white" />
        <CustomText type="defaultSemiBold">
          {activePlaylist?.nickname}
        </CustomText>
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
