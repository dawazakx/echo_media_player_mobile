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
import { Colors } from "@/constants/Colors";
import { TabParamList } from "@/constants/types";
import { fetchTopRatedShows } from "@/providers/api";
import { useQuery } from "@tanstack/react-query";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Show } from "@/types";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import TvShowsCategoryGroup from "@/components/TvShowsCategoryGroup";
import useGetTvShowsCategories from "@/hooks/api/useGetTvShowsCategories";

export interface TvShowsProps {
  navigation: BottomTabScreenProps<TabParamList, "TvShows">;
  route: RouteProp<TabParamList, "TvShows">;
}

const { width, height } = Dimensions.get("window");
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.62 : width * 0.64;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

interface Poster {
  id: number;
  name: string;
  poster_path: string;
}

interface RenderItemProps {
  item: Poster;
  index: number;
  scrollX: SharedValue<number>;
}

const TvShowsTab: React.FC<TvShowsProps> = ({ navigation, route }) => {
  const tabBarHeight = useBottomTabBarHeight();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedMovie, setSelectedMovie] = useState<Show | null>(null);

  const { data: categories, isLoading } = useGetTvShowsCategories();

  const topRatedShowsQuery = useQuery({
    queryKey: ["topRatedShows"],
    queryFn: fetchTopRatedShows,
    staleTime: 20 * 60 * 1000, // 20 minutes
  });

  useEffect(() => {
    if (categories && categories.length > 0) {
      setSelectedCategory(categories[0].category_id);
    }
  }, [categories]);

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryIndex = categories?.findIndex(
      (category) => category.category_id === categoryId
    );
    if (flatListRef.current && categoryIndex !== -1) {
      setTimeout(() => {
        if (flatListRef.current) {
          const targetPosition = 262 * categoryIndex! + 428;
          flatListRef.current.scrollToOffset({
            offset: targetPosition,
            animated: true,
          });
        }
      }, 100);
    }
  };

  const handleMovieLongPress = (movie: Show) => {
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

  const topRatedShowsData = [
    { key: "empty-left" }, // Empty item at the beginning
    ...(topRatedShowsQuery.data || []).map((movie: Poster) => ({
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
            {item.name}
          </CustomText>
        </Animated.View>
      </View>
    );
  };

  if (topRatedShowsQuery.data)
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
            categories={categories!}
            selectedCategory={selectedCategory}
            onSelect={handleCategoryPress}
          />
        </View>

        <FlatList
          ref={flatListRef}
          data={[1, 1]}
          renderItem={({ item, index }) => {
            return (
              <View style={{ width: "100%" }}>
                {index === 0 && (
                  <View>
                    <View style={{ marginTop: 10 }}>
                      <CustomText
                        style={{
                          padding: 10,
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Top Rated TV Shows
                      </CustomText>
                      <Animated.FlatList
                        showsHorizontalScrollIndicator={false}
                        data={topRatedShowsData}
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
                        initialScrollIndex={1}
                        getItemLayout={(data, index) => {
                          return {
                            length: ITEM_SIZE,
                            offset: ITEM_SIZE * index,
                            index,
                          };
                        }}
                        keyExtractor={(item) => item.id?.toString() || item.key}
                        contentContainerStyle={{
                          paddingTop: 10,
                          paddingBottom: 20,
                        }}
                      />
                    </View>
                  </View>
                )}
                {index === 1 && (
                  <View>
                    <TvShowsCategoryGroup
                      navigation={navigation}
                      categories={categories!}
                      flatListRef={flatListRef}
                      onMovieLongPress={handleMovieLongPress}
                    />
                  </View>
                )}
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
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

  if (topRatedShowsQuery.isError)
    return (
      <CustomView
        style={{
          backgroundColor: Colors.secBackground,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CustomText type="extraSmall">
          An error occurred. Message: {topRatedShowsQuery.error?.message}
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

export default TvShowsTab;
