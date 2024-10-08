import CustomButton from "@/components/Button";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { ADD_PLAYLIST_ROUTE, PLAYER_INDEX_ROUTE } from "@/constants/Routes";
import { PlaylistContext } from "@/providers/PlaylistProvider";
import { Feather, Fontisto, MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const PlaylistSelect = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { activePlaylist, setActivePlaylist, userPlaylists } =
    useContext(PlaylistContext);

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

        <CustomText type="subtitle">Select Playlist</CustomText>
      </CustomView>

      <CustomView
        style={{
          flexDirection: "row",
          gap: 15,
          padding: 15,
          marginHorizontal: 12,
          backgroundColor: "transparent",
        }}
      >
        <FlatList
          data={userPlaylists}
          numColumns={2}
          renderItem={({ item }) => (
            <Pressable
              style={{
                gap: 2,
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                backgroundColor: "#374151",
                borderRadius: 10,
                width: "40%",
                margin: 10,
              }}
              onPress={() => {
                setActivePlaylist(item);
                navigation.navigate(PLAYER_INDEX_ROUTE);
              }}
              key={item?._id}
            >
              <Feather name="user" size={44} color="white" />
              <View>
                <CustomText type="defaultSemiBold">{item?.nickname}</CustomText>
                {/* <CustomText type="extraSmall">{item?.url}</CustomText> */}
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item?._id.toString()}
        />
      </CustomView>
      <CustomButton
        title="Add playlist"
        width="40%"
        borderRadius={10}
        style={{
          backgroundColor: Colors.tint,
          position: "absolute",
          bottom: 20,
          right: 12,
          zIndex: -1,
        }}
        iconLeft={
          <Fontisto name="plus-a" size={24} color={Colors.background} />
        }
        textColor={Colors.background}
        onPress={() => navigation.navigate("Playlist")}
      />
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
