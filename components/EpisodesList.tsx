import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { Ionicons, Octicons } from "@expo/vector-icons";

import { CustomText } from "@/components/Text";
import { Colors } from "@/constants/Colors";

import { Episode } from "@/types";

const EpisodesList = ({ episodes }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (episodes) {
      setLoading(false);
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
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      {Array.isArray(episodes) && episodes.length > 0 ? (
        episodes.map((item: Episode) => (
          <View key={item.id.toString()} style={styles.episodeContainer}>
            <View style={styles.episodeHeader}>
              <View style={styles.episodeImageContainer}>
                <Image
                  source={{
                    uri:
                      item.info.movie_image ||
                      "https://via.placeholder.com/150",
                  }}
                  style={styles.episodeImage}
                />
                <TouchableOpacity style={styles.playIconContainer}>
                  <Ionicons name="play-circle" size={30} color="white" />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                  gap: 10,
                }}
              >
                <View style={{ gap: 5 }}>
                  <CustomText style={{ fontSize: 15, textAlign: "left" }}>{`${
                    item.episode_num || "N/A"
                  }`}</CustomText>
                </View>
                <TouchableOpacity>
                  <Octicons name="download" size={24} color={Colors.white} />
                </TouchableOpacity>
              </View>
            </View>
            <CustomText
              type="extraSmall"
              style={{ color: "#a3a3a3" }}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {item.title || "No overview available."}
            </CustomText>
          </View>
        ))
      ) : (
        <View style={styles.container}>
          <CustomText>No episodes available for this season</CustomText>
        </View>
      )}
    </ScrollView>
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
  episodeContainer: {
    marginVertical: 8,
    backgroundColor: "#262626",
    borderRadius: 10,
    padding: 10,
  },
  episodeImageContainer: {
    // marginRight: 10,
    position: "relative",
  },
  episodeImage: {
    width: 130,
    height: 70,
    borderRadius: 5,
  },
  playIconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },

  episodeHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    padding: 5,
    marginBottom: 10,
  },
});

export default EpisodesList;
