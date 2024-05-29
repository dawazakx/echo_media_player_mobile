import { useCallback, RefObject } from "react";
import { FlatList, Pressable, Image, View, StyleSheet } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

import { CustomText } from "@/components/Text";

import { TabParamList } from "@/constants/types";
import { Colors } from "@/constants/Colors";

import { type Category, type LiveStream } from "@/types";

export interface LiveStreamProps {
  navigation: BottomTabScreenProps<TabParamList, "LiveTV">;
  route?: RouteProp<TabParamList, "LiveTV">;
  categories: Category[];
  streams: { [key: string]: LiveStream[] };
  flatListRef: RefObject<FlatList>;
}

const PLACEHOLDER_IMAGE = "https://placehold.co/400/000000/FFFFFF/png";

const LiveStreamCategoryGroup = ({
  navigation,
  categories,
  streams,
  flatListRef,
}: LiveStreamProps) => {
  const renderItem = useCallback(
    ({ item }: { item: LiveStream }) => {
      console.log("item:", item);
      if (!item) {
        return null;
      }

      return (
        <Pressable
          style={styles.movieItem}
          onPress={() => navigation.navigate("LiveStreamDetails")}
        >
          <Image
            source={{ uri: item.stream_icon || PLACEHOLDER_IMAGE }}
            style={styles.movieImage}
            resizeMode="contain"
          />
        </Pressable>
      );
    },
    []
  );

  const renderCategorySection = useCallback(
    ({ item }: { item: Category }) => {
      if (!item) {
        return null;
      }

      const streamsForCategory = streams[item.category_id] || [];

      return (
        <View key={item.category_id} style={styles.categorySection}>
          <CustomText type="subtitle" style={styles.categoryTitle}>
            {item.category_name}
          </CustomText>

          <FlatList
            data={streamsForCategory}
            horizontal
            keyExtractor={(stream) => stream.stream_id.toString()}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={3}
            updateCellsBatchingPeriod={50}
            ListEmptyComponent={
              <CustomText style={styles.emptyStateText}>
                No live streams available
              </CustomText>
            }
          />
        </View>
      );
    },
    [streams]
  );

  return (
    <FlatList
      ref={flatListRef}
      data={categories}
      keyExtractor={(item) => item.category_id}
      renderItem={renderCategorySection}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={3}
      updateCellsBatchingPeriod={50}
    />
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
  }
});

export default LiveStreamCategoryGroup;