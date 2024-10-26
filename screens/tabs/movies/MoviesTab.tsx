import React, {
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  BottomTabScreenProps,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import { TabParamList } from "@/constants/types";
import { Colors } from "@/constants/Colors";
import useGetMovieCategories from "@/hooks/api/useGetMovieCategories";
import useInvalidateOnPlaylistChange from "@/hooks/api/useInvalidateOnPlaylistChange";
import CategoryFilter from "@/components/CategoryFilter";

import { Movie } from "@/types";
import PopularMoviesSection from "./components/PopularMoviesSection";
import MovieCategoriesSection from "./components/MovieCategoriesSection";
import MovieBottomSheet from "./components/MovieBottomSheet";
import { PlaylistContext } from "@/providers/PlaylistProvider";
import { CustomView } from "@/components/View";

export interface MoviesProps {
  navigation: BottomTabScreenProps<TabParamList, "Movies">;
  route: RouteProp<TabParamList, "Movies">;
}

const MoviesTab: React.FC<MoviesProps> = ({ navigation }) => {
  useInvalidateOnPlaylistChange();
  const tabBarHeight = useBottomTabBarHeight();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { isPlaylistChanging } = useContext(PlaylistContext);


  const { data: categories, isLoading } = useGetMovieCategories();

  const handleCategoryPress = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryIndex = categories?.findIndex(
      (category) => category.category_id === categoryId
    );
    if (flatListRef.current && categoryIndex !== -1) {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: 262 * categoryIndex! + 428,
          animated: true,
        });
      }, 100);
    }
  }, [categories]);

  const handleMovieLongPress = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    bottomSheetRef.current?.expand();
  }, []);

  if (isLoading || isPlaylistChanging) {
    return (
      <CustomView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.white} />
      </CustomView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.secBackground, marginBottom: tabBarHeight }}>
      <CategoryFilter
        categories={categories!}
        selectedCategory={selectedCategory}
        onSelect={handleCategoryPress}
        filterRoute="AllMovies"
      />
      <FlatList
        ref={flatListRef}
        data={[{ key: 'popular' }, { key: 'categories' }]}
        renderItem={({ item }) => (
          item.key === 'popular' 
            ? <PopularMoviesSection /> 
            : <MovieCategoriesSection 
                navigation={navigation}
                categories={categories!}
                onMovieLongPress={handleMovieLongPress}
              />
        )}
        keyExtractor={(item) => item.key}
      />
      <MovieBottomSheet
        ref={bottomSheetRef}
        selectedMovie={selectedMovie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secBackground,
  },
});

export default MoviesTab;
