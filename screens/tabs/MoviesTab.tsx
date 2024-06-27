import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  BottomTabScreenProps,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { DeviceContext } from "@/providers/DeviceProvider";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import CategoryFilter from "@/components/CategoryFilter";
import MovieCategoryGroup from "@/components/MovieCategoryGroup";
import { Colors } from "@/constants/Colors";
import { TabParamList } from "@/constants/types";
import {
  fetchAllMovies,
  fetchCategories,
  fetchTopRatedMovies,
} from "@/providers/api";
import { useQuery } from "@tanstack/react-query";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Movie } from "@/types";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { PlaylistContext } from "@/providers/PlaylistProvider";

export interface MoviesProps {
  navigation: BottomTabScreenProps<TabParamList, "Movies">;
  route: RouteProp<TabParamList, "Movies">;
}

const { width, height } = Dimensions.get("window");
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.62 : width * 0.64;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

interface Poster {
  id: number;
  title: string;
  poster_path: string;
}

interface RenderItemProps {
  item: Poster;
  index: number;
  scrollX: SharedValue<number>;
}

const MoviesTab: React.FC<MoviesProps> = ({ navigation, route }) => {
  const tabBarHeight = useBottomTabBarHeight();
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

  const topRatedMoviesQuery = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: fetchTopRatedMovies,
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

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const topRatedMoviesData = [
    { key: "empty-left" }, // Empty item at the beginning
    ...(topRatedMoviesQuery.data || []).map((movie: Poster) => ({
      ...movie,
      key: movie.id.toString(),
    })),
    { key: "empty-right" }, // Empty item at the end
  ];

  const RenderItem: React.FC<RenderItemProps> = ({ item, index, scrollX }) => {
    if (!item.poster_path) {
      return <View style={{ width: EMPTY_ITEM_SIZE }} />;
    }
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
            ],
            [-10, 25, -10],
            Extrapolation.CLAMP
          ),
        },
      ],
    }));
    const animatedHeaderStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
            ],
            [-10, 25, -10],
            Extrapolation.CLAMP
          ),
        },
      ],
    }));

    return (
      <View style={{ width: ITEM_SIZE }}>
        <Animated.View
          style={[
            {
              marginHorizontal: 8,
              marginVertical: 8,
              padding: 5,
              alignItems: "center",
              borderRadius: 8,
              backgroundColor: "transparent",
              flex: 1,
            },
            animatedStyle,
          ]}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
            }}
            style={{
              width: "100%",
              height: ITEM_SIZE * 1.2,
              resizeMode: "cover",
              borderRadius: 10,
              margin: 0,
              marginBottom: 10,
            }}
          />
          <CustomText
            type="extraSmall"
            style={{ color: Colors.white }}
            numberOfLines={1}
          >
            {item.title}
          </CustomText>
        </Animated.View>
      </View>
    );
  };

  if (categoriesQuery.data && topRatedMoviesQuery.data)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.secBackground,
          marginBottom: tabBarHeight,
        }}
      >
        <View>
          <CategoryFilter
            categories={availableCategories}
            selectedCategory={selectedCategory}
            onSelect={handleCategoryPress}
          />
        </View>

        <FlatList
          data={[1, 1]}
          renderItem={({ item, index }) => {
            return (
              <View style={{ width: "100%" }}>
                {index === 0 && (
                  <View>
                    <View>
                      <CustomText
                        style={{
                          padding: 10,
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Popular Movies
                      </CustomText>
                      <Animated.FlatList
                        showsHorizontalScrollIndicator={false}
                        data={topRatedMoviesData}
                        horizontal
                        snapToInterval={ITEM_SIZE}
                        snapToAlignment="start"
                        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
                        renderToHardwareTextureAndroid
                        bounces={false}
                        onScroll={onScroll}
                        scrollEventThrottle={16}
                        renderItem={({ item, index }) => (
                          <RenderItem
                            item={item}
                            index={index}
                            scrollX={scrollX}
                          />
                        )}
                        keyExtractor={(item) => item.id?.toString() || item.key}
                        contentContainerStyle={{
                          // paddingHorizontal: EMPTY_ITEM_SIZE,
                          paddingTop: 10,
                          paddingBottom: 20,
                        }}
                      />
                    </View>
                  </View>
                )}
                {index === 1 && (
                  <View>
                    <MovieCategoryGroup
                      navigation={navigation}
                      categories={availableCategories}
                      flatListRef={flatListRef}
                      onMovieLongPress={handleMovieLongPress}
                    />
                  </View>
                )}
              </View>
            );
          }}
        />
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={["30%"]}
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
      </View>
    );

  if (
    categoriesQuery.isError ||
    moviesQuery.isError ||
    topRatedMoviesQuery.isError
  )
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
          {categoriesQuery.error?.message ||
            moviesQuery.error?.message ||
            topRatedMoviesQuery.error?.message}
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
  carouselContainer: {},
});

export default MoviesTab;
