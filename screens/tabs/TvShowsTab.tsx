import HorizontalFilter from "@/components/HorizontalFilter";
import MovieCard from "@/components/MovieCard";
import MovieCarousel from "@/components/MovieCarousel";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { TabParamList } from "@/constants/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, SectionList, StyleSheet } from "react-native";

export interface TvShowsProps {
  navigation: BottomTabScreenProps<TabParamList, "TvShows">;
  route: RouteProp<TabParamList, "TvShows">;
}

interface Item {
  id: number;
  title: string;
  posterUrl: string;
  rating: number;
}

interface Section {
  title: string;
  data: Item[];
}

interface Data {
  [key: string]: Item[];
}

const data: Data = {
  "Recently Watched": [
    {
      id: 1,
      title: "Watched 1",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.5087,
    },
    {
      id: 2,
      title: "Watched 2",
      posterUrl: "https://via.placeholder.com/150",
      rating: 3.8087,
    },
    {
      id: 3,
      title: "Watched 3",
      posterUrl: "https://via.placeholder.com/150",
      rating: 3.8087,
    },
    {
      id: 4,
      title: "Watched 4",
      posterUrl: "https://via.placeholder.com/150",
      rating: 3.8087,
    },
    {
      id: 5,
      title: "Watched 5",
      posterUrl: "https://via.placeholder.com/150",
      rating: 3.8087,
    },
    {
      id: 6,
      title: "Watched 6",
      posterUrl: "https://via.placeholder.com/150",
      rating: 3.8087,
    },
    {
      id: 7,
      title: "Watched 7",
      posterUrl: "https://via.placeholder.com/150",
      rating: 3.8087,
    },
  ],
  Favorites: [
    {
      id: 8,
      title: "Favorite 1",
      posterUrl: "https://via.placeholder.com/150",
      rating: 5.9866,
    },
    {
      id: 9,
      title: "Favorite 2",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.2976,
    },
    {
      id: 10,
      title: "Favorite 3",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.2976,
    },
    {
      id: 11,
      title: "Favorite 4",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.2976,
    },
    {
      id: 12,
      title: "Favorite 5",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.2976,
    },
    {
      id: 13,
      title: "Favorite 6",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.2976,
    },
    {
      id: 14,
      title: "Favorite 7",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.2976,
    },
  ],
  Netflix: [
    {
      id: 15,
      title: "Netflix 1",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.7876,
    },
    {
      id: 16,
      title: "Netflix 2",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.1855,
    },
    {
      id: 17,
      title: "Netflix 3",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.1855,
    },
    {
      id: 18,
      title: "Netflix 4",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.1855,
    },
    {
      id: 19,
      title: "Netflix 5",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.1855,
    },
    {
      id: 20,
      title: "Netflix 6",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.1855,
    },
    {
      id: 21,
      title: "Netflix 7",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.1855,
    },
  ],
  HBO: [
    {
      id: 22,
      title: "HBO 1",
      posterUrl: "https://via.placeholder.com/150",
      rating: 3.9655,
    },
    {
      id: 23,
      title: "HBO 2",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.3876,
    },
    {
      id: 24,
      title: "HBO 3",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.3876,
    },
    {
      id: 25,
      title: "HBO 4",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.3876,
    },
    {
      id: 37,
      title: "HBO 5",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.3876,
    },
    {
      id: 26,
      title: "HBO 6",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.3876,
    },
    {
      id: 27,
      title: "HBO 7",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.3876,
    },
  ],
  AppleTV: [
    {
      id: 28,
      title: "AppleTV 1",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.665,
    },
    {
      id: 29,
      title: "AppleTV 2",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.4653,
    },
    {
      id: 30,
      title: "AppleTV 3",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.4653,
    },
    {
      id: 31,
      title: "AppleTV 4",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.4653,
    },
    {
      id: 32,
      title: "AppleTV 5",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.4653,
    },
    {
      id: 33,
      title: "AppleTV 6",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.4653,
    },
    {
      id: 34,
      title: "AppleTV 7",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.4653,
    },
  ],
  "All TV Shows": [
    {
      id: 35,
      title: "Show 1",
      posterUrl: "https://via.placeholder.com/150",
      rating: 4.4705,
    },
    {
      id: 36,
      title: "Show 2",
      posterUrl: "https://via.placeholder.com/150",
      rating: 3.7643,
    },
  ],
};
const filterOptions = Object.keys(data);

const TvShowsTab: React.FC<TvShowsProps> = ({ navigation, route }) => {
  const [filteredData, setFilteredData] = useState<Section[]>([]);
  const [allSections, setAllSections] = useState<Section[]>([]);

  useEffect(() => {
    // Convert data object to array of sections
    const sections = Object.keys(data).map((key) => ({
      title: key,
      data: data[key],
    }));
    setAllSections(sections);
    setFilteredData(sections);
  }, []);

  const handleFilterSelect = (filter: string) => {
    const selectedSection = allSections.find(
      (section) => section.title === filter
    );
    const otherSections = allSections.filter(
      (section) => section.title !== filter
    );

    if (selectedSection) {
      setFilteredData([selectedSection, ...otherSections]);
    }
  };

  const handleMoviePress = (movie: Item) => {
    // Handle the movie card press action
    console.log(`Pressed on ${movie.title}`);
  };

  return (
    <CustomView>
      <HorizontalFilter
        filterOptions={filterOptions}
        onSelect={handleFilterSelect}
      />
      <SectionList
        sections={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => null}
        renderSectionHeader={({ section: { title, data } }) => (
          <CustomView
            style={{ padding: 10, backgroundColor: Colors.secBackground }}
          >
            <CustomText
              type="defaultSemiBold"
              style={{ marginBottom: 5 }}
            >{`${title} (${data.length})`}</CustomText>
            <MovieCarousel movies={data} onPress={handleMoviePress} />
          </CustomView>
        )}
        contentContainerStyle={styles.list}
      />
    </CustomView>
  );
};
export default TvShowsTab;

const styles = StyleSheet.create({
  list: {
    paddingBottom: 150,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: "#f9c2ff",
  },
});
