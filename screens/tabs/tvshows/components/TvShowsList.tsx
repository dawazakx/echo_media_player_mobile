import React, { memo, useCallback, useState, useEffect } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";

import { Image } from "expo-image";

import { Show } from "@/types";

import { Colors } from "@/constants/Colors";
import { CustomText } from "../../../../components/Text";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "@/constants/types";
import useGetTvShowsContent from "@/hooks/api/useGetTvShowsContent";
import { FlashList } from "@shopify/flash-list";
import { TvShowItem } from "./TvShowItem";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ITEMS_PER_PAGE = 15;

const TvShowsList = memo(
  ({
    categoryId,
    navigation,
    onShowLongPress,
  }: {
    categoryId: string;
    navigation: BottomTabScreenProps<TabParamList, "TvShows">;
    onShowLongPress: (tvshow: Show) => void;
  }) => {
    const [page, setPage] = useState(1);
    const [localTvShows, setLocalTvShows] = useState<Show[]>([]);

    const { data: tvshows, status, error } = useGetTvShowsContent(categoryId);

    useEffect(() => {
      if (tvshows) {
        const filteredTvShows = tvshows.filter(
          (tvshow) => tvshow.category_id === categoryId
        );
        setLocalTvShows(filteredTvShows.slice(0, ITEMS_PER_PAGE));
      }
    }, [tvshows, categoryId]);

    const loadMore = useCallback(() => {
      if (tvshows) {
        const filteredTvShows = tvshows.filter(
          (tvshow) => tvshow.category_id === categoryId
        );
        if (localTvShows.length < filteredTvShows.length) {
          const nextPage = page + 1;
          const newTvShows = filteredTvShows.slice(
            0,
            nextPage * ITEMS_PER_PAGE
          );
          setLocalTvShows(newTvShows);
          setPage(nextPage);
        }
      }
    }, [tvshows, categoryId, localTvShows.length, page]);

    const renderTvShowItem = useCallback(({ item }: { item: Show }) => {
      return (
        <TvShowItem
          tvshow={item}
          onLongPress={onShowLongPress}
        />
      );
    }, [onShowLongPress]);

    if (status === "error") {
      return <CustomText>Error loading movies: {error instanceof Error ? error.message : 'Unknown error'}</CustomText>;
    }

    return (
      <FlatList
        data={localTvShows}
        horizontal
        keyExtractor={(tvshow) => tvshow.series_id.toString()}
        renderItem={renderTvShowItem}
        showsHorizontalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          localTvShows.length < (
            tvshows?.filter(
              (tvshow) => tvshow.category_id === categoryId
            ).length || 0
          ) ? (
            <View>
              <ActivityIndicator size="large" color={Colors.white} />
            </View>
          ) : null
        }
        ListEmptyComponent={
          <CustomText style={styles.emptyStateText}>
            No Tv Shows available
          </CustomText>
        }
      />
    );
  }
);

const styles = StyleSheet.create({
  emptyStateText: {
    marginLeft: 10,
    color: Colors.tint,
  },
});

export default TvShowsList;
