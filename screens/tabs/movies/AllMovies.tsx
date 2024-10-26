import React, { useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
  Text,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { DeviceContext } from "@/providers/DeviceProvider";

import { Movie, Category } from "@/types";
import { fetchMoviesByCategory } from "@/providers/api";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { MaterialIcons } from "@expo/vector-icons";
import useGetMovieContent from "@/hooks/api/useGetMovieContent";

export interface AllMoviesProps {
  route: RouteProp<{ params: { category: Category } }, "params">;
  navigation: any;
}

const PLACEHOLDER_IMAGE = "https://placehold.co/400/000000/FFFFFF/png";

const AllMovies: React.FC<AllMoviesProps> = ({ route, navigation }) => {
  const { category } = route.params;
  const insets = useSafeAreaInsets();

  const categoryId = category.category_id;
  const { data: movies, isError } = useGetMovieContent();

  const categorymovies = movies?.filter(
    (movies) => movies.category_id === categoryId
  );

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <Pressable
      style={styles.movieItem}
      onPress={() => navigation.navigate("MovieDetails", { movie: item })}
    >
      <Image
        source={{ uri: item.stream_icon || PLACEHOLDER_IMAGE }}
        style={styles.movieImage}
        resizeMode="contain"
      />
      <CustomText
        type="extraSmall"
        style={{ textAlign: "center", color: "#9ca3af" }}
      >
        {item.name}
      </CustomText>
      <View style={styles.ratingTag}>
        <CustomText type="extraSmall">
          {Number(item.rating).toFixed(1)}
        </CustomText>
      </View>
    </Pressable>
  );

  if (categorymovies) {
    return (
      <CustomView
        style={{
          flex: 1,
          paddingTop: insets.top,
          backgroundColor: Colors.secBackground,
        }}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.backBtn}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialIcons name="arrow-back" size={32} color={Colors.white} />
          </Pressable>

          <CustomText type="subtitle">{category.category_name}</CustomText>
        </View>
        <FlatList
          data={categorymovies}
          keyExtractor={(movie) => movie.stream_id.toString()}
          renderItem={renderMovieItem}
          numColumns={3}
          contentContainerStyle={styles.moviesContainer}
        />
      </CustomView>
    );
  }

  if (isError) {
    return (
      <CustomView style={styles.loadingContainer}>
        <Text>Error</Text>
      </CustomView>
    );
  }

  return (
    <CustomView style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.white} />
    </CustomView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secBackground,
  },
  header: {
    marginHorizontal: 12,
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
  },
  backBtn: {
    left: 0,
    backgroundColor: "transparent",
  },
  moviesContainer: {
    padding: 10,
    gap: 5,
  },
  movieItem: {
    width: "30%",
    margin: "1.5%",
    aspectRatio: 2 / 3,
  },
  movieImage: {
    width: "100%",
    height: "90%",
    borderRadius: 10,
  },
  ratingTag: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "rgb(190 18 60)",
    borderRadius: 5,
    padding: 3,
  },
});

export default AllMovies;
