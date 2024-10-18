import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { CustomText } from "./Text";
import useGetStreamUrl from "@/hooks/api/useStreamUrl";
import { Episode } from "@/types";

interface EpisodeCardProps {
  episode: Episode;
  navigation: any;
}

const EpisodeCard = ({ episode, navigation }: EpisodeCardProps) => {
  const { data: StreamUrl } = useGetStreamUrl({ episode });

  const handlePress = async () => {
    if (StreamUrl) {
      console.log(StreamUrl);
      navigation.navigate("VideoPlayer", {
        streamUrl: StreamUrl,
        title: episode.title,
      });
    }
  };
  return (
    <View key={episode.id.toString()} style={styles.episodeContainer}>
      <View style={styles.episodeContent}>
        <View style={styles.episodeImageContainer}>
          <Image
            source={{
              uri:
                episode.info.movie_image || "https://via.placeholder.com/150",
            }}
            style={styles.episodeImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.playIconContainer}
            onPress={handlePress}
          >
            <FontAwesome name="play" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <CustomText type="extraSmall" style={{ flex: 1, flexWrap: "wrap" }}>
          {episode.title || "No overview available."}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  episodeContainer: {
    flex: 1,
    marginVertical: 8,
    backgroundColor: "#262626",
    borderRadius: 10,
    padding: 5,
  },
  episodeImageContainer: {
    position: "relative",
  },
  episodeImage: {
    width: 130,
    height: 80,
  },
  playIconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },

  episodeContent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    padding: 5,
  },
});
export default EpisodeCard;
