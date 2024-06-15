import React, { useCallback, RefObject, useContext } from "react";
import { FlatList, Pressable, View, StyleSheet } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

import { CustomText } from "@/components/Text";

import { TabParamList } from "@/constants/types";
import { Colors } from "@/constants/Colors";

import { type Category, type Movie } from "@/types";

import MovieList from "./MovieList";

export interface MoviesProps {
  navigation: BottomTabScreenProps<TabParamList, "Movies">;
  route?: RouteProp<TabParamList, "Movies">;
  categories: Category[];
  flatListRef: RefObject<FlatList>;
  onMovieLongPress: (movie: Movie) => void;
}

const MovieCategoryGroup = ({
  navigation,
  categories,
  flatListRef,
  onMovieLongPress,
}: MoviesProps) => {
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
              navigation.navigate("AllMovies", {
                category: item,
              })
            }
          >
            <CustomText type="default">See All</CustomText>
          </Pressable>
        </View>

        <MovieList
          categoryId={item.category_id}
          navigation={navigation}
          onMovieLongPress={onMovieLongPress}
        />
      </View>
    );
  };

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

  ratingTag: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "rgb(190 18 60)",
    borderRadius: 5,
    padding: 3,
  },

  emptyStateText: {
    marginLeft: 10,
    color: Colors.tint,
  },
});

export default MovieCategoryGroup;
