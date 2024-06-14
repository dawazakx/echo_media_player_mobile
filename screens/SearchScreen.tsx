//

import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "@/components/Button";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { searchLiveTV, searchMovies } from "@/providers/api";
import { DeviceContext } from "@/providers/DeviceProvider";
import { Movie } from "@/types";

const PLACEHOLDER_IMAGE = "https://placehold.co/400/000000/FFFFFF/png";

const { width, height } = Dimensions.get("window");

const SearchScreen = ({ navigation }) => {
  const { deviceId } = useContext(DeviceContext);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [liveTVResults, setLiveTVResults] = useState([]);
  const [movieResults, setMovieResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const handleSearch = async () => {
    setSearchInitiated(true);
    setLoading(true);
    setIsSearching(true);

    const [liveTVData, movieData] = await Promise.all([
      searchLiveTV(deviceId, query),
      searchMovies(deviceId, query),
    ]);

    setLiveTVResults(liveTVData);
    setMovieResults(movieData);
    setLoading(false);
    setIsSearching(false);
  };

  const renderLiveTvItem = ({ item }: { item: Movie }) => (
    <Pressable
      style={styles.liveTvItem}
      onPress={() => navigation.navigate("MovieDetails", { movie: item })}
    >
      <Image
        source={{ uri: item.stream_icon || PLACEHOLDER_IMAGE }}
        style={styles.liveTvImage}
        resizeMode="cover"
      />
      <View style={styles.liveTvTextContainer}>
        <CustomText type="extraSmall" style={styles.liveTvText}>
          {item.name}
        </CustomText>
      </View>
    </Pressable>
  );

  const renderItem = ({ item }: { item: Movie }) => (
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
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
      </CustomView>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.white} />
      ) : (
        searchInitiated && (
          <CustomView style={styles.resultsContainer}>
            <CustomText type="subtitle" style={{ paddingBottom: 10 }}>
              Showing results for: '{query}'
            </CustomText>
            <CustomText style={styles.sectionTitle}>
              Live TV ({liveTVResults.length})
            </CustomText>
            <FlatList
              horizontal
              data={liveTVResults}
              renderItem={renderLiveTvItem}
              keyExtractor={(item) => item.stream_id.toString()}
              ListEmptyComponent={<CustomText>No results found</CustomText>}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.liveTvList}
            />
            <CustomText style={styles.sectionTitle}>
              Movies ({movieResults.length})
            </CustomText>
            <FlatList
              data={movieResults}
              renderItem={renderItem}
              keyExtractor={(item) => item.stream_id.toString()}
              ListEmptyComponent={<CustomText>No results found</CustomText>}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
            />
          </CustomView>
        )
      )}
    </CustomView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 10,
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
    height: 50,
    width: "85%",
    color: Colors.white,
  },
  resultsContainer: {
    // flex: 1,
    borderRadius: 10,
    // padding: 15,
    marginHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 18,
    color: Colors.white,
    marginVertical: 10,
  },
  liveTvItem: {
    marginRight: 10,
    alignItems: "center",
    width: width * 0.63,
  },
  liveTvImage: {
    width: "100%",
    height: height * 0.2,
    borderRadius: 12,
  },
  liveTvTextContainer: {
    position: "absolute",
    bottom: 5,
    left: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 8,
    padding: 5,
  },
  liveTvText: {
    marginTop: 5,
    color: Colors.white,
  },
  resultItem: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },
  resultImage: {
    width: width * 0.39,
    height: height * 0.28,
    borderRadius: 12,
    overflow: "visible",
  },
  resultText: {
    marginTop: 5,
    color: Colors.white,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  liveTvList: {
    paddingBottom: 20,
  },
});

export default SearchScreen;
