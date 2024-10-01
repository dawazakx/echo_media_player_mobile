import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { ADD_PLAYLIST_ROUTE, PLAYER_INDEX_ROUTE } from "@/constants/Routes";
import { PlaylistContext } from "@/providers/PlaylistProvider";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const PlaylistSelect = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { activePlaylist, userPlaylists } = useContext(PlaylistContext);

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

        <CustomText type="subtitle">Select a Playlist</CustomText>
      </CustomView>

      <CustomView
        style={{
          flexDirection: "row",
          gap: 15,
          padding: 15,
          marginHorizontal: 12,
          alignSelf: "center",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        {userPlaylists.map((playlist) => (
          <Pressable
            style={{
              gap: 2,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 15,
              backgroundColor: "#374151",
              borderRadius: 10,
              width: "50%",
            }}
            onPress={() => navigation.navigate(PLAYER_INDEX_ROUTE)}
            key={playlist?._id}
          >
            <View>
              <CustomText type="defaultSemiBold">
                {playlist?.nickname}
              </CustomText>
              {/* <CustomText type="extraSmall">{playlist?.url}</CustomText> */}
            </View>
          </Pressable>
        ))}
      </CustomView>
    </CustomView>
  );
};
export default PlaylistSelect;
const styles = StyleSheet.create({
  backBtn: {
    position: "absolute",
    left: 0,
    backgroundColor: "transparent",
  },
});
