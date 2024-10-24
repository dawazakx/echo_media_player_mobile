import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { CustomText } from "@/components/Text";
import { VideoPlayer } from "@/components/VideoPlayer";
import useGetLiveTvStreamUrl from "@/hooks/api/useGetLiveTvStreamUrl";
import { Colors } from "@/constants/Colors";
import useEpgData from "@/hooks/api/useEpgData";
import { Buffer } from "buffer";

const LiveStreamDetails = ({ navigation, route }: { navigation: any; route: any }) => {
  const { stream } = route.params;
  const { data: streamUrl, error: streamUrlError, isLoading: isStreamUrlLoading } = useGetLiveTvStreamUrl(stream);
  const { data: epgData, isLoading: isEpgLoading } = useEpgData({
    channelId: stream.stream_id,
  });
  const [epgListings, setEpgListings] = useState<any[]>([]);
  const [currentShow, setCurrentShow] = useState<string>("No information");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [dayOptions, setDayOptions] = useState<string[]>([]);

  useEffect(() => {
    if (streamUrlError) {
      console.error("Error fetching stream URL:", streamUrlError);
    }
  }, [streamUrlError]);

  useEffect(() => {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const options = [
      days[today.getDay()],
      days[(today.getDay() + 1) % 7],
      days[(today.getDay() + 2) % 7]
    ];
    setDayOptions(options);
    setSelectedDay(options[0]);
  }, []);

  useEffect(() => {
    if (epgData && epgData.epg_listings) {
      const decodedListings = epgData.epg_listings.map((item: any) => ({
        ...item,
        title: Buffer.from(item.title, "base64").toString("utf-8"),
        description: Buffer.from(item.description, "base64").toString("utf-8"),
        start: new Date(item.start),
        end: new Date(item.end),
      }));
      setEpgListings(decodedListings);
      updateCurrentShow(decodedListings);
    }
  }, [epgData]);

  const updateCurrentShow = (listings: any[]) => {
    const now = new Date();
    const currentProgram = listings.find((item: any) => now >= item.start && now < item.end);
    setCurrentShow(currentProgram ? currentProgram.title : "No information");
  };

  const getFilteredEpgListings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    let startDate, endDate;

    switch (selectedDay) {
      case dayOptions[0]:
        startDate = today;
        endDate = tomorrow;
        break;
      case dayOptions[1]:
        startDate = tomorrow;
        endDate = dayAfterTomorrow;
        break;
      case dayOptions[2]:
        startDate = dayAfterTomorrow;
        endDate = new Date(dayAfterTomorrow.getTime() + 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = today;
        endDate = tomorrow;
    }

    return epgListings.filter((item) => item.start >= startDate && item.start < endDate);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.programContainer}>
        <Text style={styles.programTitle}>{item.title}</Text>
        <Text style={styles.programDescription}>{item.description}</Text>
        <Text style={styles.programTime}>
          {formatTime(item.start)} - {formatTime(item.end)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Video Player Component */}
      <View style={styles.videoPlayerContainer}>
        {isStreamUrlLoading ? (
          <ActivityIndicator />
        ) : streamUrl ? (
          <VideoPlayer streamUrl={streamUrl} />
        ) : (
          <Text style={{ color: 'white' }}>Unable to load video</Text>
        )}
      </View>

      {/* Stream Info */}
      <View style={styles.streamInfoContainer}>
        <Image
          source={{
            uri: stream.stream_icon || "https://placehold.co/400/000000/FFFFFF/png",
          }}
          style={styles.streamIcon}
        />
        <View style={styles.streamDetails}>
          <CustomText style={styles.channelName}>{stream.name}</CustomText>
          <CustomText style={styles.ongoingShow}>{currentShow}</CustomText>
        </View>
      </View>

      {/* Custom Segmented Control */}
      {dayOptions.length > 0 && (
        <View style={styles.segmentedControlContainer}>
          {dayOptions.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.segmentButton,
                selectedDay === day && styles.selectedSegmentButton
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={[
                styles.segmentButtonText,
                selectedDay === day && styles.selectedSegmentButtonText
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Schedule */}
      {epgData?.epg_listings?.length ? (
        <View style={styles.listContainer}>
          {isEpgLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={getFilteredEpgListings()}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
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
    backgroundColor: "rgb(23 23 23)",
  },
  programContainer: {
    backgroundColor: '#27272a',
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
  segmentedControlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "rgb(23 23 23)",
    borderRadius: 8,
    padding: 4,
    gap: 4,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  selectedSegmentButton: {
    backgroundColor: Colors.tint,
  },
  segmentButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedSegmentButtonText: {
    color: 'black',
    fontWeight: '600',
  },
});

export default LiveStreamDetails;
