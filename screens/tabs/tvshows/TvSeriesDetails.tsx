import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { TvShowsStackParamList } from "@/constants/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { StatusBar } from "expo-status-bar";

import { Colors } from "@/constants/Colors";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { HeaderImage } from "@/components/details/HeaderImage";
import { Banner } from "@/components/details/Banner";
import { OverviewSegment } from "@/components/details/OverviewSegment";
import { EpisodeSegment } from "@/components/details/EpisodeSegment";
import { fetchStreamUrl } from "@/providers/api";
import { DeviceContext } from "@/providers/DeviceProvider";
import useGetSeriesDetails from "@/hooks/api/useGetSeriesDetails";

type TvShowDetailsProps = {
  route: RouteProp<TvShowsStackParamList, "TvSeriesDetails">;
  navigation: NativeStackNavigationProp<
    TvShowsStackParamList,
    "TvSeriesDetails"
  >;
};

const TvSeriesDetails: React.FC<TvShowDetailsProps> = ({
  route,
  navigation,
}) => {
  const { tvshow } = route.params;
  const { deviceId } = useContext(DeviceContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  // const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [activeSegment, setActiveSegment] = useState("overview");

  const { data: seriesDetails, isLoading: isLoadingDetails } =
    useGetSeriesDetails(tvshow.series_id);

  const numberOfSeasons = seriesDetails?.seasons.length;

  // Helper function to filter seasons with episodes
  const filterSeasonsWithEpisodes = (episodes) => {
    return Object.keys(episodes).filter(
      (season) => episodes[season].length > 0
    );
  };
  console.log(seriesDetails?.episodes);
  // Filter seasons to include only those with episodes
  let seasonsWithEpisodes = [];

  if (seriesDetails?.episodes) {
    seasonsWithEpisodes = filterSeasonsWithEpisodes(seriesDetails?.episodes);
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.secBackground,
        }}
      >
        <ActivityIndicator size="large" color={Colors.white} />
      </View>
    );
  }

  const handleWatchNow = async () => {
    if (!deviceId) {
      console.error("Device ID is required to fetch the stream URL");
      return;
    }

    try {
      const streamUrl = await fetchStreamUrl(deviceId, tvshow);
      if (streamUrl) {
        setStreamUrl(streamUrl);
        // Navigate to the video player screen or handle the stream URL as needed
        navigation.navigate("VideoPlayer", {
          streamUrl: streamUrl,
          title: seriesDetails?.title,
        });
      } else {
        console.error("Failed to fetch the stream URL");
      }
    } catch (error) {
      console.error("Error fetching stream URL:", error);
    }
  };

  const SegmentSwitcher = ({ activeSegment, setActiveSegment }) => {
    return (
      <View style={styles.segmentSwitcher}>
        <TouchableOpacity
          onPress={() => setActiveSegment("overview")}
          style={[
            styles.segmentButton,
            activeSegment === "overview" && styles.activeSegmentButton,
          ]}
        >
          <Text style={styles.segmentButtonText}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveSegment("episodes")}
          style={[
            styles.segmentButton,
            activeSegment === "episodes" && styles.activeSegmentButton,
          ]}
        >
          <Text style={styles.segmentButtonText}>Episodes</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (isLoadingDetails) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.secBackground,
        }}
      >
        <ActivityIndicator size="large" color={Colors.white} />
      </View>
    );
  }

  if (!seriesDetails) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.secBackground,
        }}
      >
        <Text style={{ color: Colors.background }}>
          Failed to load movie details
        </Text>
      </View>
    );
  }
  return (
    <>
      <StatusBar style="light" />
      <ParallaxScrollView
        headerBackgroundColor="rgb(23 23 23)"
        headerImage={
          <HeaderImage seriesDetails={seriesDetails} navigation={navigation} />
        }
      >
        <View
          style={{
            // marginTop: -(height * 0.095),
            paddingVertical: 10,
            backgroundColor: "rgb(23 23 23)",
          }}
        >
          <Banner
            seriesDetails={seriesDetails}
            handleWatchNow={handleWatchNow}
            numberOfSeasons={numberOfSeasons!}
          />

          <View style={styles.container}>
            <SegmentSwitcher
              activeSegment={activeSegment}
              setActiveSegment={setActiveSegment}
            />
            {activeSegment === "overview" ? (
              <OverviewSegment seriesDetails={seriesDetails} />
            ) : (
              <EpisodeSegment
                seasonsWithEpisodes={seasonsWithEpisodes}
                episodes={seriesDetails.episodes[selectedSeason]}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                selectedSeason={selectedSeason}
                setSelectedSeason={setSelectedSeason}
              />
            )}
          </View>
        </View>
      </ParallaxScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  detailsContainer: {
    padding: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
  },
  container: {
    padding: 5,
  },
  segmentSwitcher: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  segmentButton: {
    padding: 10,
    marginHorizontal: 5,
  },
  activeSegmentButton: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.white,
  },
  segmentButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "transparent",
    justifyContent: "center",
    borderRadius: 10,
    padding: 5,
  },
  closeButton: {
    alignSelf: "center",
  },
  seasonItem: {
    padding: 10,
    marginBottom: 7,
  },
  seasonText: {
    fontSize: 16,
  },
});

export default TvSeriesDetails;
