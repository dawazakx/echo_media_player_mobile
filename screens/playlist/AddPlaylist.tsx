import CustomButton from "@/components/Button";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import * as React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";

import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import {
  LOCAL_PLAYLIST_ROUTE,
  M3U_PLAYLIST_ROUTE,
  SELECT_PLAYLIST_ROUTE,
  XTREME_PLAYLIST_ROUTE,
} from "@/constants/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PlaylistStackParamList } from "@/constants/types";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

export interface AddPlaylistProps {
  navigation: NativeStackNavigationProp<PlaylistStackParamList, "AddPlaylist">;
}

const AddPlaylistScreen: React.FC<AddPlaylistProps> = ({ navigation }) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  const renderBackdrop = React.useCallback(
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
    <CustomView style={{ flex: 1, padding: 10, gap: 15 }}>
      <View
        style={{
          height: 250,
          paddingVertical: 50,
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 150, height: 120 }}
          source={require("../../assets/logo.png")}
          resizeMode="contain"
        />
      </View>
      <MaterialIcons
        name="playlist-play"
        size={70}
        color={Colors.tint}
        style={{ alignSelf: "center" }}
      />
      <CustomView>
        <CustomText style={{ textAlign: "center", padding: 10 }}>
          Sparrow Player is strictly a MEDIA PLAYER It does not provide any type
          of media content To use sparrow player, add your playlist using the
          button below
        </CustomText>
      </CustomView>
      <CustomView style={{ alignItems: "center", paddingTop: 60 }}>
        <CustomButton
          title="Add playlist"
          width="70%"
          borderRadius={25}
          style={{ backgroundColor: Colors.tint }}
          iconLeft={
            <Fontisto name="plus-a" size={24} color={Colors.background} />
          }
          textColor={Colors.background}
          // onPress={() => navigation.navigate(SELECT_PLAYLIST_ROUTE)}
          onPress={handleOpenPress}
        />
      </CustomView>

      <BottomSheet
        index={-1}
        snapPoints={["31%"]}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: Colors.background }}
        handleIndicatorStyle={{ backgroundColor: Colors.white }}
        backdropComponent={renderBackdrop}
      >
        <CustomText
          type="subtitle"
          style={{ textAlign: "center", marginTop: 5 }}
        >
          Choose a Connection Method:
        </CustomText>
        <View
          style={{
            borderRadius: 15,
            gap: 10,
            padding: 18,
            backgroundColor: Colors.tint,
            marginTop: 10,
          }}
        >
          <Pressable
            style={styles.modalContent}
            onPress={() => {
              navigation.navigate(XTREME_PLAYLIST_ROUTE);
            }}
          >
            <MaterialIcons
              name="playlist-add"
              size={20}
              color={Colors.background}
            />
            <CustomText style={{ color: Colors.background }}>
              XTREME CODES
            </CustomText>
          </Pressable>
          <View
            style={{
              width: "100%",
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: Colors.secBackground,
              alignSelf: "flex-end",
            }}
          />
          <Pressable
            style={styles.modalContent}
            onPress={() => {
              navigation.navigate(M3U_PLAYLIST_ROUTE);
            }}
          >
            <MaterialIcons
              name="playlist-add"
              size={20}
              color={Colors.background}
            />
            <CustomText style={{ color: Colors.background }}>
              M3U CODES
            </CustomText>
          </Pressable>
          <View
            style={{
              width: "100%",
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: Colors.secBackground,
              alignSelf: "flex-end",
            }}
          />
          <Pressable
            style={styles.modalContent}
            onPress={() => {
              navigation.navigate(LOCAL_PLAYLIST_ROUTE);
            }}
          >
            <MaterialIcons
              name="playlist-add"
              size={20}
              color={Colors.background}
            />
            <CustomText style={{ color: Colors.background }}>
              LOCAL M3U FILE
            </CustomText>
          </Pressable>
        </View>
      </BottomSheet>
    </CustomView>
  );
};

export default AddPlaylistScreen;

const styles = StyleSheet.create({
  modalContent: {
    flexDirection: "row",
    gap: 12,
  },
});
