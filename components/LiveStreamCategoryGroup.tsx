import { useCallback, RefObject, useContext } from "react";
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

import { CustomText } from "@/components/Text";

import { TabParamList } from "@/constants/types";
import { Colors } from "@/constants/Colors";

import { type Category, type LiveStream } from "@/types";
import { DeviceContext } from "@/providers/DeviceProvider";
import { useQuery } from "@tanstack/react-query";
import { fetchLiveTvByCategory } from "@/providers/api";

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
  const { deviceId } = useContext(DeviceContext);

  const liveTvQuery = useQuery({
    queryKey: ["tv", categoryId],
    queryFn: () => fetchLiveTvByCategory(deviceId!, categoryId),
    staleTime: 20 * 60 * 1000, // 20 minutes
  });

  const renderLiveStreamItem = useCallback(({ item }: { item: LiveStream }) => {
    // console.log("item:", item);
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

  // const renderCategorySection = useCallback(
  //   ({ item }: { item: Category }) => {
  //     if (!item) {
  //       return null;
  //     }

  //     const streamsForCategory = streams[item.category_id] || [];

  //     return (
  //       <View key={item.category_id} style={styles.categorySection}>
  //         <CustomText type="subtitle" style={styles.categoryTitle}>
  //           {item.category_name}
  //         </CustomText>

  //         <FlatList
  //           data={streamsForCategory}
  //           horizontal
  //           keyExtractor={(stream) => stream.stream_id.toString()}
  //           renderItem={renderItem}
  //           showsHorizontalScrollIndicator={false}
  //           initialNumToRender={5}
  //           maxToRenderPerBatch={5}
  //           windowSize={3}
  //           updateCellsBatchingPeriod={50}
  //           ListEmptyComponent={
  //             <CustomText style={styles.emptyStateText}>
  //               No live streams available
  //             </CustomText>
  //           }
  //         />
  //       </View>
  //     );
  //   },
  //   [streams]
  // );
  if (liveTvQuery.data)
    return (
      <View style={{ marginTop: 10 }}>
        <FlatList
          data={liveTvQuery.data}
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
  if (liveTvQuery.isError) {
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
});

export default LiveStreamCategoryGroup;
