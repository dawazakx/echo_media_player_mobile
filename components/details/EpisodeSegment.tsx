import { Episode } from "@/types";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomText } from "../Text";
import CustomButton from "../Button";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import EpisodeCard from "../EpisodeCard";

export const EpisodeSegment = ({
  episodes,
  selectedSeason,
  setSelectedSeason,
  setModalVisible,
  modalVisible,
  seasonsWithEpisodes,
  navigation,
}: {
  episodes: any;
  selectedSeason: number;
  setSelectedSeason: React.Dispatch<React.SetStateAction<number>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  seasonsWithEpisodes: string[];
  navigation: any;
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (episodes) {
      setLoading(false);
      // console.log(episodes);
    }
  }, [episodes]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.white} />
      </View>
    );
  }

  if (!episodes || episodes.length === 0) {
    return (
      <View style={styles.container}>
        <CustomText>No episodes available for this season</CustomText>
      </View>
    );
  }
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
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {episodes.map((episode: Episode) => (
          <EpisodeCard
            key={episode.id.toString()}
            episode={episode}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
