import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
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
import { DeviceContext } from "@/providers/DeviceProvider";
import useGetSeriesDetails from "@/hooks/api/useGetSeriesDetails";
import useGetTvShowStreamUrl from "@/hooks/api/useGetTvShowStreamUrl";
import { CustomText } from "@/components/Text";
import { Episode } from "@/types";

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

  let seasonsWithEpisodes: string[] = [];

  if (seriesDetails?.episodes) {
    seasonsWithEpisodes = filterSeasonsWithEpisodes(seriesDetails?.episodes);
  }

  const firstSeason = seasonsWithEpisodes[0];
  const firstEpisode = seriesDetails?.episodes?.[firstSeason]?.[0];

  const { data: streamUrl } = useGetTvShowStreamUrl(
    firstEpisode ? firstEpisode : ({} as Episode)
  );

  const handleWatchNow = () => {
    if (streamUrl && firstEpisode) {
      navigation.navigate("VideoPlayer", {
        streamUrl,
        title: firstEpisode.title,
      });
    }
  };

  // Define an interface for the props
  interface SegmentSwitcherProps {
    activeSegment: string;
    setActiveSegment: (segment: string) => void;
  }

  const SegmentSwitcher: React.FC<SegmentSwitcherProps> = ({ activeSegment, setActiveSegment }) => {
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.white} />
        <CustomText style={styles.loadingText}>Loading content...</CustomText>
      </View>
    );
  }

  if (!seriesDetails) {
    return (
      <View style={styles.errorContainer}>
        <CustomText style={styles.errorText}>
          Failed to load series details
        </CustomText>
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
        <View style={styles.contentContainer}>
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
                navigation={navigation}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secBackground,
  },
  loadingText: {
    color: Colors.white,
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secBackground,
  },
  errorText: {
    color: Colors.white,
  },
  contentContainer: {
    paddingVertical: 10,
    backgroundColor: "rgb(23 23 23)",
  },
});

export default TvSeriesDetails;
