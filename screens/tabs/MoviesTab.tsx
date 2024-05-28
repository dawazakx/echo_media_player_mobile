import React, { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

import { DeviceContext } from "@/providers/DeviceProvider";

import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import CategoryFilter from "@/components/CategoryFilter";
import MovieCategoryGroup from "@/components/MovieCategoryGroup";

import { Colors } from "@/constants/Colors";

import { TabParamList } from "@/constants/types";

import { Category, Movie } from "@/types";
import { fetchAllMovies, fetchCategories } from "@/providers/api";

export interface MoviesProps {
  navigation: BottomTabScreenProps<TabParamList, "Movies">;
  route: RouteProp<TabParamList, "Movies">;
}

const MoviesTab: React.FC<MoviesProps> = ({ navigation, route }) => {
  const { deviceId } = useContext(DeviceContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [movies, setMovies] = useState<{ [key: string]: Movie[] }>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const categoriesData = await fetchCategories(deviceId);
      setCategories(categoriesData);

      const moviesData = await fetchAllMovies(deviceId, categoriesData);
      setMovies(moviesData);

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
    <CustomView style={styles.container}>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleCategoryPress}
      />

      <MovieCategoryGroup
        navigation={navigation}
        categories={categories}
        movies={movies}
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

export default MoviesTab;
