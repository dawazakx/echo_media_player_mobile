import React, { useState, useRef } from "react";
import { StyleSheet, ActivityIndicator, FlatList } from "react-native";
import {
  BottomTabScreenProps,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import CategoryFilter from "@/components/CategoryFilter";
import LiveStreamCategoryGroup from "@/components/LiveStreamCategoryGroup";

import useGetLiveStreamCategories from "@/hooks/api/useGetLiveStreamCategories";

import { Colors } from "@/constants/Colors";
import { TabParamList } from "@/constants/types";

import { Category, LiveStream } from "@/types";

export interface LiveTvProps {
  navigation: BottomTabScreenProps<TabParamList, "LiveTV">;
  route: RouteProp<TabParamList, "LiveTV">;
}

const LiveTvTab: React.FC<LiveTvProps> = ({ navigation, route }) => {
  const tabBarHeight = useBottomTabBarHeight();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const { data: categories, isLoading } = useGetLiveStreamCategories();

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  if (isLoading) {
    return (
      <CustomView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.white} />
      </CustomView>
    );
  }

  if (categories?.length === 0) {
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
        flex: 1,
        paddingBottom: tabBarHeight + 50,
      }}
    >
      {categories && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={handleCategoryPress}
        />
      )}

      {/* {selectedCategory && (
        <LiveStreamCategoryGroup
          navigation={navigation}
          categoryId={selectedCategory}
        />
      )} */}
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
