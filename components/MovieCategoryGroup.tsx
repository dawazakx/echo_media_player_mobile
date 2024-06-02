import { useCallback, RefObject } from "react";
import { FlatList, Pressable, Image, View, StyleSheet } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

import { CustomText } from "@/components/Text";

import { TabParamList } from "@/constants/types";
import { Colors } from "@/constants/Colors";

import { type Category, type Movie } from "@/types";

export interface MoviesProps {
  navigation: BottomTabScreenProps<TabParamList, "Movies">;
  route?: RouteProp<TabParamList, "Movies">;
  categories: Category[];
  movies: { [key: string]: Movie[] };
  flatListRef: RefObject<FlatList>;
}

const PLACEHOLDER_IMAGE = "https://placehold.co/400/000000/FFFFFF/png";

const MovieCategoryGroup = ({
  navigation,
  categories,
  movies,
  flatListRef,
}: MoviesProps) => {
  const renderMovieItem = useCallback(({ item }: { item: Movie }) => {
    if (!item) {
      return null;
    }

    return (
      <Pressable
        style={styles.movieItem}
        onPress={() => navigation.navigate("MovieDetails", { movie: item })}
      >
        <Image
          source={{ uri: item.stream_icon || PLACEHOLDER_IMAGE }}
          style={styles.movieImage}
          resizeMode="contain"
        />

        <View style={styles.ratingTag}>
          <CustomText type="extraSmall">
            {Number(item.rating).toFixed(1)}
          </CustomText>
        </View>
      </Pressable>
    );
  }, []);

  const renderCategorySection = useCallback(
    ({ item }: { item: Category }) => {
      if (!item) {
        return null;
      }

      const moviesForCategory = movies[item.category_id] || [];

      return (
        <View key={item.category_id} style={styles.categorySection}>
          <CustomText type="subtitle" style={styles.categoryTitle}>
            {item.category_name}
          </CustomText>

          <FlatList
            data={moviesForCategory}
            horizontal
            keyExtractor={(movie) => movie.stream_id.toString()}
            renderItem={renderMovieItem}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={3}
            updateCellsBatchingPeriod={50}
            ListEmptyComponent={
              <CustomText style={styles.emptyStateText}>
                No movies available
              </CustomText>
            }
          />
        </View>
      );
    },
    [movies]
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
