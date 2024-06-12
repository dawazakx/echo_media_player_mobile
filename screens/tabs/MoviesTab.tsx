import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

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
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

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
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const categoriesData = await fetchCategories(deviceId);
      const availableCategories = categoriesData.slice(0, 20);
      setCategories(availableCategories);

      const moviesData = await fetchAllMovies(deviceId, availableCategories);
      setMovies(moviesData);

      if (availableCategories.length > 0) {
        setSelectedCategory(availableCategories[0].category_id);
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

  const handleMovieLongPress = (movie: Movie) => {
    setSelectedMovie(movie);
    bottomSheetRef.current?.expand();
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.7}
      />
    ),
    []
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
        onMovieLongPress={handleMovieLongPress}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["45%"]}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: Colors.secBackground }}
        handleIndicatorStyle={{ backgroundColor: Colors.white }}
        backdropComponent={renderBackdrop}
      >
        {selectedMovie && (
          <View style={{ padding: 1 }}>
            <CustomText
              type="subtitle"
              style={{ textAlign: "center", marginBottom: 10 }}
            >
              {selectedMovie.name}
            </CustomText>
            <View
              style={{
                borderRadius: 15,
                gap: 9,
                padding: 20,
                backgroundColor: Colors.tint,
              }}
            >
              <Pressable
                style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
              >
                <MaterialIcons
                  name="play-circle"
                  size={24}
                  color={Colors.background}
                />
                <CustomText
                  type="subtitle"
                  style={{ color: Colors.background }}
                >
                  Play
                </CustomText>
              </Pressable>
              <View
                style={{
                  width: "88%",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: Colors.secBackground,
                  alignSelf: "flex-end",
                }}
              />
              <Pressable
                style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
              >
                <MaterialIcons
                  name="bookmark"
                  size={24}
                  color={Colors.background}
                />
                <CustomText
                  type="subtitle"
                  style={{ color: Colors.background }}
                >
                  Add to Watchlist
                </CustomText>
              </Pressable>
              <View
                style={{
                  width: "88%",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: Colors.secBackground,
                  alignSelf: "flex-end",
                }}
              />
              <Pressable
                style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
              >
                <MaterialIcons
                  name="download"
                  size={24}
                  color={Colors.background}
                />
                <CustomText
                  type="subtitle"
                  style={{ color: Colors.background }}
                >
                  Download
                </CustomText>
              </Pressable>
            </View>
          </View>
        )}
      </BottomSheet>
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
