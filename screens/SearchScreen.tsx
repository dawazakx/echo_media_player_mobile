import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MaterialIcons } from "@expo/vector-icons";

import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import useGetSearchResult from "@/hooks/api/useGetSearchResult";
import { DeviceContext } from "@/providers/DeviceProvider";
import { LiveStream, Movie, Show } from "@/types";
import useInvalidateOnPlaylistChange from "@/hooks/api/useInvalidateOnPlaylistChange";

const PLACEHOLDER_IMAGE = "https://placehold.co/400/000000/FFFFFF/png";

const { width, height } = Dimensions.get("window");

const SearchScreen = ({ navigation }) => {
  useInvalidateOnPlaylistChange();
  const { deviceId } = useContext(DeviceContext);
  const [query, setQuery] = useState("");
  const [activeSegment, setActiveSegment] = useState("movies");

  const [searchInitiated, setSearchInitiated] = useState(false);

  const trimmedQuery = query.trim();
  // const { data, error, isLoading } = useGetSearchResult(trimmedQuery);
  const { data, error, isLoading } = useGetSearchResult(
    trimmedQuery,
    searchInitiated
  );

  const liveTVResults = data?.liveTvResult;
  const movieResults = data?.movieResult;
  const tvShowsResults = data?.tvShowsResult;
  const handleSearch = async () => {
    if (!trimmedQuery) return;
    setSearchInitiated(true);
  };
  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    setSearchInitiated(false); // Reset searchInitiated whenever the query changes
  };

  const SegmentSwitcher = ({ activeSegment, setActiveSegment }) => {
    return (
      <View style={styles.segmentSwitcher}>
        <TouchableOpacity
          onPress={() => setActiveSegment("movies")}
          style={[
            styles.segmentButton,
            activeSegment === "movies" && styles.activeSegmentButton,
          ]}
        >
          <Text style={styles.segmentButtonText}>Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveSegment("tvshows")}
          style={[
            styles.segmentButton,
            activeSegment === "tvshows" && styles.activeSegmentButton,
          ]}
        >
          <Text style={styles.segmentButtonText}>Tv Shows</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveSegment("livetv")}
          style={[
            styles.segmentButton,
            activeSegment === "livetv" && styles.activeSegmentButton,
          ]}
        >
          <Text style={styles.segmentButtonText}>Live TV</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderLiveTvItem = ({ item }: { item: LiveStream }) => (
    <Pressable
      style={styles.liveTvResultItem}
      onPress={() => navigation.navigate("LiveStreamDetails", { stream: item })}
    >
      <Image
        source={{ uri: item.stream_icon || PLACEHOLDER_IMAGE }}
        style={styles.liveTvResultImage}
        resizeMode="contain"
      />
      <CustomText type="extraSmall" style={styles.resultText}>
        {item.name}
      </CustomText>
    </Pressable>
  );

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <Pressable
      style={styles.resultItem}
      onPress={() => navigation.navigate("MovieDetails", { movie: item })}
    >
      <Image
        source={{ uri: item.stream_icon || PLACEHOLDER_IMAGE }}
        style={styles.resultImage}
        resizeMode="cover"
      />
      <CustomText type="extraSmall" style={styles.resultText}>
        {item.name}
      </CustomText>
    </Pressable>
  );
  const renderTvShowItem = ({ item }: { item: Show }) => (
    <Pressable
      style={styles.resultItem}
      onPress={() => navigation.navigate("TvSeriesDetails", { tvshow: item })}
    >
      <Image
        source={{ uri: item.cover || PLACEHOLDER_IMAGE }}
        style={styles.resultImage}
        resizeMode="cover"
      />
      <CustomText type="extraSmall" style={styles.resultText}>
        {item.name}
      </CustomText>
    </Pressable>
  );

  const insets = useSafeAreaInsets();

  return (
    <CustomView style={[styles.container, { paddingTop: insets.top }]}>
      <CustomView style={styles.searchContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={28} color={Colors.tint} />
        </Pressable>
        <TextInput
          style={styles.searchInput}
          placeholder="Search a Channel, Programme, or V.O.D..."
          placeholderTextColor={Colors.white}
          value={query}
          onChangeText={handleQueryChange}
          onSubmitEditing={handleSearch}
        />
      </CustomView>

      {searchInitiated && isLoading ? (
        <ActivityIndicator size="large" color={Colors.white} />
      ) : (
        searchInitiated && (
          <>
            <CustomText
              type="subtitle"
              style={{ paddingBottom: 10, textAlign: "center" }}
            >
              Showing results for: {query}
            </CustomText>
            <SegmentSwitcher
              activeSegment={activeSegment}
              setActiveSegment={setActiveSegment}
            />
            {activeSegment === "movies" ? (
              <FlatList
                data={movieResults}
                renderItem={renderMovieItem}
                keyExtractor={(item) => item.stream_id.toString()}
                ListEmptyComponent={
                  <CustomText style={{ textAlign: "center" }}>
                    No results found
                  </CustomText>
                }
                showsHorizontalScrollIndicator={false}
                numColumns={3}
                columnWrapperStyle={styles.columnWrapper}
              />
            ) : activeSegment === "tvshows" ? (
              <FlatList
                data={tvShowsResults}
                renderItem={renderTvShowItem}
                keyExtractor={(item) => item.series_id.toString()}
                ListEmptyComponent={
                  <CustomText style={{ textAlign: "center" }}>
                    No results found
                  </CustomText>
                }
                showsHorizontalScrollIndicator={false}
                numColumns={3}
                columnWrapperStyle={styles.columnWrapper}
              />
            ) : activeSegment === "livetv" ? (
              <FlatList
                data={liveTVResults}
                renderItem={renderLiveTvItem}
                keyExtractor={(item) => item.stream_id.toString()}
                ListEmptyComponent={
                  <CustomText style={{ textAlign: "center" }}>
                    No results found
                  </CustomText>
                }
                showsHorizontalScrollIndicator={false}
                numColumns={3}
                contentContainerStyle={styles.liveTvList}
              />
            ) : null}
          </>
        )
      )}
    </CustomView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secBackground,
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
  backButton: {
    marginLeft: 5,
    backgroundColor: "transparent",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,
    height: 40,
    width: "80%",
    color: Colors.white,
  },
  resultsContainer: {
    // flex: 1,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 18,
    color: Colors.white,
    marginVertical: 10,
  },

  resultItem: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },
  resultImage: {
    width: width * 0.3,
    height: height * 0.19,
    borderRadius: 12,
    overflow: "visible",
  },
  liveTvResultItem: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },
  liveTvResultImage: {
    width: width * 0.28,
    height: height * 0.13,
    padding: 10,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    backgroundColor: "#52525b72",
    borderColor: "#52525b",
  },
  resultText: {
    marginTop: 5,
    color: Colors.white,
    fontSize: 10,
    textAlign: "center",
  },
  columnWrapper: {
    justifyContent: "space-between",
    gap: 3,
  },
  liveTvList: {
    gap: 3,
  },
  segmentSwitcher: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  segmentButton: {
    padding: 10,
    marginHorizontal: 5,
  },
  activeSegmentButton: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.white,
  },
  segmentButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default SearchScreen;
