import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
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
import { fetchAllMovies, fetchCategories } from "@/providers/api";
import { useQuery } from "@tanstack/react-query";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Movie } from "@/types";

export interface MoviesProps {
  navigation: BottomTabScreenProps<TabParamList, "Movies">;
  route: RouteProp<TabParamList, "Movies">;
}

const MoviesTab: React.FC<MoviesProps> = ({ navigation, route }) => {
  const { deviceId } = useContext(DeviceContext);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const categoriesQuery = useQuery({
    queryKey: ["categories", deviceId],
    queryFn: () => fetchCategories(deviceId),
  });

  const availableCategories = categoriesQuery.data!;

  const moviesQuery = useQuery({
    queryKey: ["movies", availableCategories],
    queryFn: () => fetchAllMovies(deviceId, availableCategories),
    enabled: !!availableCategories,
    staleTime: 20 * 60 * 1000, // 20 minutes
  });

  useEffect(() => {
    if (availableCategories && availableCategories.length > 0) {
      setSelectedCategory(availableCategories[0].category_id);
    }
  }, [availableCategories]);

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryIndex = availableCategories?.findIndex(
      (category) => category.category_id === categoryId
    );
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: categoryIndex!,
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

  if (categoriesQuery.data && moviesQuery.data)
    return (
      <CustomView style={styles.container}>
        <CategoryFilter
          categories={availableCategories}
          selectedCategory={selectedCategory}
          onSelect={handleCategoryPress}
        />
        <MovieCategoryGroup
          navigation={navigation}
          categories={availableCategories}
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
                  style={{
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center",
                  }}
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
                  style={{
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center",
                  }}
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
                  style={{
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center",
                  }}
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

  if (categoriesQuery.isError || moviesQuery.isError)
    return (
      <CustomView
        style={{
          backgroundColor: Colors.secBackground,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CustomText type="extraSmall">
          An error occurred. Message:{" "}
          {categoriesQuery.error?.message || moviesQuery.error?.message}
        </CustomText>
      </CustomView>
    );

  return (
    <CustomView style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.white} />
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
