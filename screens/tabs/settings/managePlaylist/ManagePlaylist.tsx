import CustomButton from "@/components/Button";
import { Collapsible } from "@/components/Collapsible";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { SELECT_PLAYLIST_ROUTE } from "@/constants/Routes";
import { PlaylistContext } from "@/providers/PlaylistProvider";
import { Feather, Fontisto, MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const ManagePlaylist = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { currentPlaylist } = useContext(PlaylistContext);
  const snapPoints = ["30%"];
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenPress = () => bottomSheetRef.current?.expand();

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.7}
      />
    ),
    []
  );

  return (
    <CustomView
      style={{
        paddingTop: insets.top,
        backgroundColor: Colors.background,
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
            alignItems: "center",
            padding: 15,
            backgroundColor: "#8492a6",
            borderRadius: 10,
            width: "100%",
          }}
          onPress={handleOpenPress}
        >
          <View>
            <CustomText type="defaultSemiBold">
              {currentPlaylist?.nickname}
            </CustomText>
            <CustomText type="extraSmall">{currentPlaylist?.url}</CustomText>
          </View>
          <MaterialIcons
            name="radio-button-checked"
            size={24}
            color={Colors.tint}
          />
          {/* Implement toggle active playlist */}
          {/* <MaterialIcons
            name="radio-button-unchecked"
            size={24}
            color={Colors.tint}
          /> */}
        </Pressable>
      </CustomView>

      <BottomSheet
        index={-1}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: Colors.secBackground }}
        handleIndicatorStyle={{ backgroundColor: Colors.white }}
        backdropComponent={renderBackdrop}
      >
        <CustomText
          type="subtitle"
          style={{ textAlign: "center", marginTop: 5 }}
        >
          {currentPlaylist?.nickname}
        </CustomText>
        <View
          style={{
            borderRadius: 15,
            gap: 9,
            padding: 20,
            backgroundColor: Colors.tint,
            marginTop: 10,
          }}
        >
          <Pressable
            style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
          >
            <Feather name="refresh-cw" size={22} color={Colors.background} />
            <CustomText type="subtitle" style={{ color: Colors.background }}>
              Update Playlist
            </CustomText>
          </Pressable>
          <View
            style={{
              width: "88%",
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: Colors.secBackground,
              alignSelf: "flex-end",
            }}
          />
          <Pressable
            style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
          >
            <MaterialIcons name="edit" size={22} color={Colors.background} />
            <CustomText type="subtitle" style={{ color: Colors.background }}>
              Edit Playlist
            </CustomText>
          </Pressable>
          <View
            style={{
              width: "88%",
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: Colors.secBackground,
              alignSelf: "flex-end",
            }}
          />
          <Pressable
            style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
          >
            <MaterialIcons name="delete" size={22} color={Colors.background} />
            <CustomText type="subtitle" style={{ color: Colors.background }}>
              Delete Playlist
            </CustomText>
          </Pressable>
        </View>
      </BottomSheet>
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
