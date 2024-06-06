import CustomButton from "@/components/Button";
import { Collapsible } from "@/components/Collapsible";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { SELECT_PLAYLIST_ROUTE } from "@/constants/Routes";
import { PlaylistContext } from "@/providers/PlaylistProvider";
import { Feather, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const ManagePlaylist = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { currentPlaylist } = useContext(PlaylistContext);

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

      <CustomView
        style={{
          flexDirection: "row",
          gap: 15,
          marginHorizontal: 12,
          alignSelf: "center",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <Pressable
          style={{
            gap: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 15,
            backgroundColor: "gray",
            borderRadius: 10,
            width: "100%",
          }}
          onPress={() =>
            navigation.navigate("PlaylistDetails", {
              playlistId: currentPlaylist?.nickname,
            })
          }
        >
          <View>
            <CustomText type="defaultSemiBold">
              {currentPlaylist?.nickname}
            </CustomText>
            <CustomText type="extraSmall">{currentPlaylist?.url}</CustomText>
          </View>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <MaterialIcons.Button
              name="edit"
              size={18}
              color={Colors.background}
              backgroundColor={Colors.tint}
              onPress={() => {
                console.log("edit clicked");
              }}
              iconStyle={{ marginRight: 0 }}
            />
            <MaterialIcons.Button
              name="delete"
              size={18}
              color={Colors.background}
              backgroundColor={Colors.tint}
              onPress={() => {
                console.log("delete clicked");
              }}
              iconStyle={{ marginRight: 0 }}
            />
          </View>
        </Pressable>
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
        }}
        iconLeft={
          <Fontisto name="plus-a" size={24} color={Colors.background} />
        }
        textColor={Colors.background}
        onPress={() => navigation.navigate("AddPlaylist")}
      />
    </CustomView>
  );
};
export default ManagePlaylist;
const styles = StyleSheet.create({
  backBtn: {
    position: "absolute",
    left: 0,
    backgroundColor: "transparent",
  },
});
