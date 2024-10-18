import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import { SegmentedControl } from "@/components/SegmentedControl";
import { CustomText } from "@/components/Text";
import { VideoPlayer } from "@/components/VideoPlayer";

import useGetStreamUrl from "@/hooks/api/useStreamUrl";

import { Colors } from "@/constants/Colors";
import useEpgData from "@/hooks/api/useEpgData";
import { Buffer } from "buffer";

const LiveStreamDetails = ({ navigation, route }) => {
  const { stream } = route.params;
  const { data: streamUrl } = useGetStreamUrl({ stream });
  const { data: epgData, isLoading: isEpgLoading } = useEpgData({
    channelId: stream.stream_id,
  });
  const [epgListings, setEpgListings] = useState([]);

  const handleGoBack = () => navigation.goBack();

  useEffect(() => {
    if (epgData && epgData.epg_listings) {
      const decodedListings = epgData.epg_listings.map((item) => ({
        ...item,
        title: Buffer.from(item.title, "base64").toString("utf-8"),
        description: Buffer.from(item.description, "base64").toString("utf-8"),
      }));
      setEpgListings(decodedListings);
    }
  }, [epgData]);

  // Function to format the date and time
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return date.toLocaleDateString("en-US", options);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.programContainer}>
        <Text style={styles.programTitle}>{item.title}</Text>
        <Text style={styles.programDescription}>{item.description}</Text>
        <Text style={styles.programTime}>
          {formatDateTime(item.start)} - {formatDateTime(item.end)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Video Player Component */}
      <View style={styles.videoPlayerContainer}>
        <VideoPlayer streamUrl={streamUrl} />
      </View>

      {/* Stream Info */}
      <View style={styles.streamInfoContainer}>
        <Image
          source={{
            uri:
              stream.stream_icon ||
              "https://placehold.co/400/000000/FFFFFF/png",
          }}
          style={styles.streamIcon}
        />
        <View style={styles.streamDetails}>
          <CustomText style={styles.channelName}>{stream.name}</CustomText>
          <CustomText style={styles.ongoingShow}>Ongoing Show Name</CustomText>
        </View>
      </View>

      {/* Channel Description */}
      <View style={styles.descriptionContainer}>
        <CustomText style={styles.descriptionText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel
          interdum lectus. Fusce iaculis mauris et enim pretium, et lacinia
          lorem lobortis.
        </CustomText>
      </View>

      {/* Schedule */}
      {epgData?.epg_listings?.length ? (
        <View style={styles.listContainer}>
          {isEpgLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={epgListings}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </View>
      ) : (
        <View style={styles.listContainer}>
          <CustomText>No schedule available</CustomText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: "rgb(23 23 23)",
  },
  videoPlayerContainer: {
    height: 250,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  streamInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  streamIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  streamDetails: {
    flex: 1,
  },
  channelName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ongoingShow: {
    fontSize: 16,
    color: "#666",
  },
  descriptionContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  listContainer: {
    padding: 16,
    backgroundColor: Colors.secBackground,
  },
  programContainer: {
    backgroundColor: Colors.secBackground,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 6,
  },
  programDescription: {
    fontSize: 14,
    color: Colors.white,
    marginBottom: 6,
  },
  programTime: {
    fontSize: 12,
    color: "#888",
  },
});

export default LiveStreamDetails;
