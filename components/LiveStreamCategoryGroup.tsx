import React, { useCallback, useEffect, useState, RefObject, useContext } from "react";
import {
  FlatList,
  Pressable,
  Image,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { useQueryClient } from '@tanstack/react-query'

import { CustomText } from "@/components/Text";

import useGetLiveStreamContent from "@/hooks/api/useGetLiveStreamContent";

import { TabParamList } from "@/constants/types";
import { Colors } from "@/constants/Colors";
import { QUERY_KEYS } from "@/constants";

import { type LiveStream } from "@/types";

export interface LiveStreamProps {
  navigation: BottomTabScreenProps<TabParamList, "LiveTV">;
  route?: RouteProp<TabParamList, "LiveTV">;
  categoryId: string;
  // streams: LiveStream[];
}

const PLACEHOLDER_IMAGE = "https://placehold.co/400/000000/FFFFFF/png";

const LiveStreamCategoryGroup = ({
  navigation,
  categoryId,
}: LiveStreamProps) => {
  const queryClient = useQueryClient();
  const { data: liveStreams, isError } = useGetLiveStreamContent({ categoryId });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.liveStreamContent] });
  }, [categoryId]);

  const renderLiveStreamItem = useCallback(({ item }: { item: LiveStream }) => {
    if (!item) {
      return null;
    }

    return (
      <Pressable
        style={styles.movieItem}
        onPress={() =>
          navigation.navigate("LiveStreamDetails", { stream: item })
        }
      >
        <Image
          source={{ uri: item.stream_icon || PLACEHOLDER_IMAGE }}
          style={styles.movieImage}
          resizeMode="contain"
        />
        <CustomText
          type="subtitle"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ flex: 1, textAlign: "left", color: "#9ca3af" }}
        >
          {item.name}
        </CustomText>
      </Pressable>
    );
  }, []);

  if (liveStreams) {
    return (
      <View style={{ marginTop: 10 }}>
        <FlatList
          data={liveStreams}
          keyExtractor={(tv) => tv.stream_id.toString()}
          renderItem={renderLiveStreamItem}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={3}
          updateCellsBatchingPeriod={50}
          ListEmptyComponent={
            <CustomText style={{ marginLeft: 10, color: Colors.tint }}>
              Channels unavailable
            </CustomText>
          }
        />
      </View>
    );
  }
    
  if (isError) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: "#1e293b",
    marginBottom: 13,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 13,
  },

  movieImage: {
    width: 40,
    height: 50,
    // borderRadius: 10,
  },

  categorySection: {
    marginVertical: 10,
  },

  categoryTitle: {
    marginLeft: 10,
    marginVertical: 10,
  },

  emptyStateText: {
    marginLeft: 10,
    color: Colors.tint,
  },

  loadingContainer: {
    marginTop: 10,
  }
});

export default LiveStreamCategoryGroup;
