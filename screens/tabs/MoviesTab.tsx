import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

import { DeviceContext } from "@/providers/DeviceProvider";

import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import CategoryFilter from "@/components/CategoryFilter";
import MovieCategoryGroup from "@/components/MovieCategoryGroup";

import { Colors } from "@/constants/Colors";

import { TabParamList } from "@/constants/types";

import { fetchAllMovies, fetchCategories } from "@/providers/api";
import { useQuery } from "@tanstack/react-query";

export interface MoviesProps {
  navigation: BottomTabScreenProps<TabParamList, "Movies">;
  route: RouteProp<TabParamList, "Movies">;
}

const MoviesTab: React.FC<MoviesProps> = ({ navigation, route }) => {
  const { deviceId } = useContext(DeviceContext);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const categoriesQuery = useQuery({
    queryKey: ["categories", deviceId],
    queryFn: () => fetchCategories(deviceId),
  });

  const availableCategories = categoriesQuery.data!;

  // Then get the movies
  const moviesQuery = useQuery({
    queryKey: ["movies", availableCategories],
    queryFn: () => fetchAllMovies(deviceId, availableCategories),
    enabled: !!availableCategories,
    staleTime: 20 * 60 * 1000, // 20 minutes
  });

  useEffect(() => {
    if (availableCategories && availableCategories.length > 0) {
      setSelectedCategory(availableCategories[0].category_id);
    }
  }, [availableCategories]);

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryIndex = availableCategories?.findIndex(
      (category) => category.category_id === categoryId
    );
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: categoryIndex!,
        animated: true,
      });
    }
  };

  if (categoriesQuery.data && moviesQuery.data)
    return (
      <CustomView style={styles.container}>
        <CategoryFilter
          categories={availableCategories}
          selectedCategory={selectedCategory}
          onSelect={handleCategoryPress}
        />
        <MovieCategoryGroup
          navigation={navigation}
          categories={availableCategories}
          flatListRef={flatListRef}
        />
      </CustomView>
    );

  if (categoriesQuery.isError || moviesQuery.isError)
    return (
      <CustomView
        style={{
          backgroundColor: Colors.secBackground,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CustomText type="extraSmall">
          An error occurred. Message:{" "}
          {categoriesQuery.error?.message || moviesQuery.error?.message}
        </CustomText>
      </CustomView>
    );

  return (
    <CustomView style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.white} />
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

export default MoviesTab;
