import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { CustomView } from "./View";
import { Feather } from "@expo/vector-icons";
import { CustomText } from "./Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";

const Header = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <CustomView
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: insets.top,
        paddingBottom: 5,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
      }}
    >
      <Pressable
        style={styles.iconContainer}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        {/* <Feather name="menu" size={24} color="white" /> */}
        <Image
          source={require("../assets/whiteLogo.png")}
          contentFit="contain"
          style={{
            width: 35,
            height: 35,
            backgroundColor: "white",
            borderRadius: 18,
            padding: 10,
          }}
        />
      </Pressable>
      <CustomText type="subtitle">Playlist Name</CustomText>
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
  },
  playlistName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Header;