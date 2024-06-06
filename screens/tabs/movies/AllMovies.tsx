// import React, { useContext, useEffect, useState } from "react";
// import {
//   View,
//   FlatList,
//   StyleSheet,
//   Image,
//   Pressable,
//   ActivityIndicator,
// } from "react-native";
// import { RouteProp } from "@react-navigation/native";
// import { CustomText } from "@/components/Text";
// import { CustomView } from "@/components/View";
// import { Colors } from "@/constants/Colors";
// import { DeviceContext } from "@/providers/DeviceProvider";

// import { Movie, Category } from "@/types";
// import { fetchMoviesByCategory } from "@/providers/api";

// export interface AllMoviesProps {
//   route: RouteProp<{ params: { categoryId: string } }, "params">;
//   navigation: any;
// }

// const PLACEHOLDER_IMAGE = "https://placehold.co/400/000000/FFFFFF/png";

// const AllMovies: React.FC<AllMoviesProps> = ({ route, navigation }) => {
//   const { deviceId } = useContext(DeviceContext);
//   const [movies, setMovies] = useState<{ [key: string]: Movie[] }>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const { categoryId } = route.params;

//   useEffect(() => {
//     const fetchMovies = async () => {
//       setLoading(true);
//       const moviesData = await fetchMoviesByCategory(deviceId, categoryId);
//       setMovies(moviesData);
//       setLoading(false);
//     };

//     fetchMovies();
//   }, [deviceId, categoryId]);

//   const renderMovieItem = ({ item }: { item: Movie }) => (
//     <Pressable
//       style={styles.movieItem}
//       onPress={() => navigation.navigate("MovieDetails", { movie: item })}
//     >
//       <Image
//         source={{ uri: item.stream_icon || PLACEHOLDER_IMAGE }}
//         style={styles.movieImage}
//         resizeMode="contain"
//       />
//       <View style={styles.ratingTag}>
//         <CustomText type="extraSmall">
//           {Number(item.rating).toFixed(1)}
//         </CustomText>
//       </View>
//     </Pressable>
//   );

//   if (loading) {
//     return (
//       <CustomView style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={Colors.white} />
//       </CustomView>
//     );
//   }

//   return (
//     <FlatList
//       data={movies}
//       keyExtractor={(movie) => movie.stream_id.toString()}
//       renderItem={renderMovieItem}
//       numColumns={3}
//       contentContainerStyle={styles.moviesContainer}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Colors.secBackground,
//   },

//   moviesContainer: {
//     padding: 10,
//   },

//   movieItem: {
//     width: "30%",
//     margin: "1.5%",
//     aspectRatio: 2 / 3,
//   },

//   movieImage: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//   },

//   ratingTag: {
//     position: "absolute",
//     top: 6,
//     left: 6,
//     backgroundColor: "rgb(190 18 60)",
//     borderRadius: 5,
//     padding: 3,
//   },
// });

// export default AllMovies;

import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { DeviceContext } from "@/providers/DeviceProvider";

import { Movie, Category } from "@/types";
import { fetchMoviesByCategory, fetchCategories } from "@/providers/api";
import CategoryFilter from "@/components/CategoryFilter";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface AllMoviesProps {
  route: RouteProp<{ params: { categoryId: string } }, "params">;
  navigation: any;
}

const PLACEHOLDER_IMAGE = "https://placehold.co/400/000000/FFFFFF/png";

const AllMovies: React.FC<AllMoviesProps> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { deviceId } = useContext(DeviceContext);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    route.params.categoryId
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesData = await fetchCategories(deviceId);
        setCategories(categoriesData);
        if (selectedCategory) {
          const moviesData = await fetchMoviesByCategory(
            deviceId,
            selectedCategory
          );
          setMovies(moviesData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deviceId, selectedCategory]);

  const handleCategoryPress = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    try {
      const moviesData = await fetchMoviesByCategory(deviceId, categoryId);
      setMovies(moviesData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
      <View style={styles.ratingTag}>
        <CustomText type="extraSmall">
          {Number(item.rating).toFixed(1)}
        </CustomText>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <CustomView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.white} />
      </CustomView>
    );
  }

  return (
    <CustomView
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: Colors.secBackground,
      }}
    >
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleCategoryPress}
      />
      <FlatList
        data={movies}
        keyExtractor={(movie) => movie.stream_id.toString()}
        renderItem={renderMovieItem}
        numColumns={3}
        contentContainerStyle={styles.moviesContainer}
      />
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
  moviesContainer: {
    padding: 10,
  },
  movieItem: {
    width: "30%",
    margin: "1.5%",
    aspectRatio: 2 / 3,
  },
  movieImage: {
    width: "100%",
    height: "100%",
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
