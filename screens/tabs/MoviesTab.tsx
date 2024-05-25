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
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export interface MoviesProps {
  navigation: BottomTabScreenProps<TabParamList, "Movies">;
  route: RouteProp<TabParamList, "Movies">;
}

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

const fetchMoviesByCategory = async (
  deviceId: string | null,
  categoryId: string
): Promise<Movie[]> => {
  if (!deviceId || typeof deviceId !== "string") {
    throw new Error("Invalid device ID");
  }
  try {
    const response = await axios.get(
      `${BASE_URL}vod-stream?category_id=${categoryId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "device-id": deviceId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const MoviesTab: React.FC<MoviesProps> = ({ navigation, route }) => {
  const { deviceId } = useContext(DeviceContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await fetchCategories(deviceId);
      // console.log("Categories fetched:", categoriesData);
      setCategories(categoriesData);
      if (categoriesData.length > 0) {
        setSelectedCategory(categoriesData[0].category_id);
      }
    };
    fetchData();
  }, [deviceId]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (selectedCategory) {
        const moviesData = await fetchMoviesByCategory(
          deviceId,
          selectedCategory
        );
        console.log(
          `Movies for category ${selectedCategory} fetched:`,
          moviesData
        );
        setMovies(moviesData);
      }
    };
    fetchMovies();
  }, [selectedCategory, deviceId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.category_id}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.categoryButton,
              item.category_id === selectedCategory &&
                styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(item.category_id)}
          >
            <Text style={styles.categoryText}>{item.category_name}</Text>
          </Pressable>
        )}
      />

      <ScrollView>
        {selectedCategory && (
          <View key={selectedCategory} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>
              {
                categories.find((cat) => cat.category_id === selectedCategory)
                  ?.category_name
              }
            </Text>
            <FlatList
              data={movies}
              horizontal
              keyExtractor={(item) => item.stream_id.toString()}
              renderItem={({ item }) => (
                <View style={styles.movieItem}>
                  <Image
                    source={{ uri: item.stream_icon }}
                    style={styles.movieImage}
                  />
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  categoryButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#ddd",
    borderRadius: 20,
  },
  selectedCategoryButton: {
    backgroundColor: "#007bff",
  },
  categoryText: {
    color: "#000",
  },
  categorySection: {
    marginVertical: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  movieItem: {
    marginHorizontal: 10,
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
});

export default MoviesTab;
