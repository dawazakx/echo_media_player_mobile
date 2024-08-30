import { SegmentedControl } from "@/components/SegmentedControl";
import { CustomText } from "@/components/Text";
import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";

const LiveStreamDetails = ({ navigation, route }) => {
  const { stream } = route.params;
  // Dummy data for schedule flatlist
  const scheduleData = [
    { id: "1", day: "Monday", shows: ["Show 1", "Show 2", "Show 3"] },
    { id: "2", day: "Tuesday", shows: ["Show 4", "Show 5", "Show 6"] },
    { id: "3", day: "Wednesday", shows: ["Show 7", "Show 8", "Show 9"] },
    // { id: "4", day: "Thursday", shows: ["Show 10", "Show 11", "Show 12"] },
    // { id: "5", day: "Friday", shows: ["Show 13", "Show 14", "Show 15"] },
  ];
  const [selectedOption, setSelectedOption] = useState("Monday");
  const days = ["Monday", "Tuesday", "Wednesday"];

  // Function to render each day in the schedule flatlist
  const renderScheduleItem = ({ item }) => (
    <TouchableOpacity style={styles.scheduleItem}>
      <Text style={styles.dayText}>{item.day}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View
        style={{
          position: "absolute",
          top: 40,
          left: 12,
          zIndex: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "transparent",
            padding: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Video Player Component */}
      <View style={styles.videoPlayerContainer}>{/* <VideoPlayer /> */}</View>

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
      <View style={styles.scheduleContainer}>
        {/* <FlatList
          data={scheduleData}
          keyExtractor={(item) => item.id}
          renderItem={renderScheduleItem}
          horizontal
        /> */}
        <SegmentedControl
          options={days}
          selectedOption={selectedOption}
          onOptionPress={setSelectedOption}
        />
        {/* Placeholder for show details based on selected day */}
        <Pressable
          style={{
            gap: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            backgroundColor: "#666",
            borderRadius: 10,
            width: "100%",
          }}
          onPress={() => {}}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View>
              <CustomText type="defaultSemiBold">06:00 AM </CustomText>
            </View>
            <View>
              <CustomText type="defaultSemiBold">show 1</CustomText>
            </View>
          </View>
          <MaterialIcons name="connected-tv" size={24} color={Colors.white} />
        </Pressable>
        <Pressable
          style={{
            gap: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            backgroundColor: "#666",
            borderRadius: 10,
            width: "100%",
          }}
          onPress={() => {}}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View>
              <CustomText type="defaultSemiBold">06:00 AM </CustomText>
            </View>
            <View>
              <CustomText type="defaultSemiBold">show 1</CustomText>
            </View>
          </View>
          <MaterialIcons name="connected-tv" size={24} color={Colors.white} />
        </Pressable>
        <Pressable
          style={{
            gap: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            backgroundColor: "#666",
            borderRadius: 10,
            width: "100%",
          }}
          onPress={() => {}}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View>
              <CustomText type="defaultSemiBold">06:00 AM </CustomText>
            </View>
            <View>
              <CustomText type="defaultSemiBold">show 1</CustomText>
            </View>
          </View>
          <MaterialIcons name="connected-tv" size={24} color={Colors.white} />
        </Pressable>
        <Pressable
          style={{
            gap: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            backgroundColor: "#666",
            borderRadius: 10,
            width: "100%",
          }}
          onPress={() => {}}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View>
              <CustomText type="defaultSemiBold">06:00 AM </CustomText>
            </View>
            <View>
              <CustomText type="defaultSemiBold">show 1</CustomText>
            </View>
          </View>
          <MaterialIcons name="connected-tv" size={24} color={Colors.white} />
        </Pressable>
        {/* Implement logic to display shows based on selected day */}
      </View>
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
  scheduleContainer: {
    padding: 10,
    gap: 20,
  },
  scheduleItem: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LiveStreamDetails;
