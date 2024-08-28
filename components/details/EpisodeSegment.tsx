import { Episode } from "@/types";
import React from "react";
import {
  FlatList,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomText } from "../Text";
import CustomButton from "../Button";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import EpisodesList from "../EpisodesList";

export const EpisodeSegment = ({
  episodes,
  selectedSeason,
  setSelectedSeason,
  setModalVisible,
  modalVisible,
  seasonsWithEpisodes,
}: {
  episodes: any;
  selectedSeason: number;
  setSelectedSeason: React.Dispatch<React.SetStateAction<number>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  seasonsWithEpisodes: string[];
}) => {
  return (
    <View style={{ padding: 5, gap: 10 }}>
      <CustomText type="subtitle">Episodes</CustomText>
      <CustomButton
        iconRight={
          <AntDesign name="caretdown" size={18} color={Colors.white} />
        }
        title={`Season ${selectedSeason}`}
        onPress={() => setModalVisible(true)}
        style={{
          paddingVertical: 7,
          paddingHorizontal: 10,
          backgroundColor: "transparent",
          borderColor: "white",
          borderWidth: 1,
        }}
        textStyle={{ fontSize: 18, fontWeight: "bold" }}
        width="40%"
        borderRadius={5}
        textColor={Colors.white}
      />
      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "transparent",
              justifyContent: "center",
              borderRadius: 10,
              padding: 5,
            }}
          >
            {seasonsWithEpisodes.length > 0 && (
              <FlatList
                data={seasonsWithEpisodes}
                keyExtractor={(item) => `season-${item}`}
                renderItem={({ item }) => (
                  <Pressable
                    style={{
                      backgroundColor: "transparent",
                      padding: 15,
                      width: "100%",
                      marginVertical: 5,
                      alignItems: "center",
                    }}
                    onPress={() => {
                      setSelectedSeason(parseInt(item));
                      setModalVisible(false);
                    }}
                  >
                    <CustomText
                      type="defaultSemiBold"
                      style={{ textAlign: "center" }}
                    >
                      Season {item}
                    </CustomText>
                  </Pressable>
                )}
              />
            )}
            <TouchableOpacity
              style={{
                alignSelf: "center",
              }}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Render episodes  */}
      <EpisodesList episodes={episodes} />
    </View>
  );
};
