import React, {
  useState,
  useRef,
  useCallback,
} from "react";
import {
  View,
  FlatList,
} from "react-native";
import {
  BottomTabScreenProps,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import { TabParamList } from "@/constants/types";
import { Colors } from "@/constants/Colors";
import useGetTvShowsCategories from "@/hooks/api/useGetTvShowsCategories";
import useInvalidateOnPlaylistChange from "@/hooks/api/useInvalidateOnPlaylistChange";
import CategoryFilter from "@/components/CategoryFilter";

import { Show } from "@/types";
import TopRatedShowsSection from "./components/TopRatedShowsSection";
import TvShowsCategoriesSection from "./components/TvShowsCategoriesSection";
import TvShowBottomSheet from "./components/TvShowBottomSheet";

export interface TvShowsProps {
  navigation: BottomTabScreenProps<TabParamList, "TvShows">;
  route: RouteProp<TabParamList, "TvShows">;
}

const TvShowsTab: React.FC<TvShowsProps> = ({ navigation }) => {
  useInvalidateOnPlaylistChange();
  const tabBarHeight = useBottomTabBarHeight();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { data: categories, isLoading } = useGetTvShowsCategories();

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

  const handleShowLongPress = useCallback((show: Show) => {
    setSelectedShow(show);
    bottomSheetRef.current?.expand();
  }, []);

  if (isLoading) {
    return null; 
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.secBackground, marginBottom: tabBarHeight }}>
      <CategoryFilter
        categories={categories!}
        selectedCategory={selectedCategory}
        onSelect={handleCategoryPress}
        filterRoute="AllTvShows"
      />
      <FlatList
        ref={flatListRef}
        data={[{ key: 'topRated' }, { key: 'categories' }]}
        renderItem={({ item }) => (
          item.key === 'topRated' 
            ? <TopRatedShowsSection /> 
            : <TvShowsCategoriesSection 
                navigation={navigation}
                categories={categories!}
                onShowLongPress={handleShowLongPress}
              />
        )}
        keyExtractor={(item) => item.key}
      />
      <TvShowBottomSheet
        ref={bottomSheetRef}
        selectedShow={selectedShow}
      />
    </View>
  );
};

export default TvShowsTab;
