import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import WebView from "react-native-webview";
import { StatusBar } from "expo-status-bar";

import { Colors } from "@/constants/Colors";
import { image500 } from "@/constants/api";
import { CustomText } from "@/components/Text";
import CustomButton from "@/components/Button";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import useGetMovieDetails from "@/hooks/api/useGetMovieDetails";
import useGetStreamUrl from "@/hooks/api/useStreamUrl";
import { DeviceContext } from "@/providers/DeviceProvider";
import { MoviesStackParamList } from "@/constants/types";
import useGetMovieStreamUrl from "@/hooks/api/useGetMovieStreamUrl";

type MovieDetailsProps = {
  route: RouteProp<MoviesStackParamList, "MovieDetails">;
  navigation: NativeStackNavigationProp<MoviesStackParamList, "MovieDetails">;
};
var { width, height } = Dimensions.get("window");
const IMG_HEIGHT = 262;

const formatPopularity = (popularity: number) => {
  const percentage = (popularity / 1000) * 170;
  return `${Math.round(percentage)} %`;
};
const formatRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours === 0) {
    return `${minutes}min`;
  } else if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}mins`;
  }
};

const MovieDetails: React.FC<MovieDetailsProps> = ({ route, navigation }) => {
  const { movie } = route.params;
  const { deviceId } = useContext(DeviceContext);

  const { data, isLoading, error } = useGetMovieDetails(movie);
  const { data: streamUrl } = useGetMovieStreamUrl( movie );

  const movieCast = data?.movieCast;
  const movieInfo = data?.movieInfo;
  const movieVideos = data?.movieVideos;

  const castData =
    movieCast?.cast
      ?.filter((member: any) => member.known_for_department === "Acting")
      ?.slice(0, 12) || [];

  const youtubeTrailers = movieVideos
    ? movieVideos?.results
        ?.filter((video) => video.site === "YouTube")
        .slice(0, 3)
    : [];
  const handleWatchNow = () => {
    if (streamUrl) {
      // Navigate to the video player
      navigation.navigate("VideoPlayer", {
        streamUrl: streamUrl,
        title: movieInfo?.title,
      });
    }
  };

  if (isLoading) {
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

  if (!movieInfo) {
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
                    image500(movieInfo.backdrop_path) ||
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
              source={{ uri: movie.stream_icon }}
              style={{
                width: width * 0.3,
                height: height * 0.18,
                borderRadius: 15,
              }}
              resizeMode="contain"
            />
            <View style={{ flex: 1 }}>
              <CustomText type="title" style={{ textAlign: "center" }}>
                {movieInfo?.title}
              </CustomText>

              {/* Release Year, Runtime */}
              {movieInfo?.id ? (
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
                      {formatRuntime(movieInfo?.runtime)}
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
                      {movieInfo?.release_date}
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
                      {movie?.rating_5based}
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
                <AntDesign name="download" size={24} color={Colors.white} />
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
          {/* Description */}
          <View style={styles.detailsContainer}>
            <View style={{ marginHorizontal: 16, marginVertical: 5, gap: 5 }}>
              <CustomText type="subtitle">Synopsis</CustomText>
              <CustomText
                type="extraSmall"
                style={{
                  letterSpacing: 0.4,
                  color: "rgb(163 163 163)",
                }}
              >
                {movieInfo?.overview}
              </CustomText>
            </View>
            <View style={{ marginHorizontal: 16, marginVertical: 10, gap: 5 }}>
              <CustomText>Genres</CustomText>
              <CustomText
                style={{
                  flexDirection: "row",
                }}
              >
                {movieInfo?.genres?.map((genre, index) => {
                  let showDot = index + 1 != movieInfo.genres.length;

                  return (
                    <CustomText
                      key={index}
                      type="extraSmall"
                      style={{
                        fontWeight: "600",
                        textAlign: "auto",
                        marginHorizontal: 16,
                        color: "rgb(163 163 163)",
                      }}
                    >
                      {genre?.name} {showDot ? "• " : null}
                    </CustomText>
                  );
                })}
              </CustomText>
            </View>
            <View style={{ marginHorizontal: 16, marginVertical: 16, gap: 5 }}>
              <CustomText>Cast</CustomText>
              <CustomText
                style={{
                  flexDirection: "row",
                }}
              >
                {castData.length > 0 ? (
                  castData.map((member: any) => (
                    <CustomText
                      key={member.id}
                      type="extraSmall"
                      style={{
                        fontWeight: "600",
                        lineHeight: 20,
                        textAlign: "auto",
                        marginHorizontal: 16,
                        color: "rgb(163 163 163)",
                      }}
                    >
                      {member.name},{" "}
                    </CustomText>
                  ))
                ) : (
                  <Text>No cast information available</Text>
                )}
              </CustomText>
            </View>
            <View style={{ marginHorizontal: 16, marginVertical: 16, gap: 5 }}>
              <CustomText>Trailers and Videos</CustomText>

              {youtubeTrailers?.length > 0 ? (
                <FlatList
                  data={youtubeTrailers}
                  horizontal
                  keyExtractor={(item) => item.key}
                  renderItem={({ item }) => (
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
                        uri: `https://www.youtube.com/embed/${item.key}`,
                      }}
                    />
                  )}
                />
              ) : (
                <CustomText type="title">No trailers available</CustomText>
              )}
            </View>
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
});

export default MovieDetails;
