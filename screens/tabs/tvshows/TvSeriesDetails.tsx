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
          <View style={{ marginTop: 0 }}>
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
            <View>
              <Image
                source={{
                  uri:
                    `${seriesDetails?.info?.backdrop_path[0]}` ||
                    "https://th.bing.com/th/id/R.4dc29c271625202308a26ed96d1d962d?rik=qKnKhs7roVDpXA&pid=ImgRaw&r=0",
                }}
                style={{
                  width,
                  height: IMG_HEIGHT,
                }}
                resizeMode="cover"
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.6)",
                  "rgba(23,23,23,1)",
                ]}
                style={{
                  width: "100%",
                  height: height * 0.4,
                  position: "absolute",
                  bottom: 0,
                }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
            </View>
          </View>
        }
      >
        <View
          style={{
            // marginTop: -(height * 0.095),
            paddingVertical: 10,
            backgroundColor: "rgb(23 23 23)",
          }}
        >
          <View
            style={{
              padding: 15,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Image
              source={{
                uri:
                  `${seriesDetails?.info?.cover}` ||
                  "https://th.bing.com/th/id/R.4dc29c271625202308a26ed96d1d962d?rik=qKnKhs7roVDpXA&pid=ImgRaw&r=0",
              }}
              style={{
                width: width * 0.3,
                height: height * 0.18,
                borderRadius: 15,
              }}
              resizeMode="contain"
            />
            <View style={{ flex: 1 }}>
              <CustomText type="title" style={{ textAlign: "center" }}>
                {seriesDetails?.info.name}
              </CustomText>

              {/* Release Year, Runtime */}
              {seriesDetails?.info ? (
                <View
                  style={{
                    padding: 8,
                    gap: 10,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="stopwatch" size={16} color="white" />
                    <CustomText type="extraSmall">
                      {numberOfSeasons}{" "}
                      {numberOfSeasons! > 1 ? "seasons" : "season"}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="calendar" size={16} color="white" />
                    <CustomText type="extraSmall">
                      {seriesDetails?.info.releaseDate}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="star" size={16} color="gold" />
                    <CustomText type="extraSmall">
                      {seriesDetails?.info.rating_5based}
                    </CustomText>
                  </View>
                </View>
              ) : null}
              <CustomButton
                iconLeft={
                  <Ionicons
                    name="play-sharp"
                    size={24}
                    color={Colors.background}
                  />
                }
                title="Play"
                onPress={handleWatchNow}
                style={{
                  paddingVertical: 7,
                  paddingHorizontal: 10,
                  marginTop: 10,
                  alignSelf: "center",
                }}
                textStyle={{ fontSize: 14, fontWeight: "bold" }}
                width="50%"
                borderRadius={10}
                textColor={Colors.background}
              />
            </View>
          </View>
          <View
            style={{
              height: 38,
              marginVertical: 15,
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: 10,
            }}
          >
            <CustomButton
              iconLeft={
                <Octicons name="download" size={24} color={Colors.white} />
              }
              title="Download"
              onPress={handleWatchNow}
              style={{
                paddingVertical: 7,
                paddingHorizontal: 10,
                backgroundColor: "transparent",
                borderColor: "white",
                borderWidth: 1,
              }}
              textStyle={{ fontSize: 14, fontWeight: "bold" }}
              width="45%"
              borderRadius={10}
              textColor={Colors.white}
            />
            <CustomButton
              iconLeft={
                <MaterialIcons name="bookmark" size={24} color={Colors.white} />
              }
              title="Watch Later"
              onPress={handleWatchNow}
              style={{
                paddingVertical: 7,
                paddingHorizontal: 10,
                backgroundColor: "transparent",
                borderColor: "white",
                borderWidth: 1,
              }}
              textStyle={{ fontSize: 14, fontWeight: "bold" }}
              width="45%"
              borderRadius={10}
              textColor={Colors.white}
            />
          </View>

          <View style={styles.container}>
            <SegmentSwitcher
              activeSegment={activeSegment}
              setActiveSegment={setActiveSegment}
            />
            {activeSegment === "overview" ? (
              <View style={styles.detailsContainer}>
                <View
                  style={{ marginHorizontal: 16, marginVertical: 5, gap: 5 }}
                >
                  <CustomText type="subtitle">Synopsis</CustomText>
                  <CustomText
                    type="extraSmall"
                    style={{
                      letterSpacing: 0.4,
                      color: "rgb(163 163 163)",
                    }}
                  >
                    {seriesDetails?.info.plot}
                  </CustomText>
                </View>
                <View
                  style={{ marginHorizontal: 16, marginVertical: 10, gap: 5 }}
                >
                  <CustomText>Genres</CustomText>
                  <CustomText
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <CustomText
                      type="extraSmall"
                      style={{
                        fontWeight: "600",
                        textAlign: "auto",
                        marginHorizontal: 16,
                        color: "rgb(163 163 163)",
                      }}
                    >
                      {seriesDetails?.info.genre}
                    </CustomText>
                  </CustomText>
                </View>
                <View
                  style={{ marginHorizontal: 16, marginVertical: 10, gap: 5 }}
                >
                  <CustomText>Cast</CustomText>
                  {seriesDetails?.info?.cast ? (
                    <CustomText
                      type="extraSmall"
                      style={{
                        fontWeight: "600",
                        lineHeight: 20,
                        textAlign: "auto",
                        // marginHorizontal: 16,
                        color: "rgb(163 163 163)",
                      }}
                    >
                      {seriesDetails?.info?.cast}
                    </CustomText>
                  ) : (
                    <CustomText type="title">No Cast data available</CustomText>
                  )}
                </View>
                <View
                  style={{ marginHorizontal: 16, marginVertical: 16, gap: 5 }}
                >
                  <CustomText>Trailers and Videos</CustomText>

                  {seriesDetails?.info.youtube_trailer ? (
                    <WebView
                      style={{
                        width: width - 74,
                        height: 180,
                        marginVertical: 10,
                        marginRight: 15,
                      }}
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                      source={{
                        uri: `https://www.youtube.com/embed/${seriesDetails?.info.youtube_trailer}`,
                      }}
                    />
                  ) : (
                    <CustomText type="title">No trailers available</CustomText>
                  )}
                </View>
              </View>
            ) : (
              <View style={{ padding: 5, gap: 10 }}>
                {/* Episodes section */}
                <CustomText type="subtitle">Episodes</CustomText>

                <CustomButton
                  iconRight={
                    <AntDesign
                      name="caretdown"
                      size={18}
                      color={Colors.white}
                    />
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
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
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
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                      >
                        <Ionicons name="close" size={40} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
                {/* Render episodes  */}

                <EpisodesList
                  episodes={seriesDetails.episodes[selectedSeason]}
                />
              </View>
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
