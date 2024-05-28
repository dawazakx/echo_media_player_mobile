// MovieDetailsScreen.tsx
import React, { useEffect, useState } from "react";
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
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { MoviesStackParamList } from "@/constants/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "@/constants/Colors";
import { CustomView } from "@/components/View";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TMDB_API_KEY, image500 } from "@/constants/api";
import axios from "axios";
import { CustomText } from "@/components/Text";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "@/components/Button";

type MovieDetailsProps = {
  route: RouteProp<MoviesStackParamList, "MovieDetails">;
  navigation: NativeStackNavigationProp<MoviesStackParamList, "MovieDetails">;
};
var { width, height } = Dimensions.get("window");

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
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(movie);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      console.log("Fetching details for TMDB ID:", movie.tmdb); // Debug log
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.tmdb}`,
          {
            headers: {
              accept: "application/json",
              Authorization: TMDB_API_KEY,
            },
          }
        );
        setMovieDetails(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie]);

  if (loading) {
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

  if (!movieDetails) {
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
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
        flex: 1,
        backgroundColor: "rgb(23 23 23)",
      }}
    >
      <View style={{ width: "100%" }}>
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
                image500(movieDetails.backdrop_path) ||
                "https://th.bing.com/th/id/R.4dc29c271625202308a26ed96d1d962d?rik=qKnKhs7roVDpXA&pid=ImgRaw&r=0",
            }}
            style={{
              width,
              height: height * 0.35,
            }}
            resizeMode="contain"
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.6)", "rgba(23,23,23,1)"]}
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
        <View style={{ marginTop: -(height * 0.095) }}>
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
                width: width * 0.32,
                height: height * 0.25,
                borderRadius: 15,
              }}
              resizeMode="contain"
            />
            <View>
              <CustomText type="title" style={{ textAlign: "center" }}>
                {movieDetails?.title}
              </CustomText>

              {/* Genres */}
              <CustomText
                style={{
                  marginLeft: 8,
                  flexDirection: "row",
                  textAlign: "center",
                }}
              >
                {movieDetails?.genres?.map((genre, index) => {
                  let showDot = index + 1 != movieDetails.genres.length;

                  return (
                    <CustomText
                      key={index}
                      type="default"
                      style={{
                        fontWeight: "600",
                        textAlign: "center",
                        marginHorizontal: 16,
                        color: "rgb(163 163 163)",
                      }}
                    >
                      {genre?.name} {showDot ? "• " : null}
                    </CustomText>
                  );
                })}
              </CustomText>

              {/* Release Year, Runtime */}
              {movieDetails?.id ? (
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
                      {formatRuntime(movieDetails?.runtime)}
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
                      {movieDetails?.release_date}
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
              <View
                style={{
                  height: 38,
                  marginTop: 15,
                  alignItems: "center",
                }}
              >
                <CustomButton
                  iconLeft={
                    <Ionicons
                      name="play-sharp"
                      size={24}
                      color={Colors.background}
                    />
                  }
                  title="WATCH NOW"
                  onPress={() => {}}
                  style={{ paddingVertical: 7, paddingHorizontal: 10 }}
                  textStyle={{ fontSize: 14 }}
                  width="85%"
                  borderRadius={25}
                  textColor={Colors.background}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 25,
                  marginTop: 15,
                }}
              >
                <Pressable
                  style={{
                    borderRadius: 30,
                    backgroundColor: "gray",
                    padding: 10,
                  }}
                >
                  <MaterialIcons
                    name="favorite-outline"
                    size={20}
                    color="white"
                  />
                </Pressable>
                <Pressable
                  style={{
                    borderRadius: 30,
                    backgroundColor: "gray",
                    padding: 10,
                  }}
                >
                  <Entypo
                    name="dots-three-horizontal"
                    size={20}
                    color="white"
                  />
                </Pressable>
              </View>
            </View>
          </View>
          {/* Description */}

          <View style={{ marginHorizontal: 16, gap: 5 }}>
            <CustomText>Synopsis</CustomText>
            <CustomText
              type="extraSmall"
              style={{
                letterSpacing: 0.4,
                color: "rgb(163 163 163)",
              }}
            >
              {movieDetails?.overview}
            </CustomText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDetails;
