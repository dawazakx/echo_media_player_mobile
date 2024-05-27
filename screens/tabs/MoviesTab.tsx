import CustomButton from "@/components/Button";
import HorizontalFilter from "@/components/HorizontalFilter";
import MovieCarousel from "@/components/MovieCarousel";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { BASE_URL } from "@/constants/api";
import { TabParamList } from "@/constants/types";
import { DeviceContext } from "@/providers/DeviceProvider";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export interface MoviesProps {
  navigation: BottomTabScreenProps<TabParamList, "Movies">;
  route: RouteProp<TabParamList, "Movies">;
}

const { width, height } = Dimensions.get("window");
const PLACEHOLDER_IMAGE = "https://placehold.co/400/000000/FFFFFF/png";

export interface Category {
  category_id: string;
  category_name: string;
  parent_id: number;
  // streams: Movie[];
}

export type Movie = {
  added: Date;
  category_id: string;
  category_name: string;
  container_extension: string;
  custom_sid: string;
  direct_source: string;
  epg_channel_id: string;
  stream_icon: string;
  stream_id: number;
  url: string;
  name: string;
  num: number;
  rating: number;
  rating_5based: number;
  tv_archive: number;
  tv_archive_duration: number;
  stream_type: string;
};

const fetchCategories = async (
  deviceId: string | null
): Promise<Category[]> => {
  if (!deviceId || typeof deviceId !== "string") {
    throw new Error("Invalid device ID");
  }
  try {
    const response = await axios.get(`${BASE_URL}vod-stream-category`, {
      headers: {
        "Content-Type": "application/json",
        "device-id": deviceId,
      },
    });
    return response.data.vodCategories;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchAllMovies = async (
  deviceId: string | null,
  categories: Category[]
): Promise<{ [key: string]: Movie[] }> => {
  try {
    const allMovies = await Promise.all(
      categories.map(async (category) => {
        const response = await axios.get(
          `${BASE_URL}vod-stream?category_id=${category.category_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "device-id": deviceId,
            },
          }
        );
        return { [category.category_id]: response.data.streams };
      })
    );
    return allMovies.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  } catch (error) {
    console.error(error);
    return {};
  }
};

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
      console.log(moviesData);
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

  const renderCategoryItem = useCallback(
    ({ item }) => (
      <CustomButton
        borderRadius={15}
        style={
          item.category_id === selectedCategory
            ? styles.selectedCategoryItem
            : styles.categoryItem
        }
        textStyle={
          item.category_id === selectedCategory
            ? styles.selectedCategoryText
            : styles.categoryText
        }
        onPress={() => handleCategoryPress(item.category_id)}
        title={item.category_name}
      ></CustomButton>
    ),
    [selectedCategory]
  );

  const renderMovieItem = useCallback(
    ({ item }) => (
      <Pressable
        style={styles.movieItem}
        onPress={() => navigation.navigate("MovieDetails", { movie: item })}
      >
        <Image
          source={{ uri: item.stream_icon || PLACEHOLDER_IMAGE }}
          style={styles.movieImage}
          resizeMode="contain"
        />
      </Pressable>
    ),
    []
  );

  const renderCategorySection = useCallback(
    ({ item }) => (
      <View key={item.category_id} style={styles.categorySection}>
        <CustomText type="subtitle" style={styles.categoryTitle}>
          {item.category_name}
        </CustomText>
        <FlatList
          data={movies[item.category_id] || []}
          horizontal
          keyExtractor={(movie) => movie.stream_id.toString()}
          renderItem={renderMovieItem}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={3}
          updateCellsBatchingPeriod={50}
          ListEmptyComponent={<CustomText>No movies available</CustomText>}
        />
      </View>
    ),
    [movies]
  );

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
        <CustomText>Loading categories...</CustomText>
      </CustomView>
    );
  }

  return (
    <CustomView style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.category_id}
        renderItem={renderCategoryItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      />

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
  categoryContainer: {
    paddingHorizontal: 10,
    paddingTop: 15,
    gap: 10,
    height: 55,
    marginBottom: 12,
  },
  categoryItem: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  selectedCategoryItem: {
    backgroundColor: Colors.tint,
  },
  categoryText: {
    color: Colors.white,
    fontSize: 14,
    lineHeight: 14,
  },
  selectedCategoryText: {
    color: Colors.background,
    fontSize: 14,
    lineHeight: 14,
  },
  categorySection: {
    marginVertical: 10,
  },
  categoryTitle: {
    marginLeft: 10,
    marginVertical: 10,
  },
  movieItem: {
    marginHorizontal: 4,
  },
  movieImage: {
    width: width * 0.28,
    height: height * 0.2,
    borderRadius: 10,
  },
});

export default MoviesTab;
