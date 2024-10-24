import React, {
  useCallback,
  RefObject,
  useContext,
  forwardRef,
  ElementRef,
} from "react";
import {
  FlatList,
  Pressable,
  View,
  StyleSheet,
  FlatListProps,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

import { CustomText } from "@/components/Text";

import { TabParamList } from "@/constants/types";
import { Colors } from "@/constants/Colors";

import { Show, type Category, type Movie } from "@/types";

import TvShowsList from "./TvShowsList";

export interface TvShowsProps {
  navigation: BottomTabScreenProps<TabParamList, "TvShows">;
  route?: RouteProp<TabParamList, "TvShows">;
  categories: Category[];
  flatListRef: RefObject<FlatList>;
  onShowLongPress: (movie: Show) => void;
}

const TvShowsCategoryGroup = forwardRef<
  ElementRef<typeof FlatList<Category>>,
  TvShowsProps
>(({ navigation, categories, flatListRef, onShowLongPress }, ref) => {
  const renderCategorySection = ({ item }: { item: Category }) => {
    if (!item) {
      return null;
    }

    return (
      <View key={item.category_id} style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <CustomText type="subtitle" style={styles.categoryTitle}>
            {item.category_name}
          </CustomText>
          <Pressable
            onPress={() =>
              navigation.navigate("AllTvShows", {
                category: item,
              })
            }
          >
            <CustomText type="default">See All</CustomText>
          </Pressable>
        </View>

        <TvShowsList
          categoryId={item.category_id}
          navigation={navigation}
          onShowLongPress={onShowLongPress}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={ref}
        data={categories}
        renderItem={renderCategorySection}
        keyExtractor={(item) => item.category_id}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={3}
      />
    </View>
  );
});

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
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },

  categoryTitle: {
    marginLeft: 10,
    marginVertical: 10,
  },
});

export default TvShowsCategoryGroup;
