import React, { memo, useCallback } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";

import { Image } from "expo-image";

import { Show } from "@/types";

import { Colors } from "@/constants/Colors";
import { CustomText } from "./Text";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "@/constants/types";
import useGetTvShowsContent from "@/hooks/api/useGetTvShowsContent";
import { FlashList } from "@shopify/flash-list";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const TvShowsList = memo(
  ({
    categoryId,
    navigation,
    onMovieLongPress,
  }: {
    categoryId: string;
    navigation: BottomTabScreenProps<TabParamList, "TvShows">;
    onMovieLongPress: (movie: Show) => void;
  }) => {
    const { data: tvshows, isError } = useGetTvShowsContent();

    const categorytvshows = tvshows?.filter(
      (tvshows) => tvshows.category_id === categoryId
    );

    const renderTvShowItem = useCallback(({ item }: { item: Show }) => {
      return (
        <Pressable
          style={({ pressed }) => ({
            ...styles.movieItem,
            opacity: pressed ? 0.5 : 1,
          })}
          onLongPress={() => onMovieLongPress(item)}
          onPress={() =>
            navigation.navigate("TvSeriesDetails", { tvshows: item })
          }
          delayLongPress={250}
        >
          <Image
            source={`${item.cover}`}
            placeholder={{ blurhash }}
            style={styles.movieImage}
            accessibilityLabel={item.name}
            alt={item.name}
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

    if (categorytvshows)
      return (
        <FlashList
          data={categorytvshows.slice(0, 15)}
          horizontal
          keyExtractor={(tvshow) => tvshow.series_id.toString()}
          renderItem={renderTvShowItem}
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={120}
          estimatedListSize={{ height: 120, width: 360 }}
          ListEmptyComponent={
            <CustomText style={styles.emptyStateText}>
              No Tv Shows available
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
  }
);

const styles = StyleSheet.create({
  movieItem: {
    width: 120,
    height: 180,
    marginHorizontal: 5,
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

export default TvShowsList;
