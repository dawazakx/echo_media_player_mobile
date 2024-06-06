import { Collapsible } from "@/components/Collapsible";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PlaylistDetails = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { playlistId } = route.params;

  // Fetch playlist details based on playlistId if needed
  // For now, we're just displaying the ID
  return (
    <CustomView
      style={{
        paddingTop: insets.top,
        backgroundColor: Colors.secBackground,
        height: "100%",
      }}
    >
      <CustomView
        style={{
          marginHorizontal: 12,
          marginTop: 15,
          marginBottom: 35,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <Pressable
          style={styles.backBtn}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back" size={32} color={Colors.white} />
        </Pressable>

        <CustomText type="subtitle">Playlist Manager</CustomText>
      </CustomView>

      <CustomView style={{ gap: 25, backgroundColor: "transparent" }}>
        <CustomText type="subtitle" style={{ textAlign: "center" }}>
          Playlist Details for ID: {playlistId}
        </CustomText>
        <Collapsible title="Favorites"></Collapsible>
        <Collapsible title="Watch List"></Collapsible>
      </CustomView>
    </CustomView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  backBtn: {
    position: "absolute",
    left: 0,
    backgroundColor: "transparent",
  },
});

export default PlaylistDetails;
