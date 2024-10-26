import React, { useCallback, useContext, useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PlaylistContext } from "@/providers/PlaylistProvider";
import { DeviceContext } from "@/providers/DeviceProvider";

import CustomButton from "@/components/Button";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";

import { Feather, Fontisto, MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import { Colors } from "@/constants/Colors";

const ManagePlaylist = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { activePlaylist, userPlaylists } = useContext(PlaylistContext);
  const snapPoints = ["30%"];
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleDeletePlaylist = () => {
    // Implement playlist deletion logic here
    setIsModalVisible(false);
  };

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
          flexDirection: "column",
          gap: 15,
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
              backgroundColor: "#8492a6",
              borderRadius: 10,
              width: "100%",
            }}
            onPress={handleOpenPress}
            key={playlist?._id}
          >
            <View>
              <CustomText type="defaultSemiBold">
                {playlist?.nickname}
              </CustomText>
              <CustomText type="extraSmall">{playlist?.url}</CustomText>
            </View>
            <MaterialIcons
              name={playlist.nickname === activePlaylist?.nickname ? "radio-button-checked" : "radio-button-unchecked"}
              size={24}
              color={Colors.tint}
            />
          </Pressable>
        ))}
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
          {activePlaylist?.nickname}
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
            onPress={() => setIsModalVisible(true)}
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

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CustomText
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Are you absolutely sure?
            </CustomText>
            <CustomText type="default" style={{ color: "#9ca3af" }}>
              This action cannot be undone. This will permanently remove your
              playlist from our servers.
            </CustomText>
            <View style={styles.modalButtons}>
              <CustomButton
                title="Cancel"
                width="45%"
                borderRadius={10}
                style={styles.modalButton}
                textColor={Colors.background}
                onPress={() => setIsModalVisible(false)}
              />
              <CustomButton
                title="Continue"
                width="45%"
                borderRadius={10}
                style={[styles.modalButton, { backgroundColor: "#b91c1c" }]}
                textColor={Colors.white}
                onPress={handleDeletePlaylist}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: Colors.secBackground,
    borderRadius: 10,
    alignItems: "flex-start",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  modalButton: {
    marginHorizontal: 10,
  },
});
