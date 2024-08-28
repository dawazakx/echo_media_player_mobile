// MovieDetailsScreen.tsx
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Pressable,
  FlatList,
  Modal,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { MoviesStackParamList, TvShowsStackParamList } from "@/constants/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "@/constants/Colors";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { TMDB_API_KEY, image500 } from "@/constants/api";
import axios from "axios";
import { CustomText } from "@/components/Text";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "@/components/Button";
import { fetchStreamUrl } from "@/providers/api";
import { DeviceContext } from "@/providers/DeviceProvider";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import WebView from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import { useQuery } from "@tanstack/react-query";
import EpisodesList from "@/components/EpisodesList";
import useGetSeriesDetails from "@/hooks/api/useGetSeriesDetails";
import { FlashList } from "@shopify/flash-list";
import { HeaderImage } from "@/components/details/HeaderImage";
import { Banner } from "@/components/details/Banner";
import { OverviewSegment } from "@/components/details/OverviewSegment";
import { EpisodeSegment } from "@/components/details/EpisodeSegment";

type TvShowDetailsProps = {
  route: RouteProp<TvShowsStackParamList, "TvSeriesDetails">;
  navigation: NativeStackNavigationProp<
    TvShowsStackParamList,
    "TvSeriesDetails"
  >;
};
var { width, height } = Dimensions.get("window");
const IMG_HEIGHT = 262;

const TvSeriesDetails: React.FC<TvShowDetailsProps> = ({
  route,
  navigation,
}) => {
  const { tvshow } = route.params;
  const { deviceId } = useContext(DeviceContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [activeSegment, setActiveSegment] = useState("overview");

  const fetchSeasonDetails = async (seasonNumber: number) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvshows.tmdb}/season/${seasonNumber}`,
      {
        headers: {
          accept: "application/json",
          Authorization: TMDB_API_KEY,
        },
      }
    );
    return response.data;
  };

  const fetchSeriesVideos = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvshow.tmdb}/videos`,
      {
        headers: {
          accept: "application/json",
          Authorization: TMDB_API_KEY,
        },
      }
    );
    return response.data;
  };

  const { data: seriesDetails, isLoading: isLoadingDetails } =
    useGetSeriesDetails(tvshow.series_id);

  const numberOfSeasons = seriesDetails?.seasons.length;

  // Helper function to filter seasons with episodes
  const filterSeasonsWithEpisodes = (episodes) => {
    return Object.keys(episodes).filter(
      (season) => episodes[season].length > 0
    );
  };
  // console.log(seriesDetails?.episodes);
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
