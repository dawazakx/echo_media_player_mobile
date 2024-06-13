import React, { useCallback, useContext } from "react";
import {
  FlatList,
  Pressable,
  Image,
  View,
  StyleSheet,
  Text,
} from "react-native";

import { type Movie } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchMoviesByCategory } from "@/providers/api";
import { DeviceContext } from "@/providers/DeviceProvider";
import { Colors } from "@/constants/Colors";
import { CustomText } from "./Text";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "@/constants/types";

const PLACEHOLDER_IMAGE = "https://placehold.co/400/000000/FFFFFF/png";

const MovieList = ({
  categoryId,
  navigation,
}: {
  categoryId: string;
  navigation: BottomTabScreenProps<TabParamList, "Movies">;
}) => {
  const { deviceId } = useContext(DeviceContext);

  const moviesQuery = useQuery({
    queryKey: ["movies", categoryId],
    queryFn: () => fetchMoviesByCategory(deviceId!, categoryId),
    staleTime: 20 * 60 * 1000, // 20 minutes
  });

  const renderMovieItem = useCallback(({ item }: { item: Movie }) => {
    if (!item) {
      return null;
    }

    return (
      <Pressable
        style={styles.movieItem}
        onPress={() => navigation.navigate("MovieDetails", { movie: item })}
      >
        <Image
          source={{ uri: item.stream_icon || PLACEHOLDER_IMAGE }}
          style={styles.movieImage}
          resizeMode="contain"
        />

        <View style={styles.ratingTag}>
          <CustomText type="extraSmall">
            {Number(item.rating).toFixed(1)}
          </CustomText>
        </View>
      </Pressable>
    );
  }, []);

  if (moviesQuery.data)
    return (
      <FlatList
        data={moviesQuery.data}
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

  if (moviesQuery.isError)
    return (
      <View>
        <Text>Error</Text>
      </View>
    );

  return (
    <View>
      <Text>Loading...</Text>
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
    height: "100%",
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