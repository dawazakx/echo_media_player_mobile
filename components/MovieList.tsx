import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  // Image,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";

import { Image } from "expo-image";

import { type Movie } from "@/types";
import { useQuery } from "@tanstack/react-query";

import { Colors } from "@/constants/Colors";
import { CustomText } from "./Text";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "@/constants/types";
import { image500 } from "@/constants/api";
import useGetMovieContent from "@/hooks/api/useGetMovieContent";

const PLACEHOLDER_IMAGE = "https://placehold.co/400/000000/FFFFFF/png";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const MovieList = ({
  categoryId,
  navigation,
  onMovieLongPress,
}: {
  categoryId: string;
  navigation: BottomTabScreenProps<TabParamList, "Movies">;
  onMovieLongPress: (movie: Movie) => void;
}) => {
  const { data: movies, isError } = useGetMovieContent();

  const categorymovies = movies?.filter(
    (movie) => movie.category_id === categoryId
  );

  const renderMovieItem = useCallback(({ item }: { item: Movie }) => {
    return (
      <Pressable
        style={styles.movieItem}
        onLongPress={() => onMovieLongPress(item)}
        onPress={() => navigation.navigate("MovieDetails", { movie: item })}
        delayLongPress={250}
      >
        <Image
          // source={{ uri: item.stream_icon || PLACEHOLDER_IMAGE }}
          source={`${item.stream_icon}`}
          placeholder={{ blurhash }}
          style={styles.movieImage}
          // resizeMode="contain"
        />
        <CustomText
          type="extraSmall"
          style={{ textAlign: "center", color: "#9ca3af" }}
        >
          {item.name}
        </CustomText>

        <View style={styles.ratingTag}>
          <CustomText type="extraSmall">
            {Number(item.rating).toFixed(1)}
          </CustomText>
        </View>
      </Pressable>
    );
  }, []);

  if (categorymovies)
    return (
      <FlatList
        data={categorymovies.slice(0, 15)}
        horizontal
        keyExtractor={(movie) => movie.stream_id.toString()}
        renderItem={renderMovieItem}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={3}
        updateCellsBatchingPeriod={50}
        ListEmptyComponent={
          <CustomText style={styles.emptyStateText}>
            No movies available
          </CustomText>
        }
      />
    );

  if (isError) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View>
      <ActivityIndicator size="large" color={Colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    width: 120,
    height: 180,
    marginRight: 4,
    marginHorizontal: 10,
  },

  movieImage: {
    width: "100%",
    height: "90%",
    marginBottom: 3,
    borderRadius: 10,
  },

  ratingTag: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "rgb(190 18 60)",
    borderRadius: 5,
    padding: 3,
  },

  emptyStateText: {
    marginLeft: 10,
    color: Colors.tint,
  },
});

export default MovieList;
