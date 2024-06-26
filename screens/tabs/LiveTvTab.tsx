import React, { useState, useContext, useRef, useEffect } from "react";

import { StyleSheet, ActivityIndicator, FlatList } from "react-native";
import {
  BottomTabScreenProps,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

import { DeviceContext } from "@/providers/DeviceProvider";

import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import CategoryFilter from "@/components/CategoryFilter";
import LiveStreamCategoryGroup from "@/components/LiveStreamCategoryGroup";

import { Colors } from "@/constants/Colors";
import { TabParamList } from "@/constants/types";

import { fetchLiveStreamCategories, fetchLiveStreams } from "@/providers/api";

import { Category, LiveStream } from "@/types";

export interface LiveTvProps {
  navigation: BottomTabScreenProps<TabParamList, "LiveTV">;
  route: RouteProp<TabParamList, "LiveTV">;
}

const LiveTvTab: React.FC<LiveTvProps> = ({ navigation, route }) => {
  const tabBarHeight = useBottomTabBarHeight();
  const { deviceId } = useContext(DeviceContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [liveStreams, setLiveStreams] = useState<{
    [key: string]: LiveStream[];
  }>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const categoriesData = await fetchLiveStreamCategories(deviceId);
      const availableCategories = categoriesData.slice(0, 30);
      setCategories(availableCategories);

      const liveStreamData = await fetchLiveStreams(
        deviceId,
        availableCategories
      );
      setLiveStreams(liveStreamData);

      if (categoriesData.length > 0) {
        setSelectedCategory(categoriesData[0].category_id);
      }

      setLoading(false);
    };

    fetchData();
  }, [deviceId]);

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryIndex = categories.findIndex(
      (category) => category.category_id === categoryId
    );
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: categoryIndex,
        animated: true,
      });
    }
  };

  if (loading) {
    return (
      <CustomView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.white} />
      </CustomView>
    );
  }

  if (categories.length === 0) {
    return (
      <CustomView style={styles.container}>
        <CustomText>No categories found.</CustomText>
      </CustomView>
    );
  }

  return (
    <CustomView
      style={{
        backgroundColor: Colors.secBackground,
        paddingBottom: tabBarHeight,
      }}
    >
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleCategoryPress}
      />

      <LiveStreamCategoryGroup
        navigation={navigation}
        categories={categories}
        streams={liveStreams}
        flatListRef={flatListRef}
      />
    </CustomView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secBackground,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secBackground,
  },
});

export default LiveTvTab;
