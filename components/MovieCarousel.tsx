import React from "react";
import { View, StyleSheet } from "react-native";
import MovieCard from "./MovieCard";
import { FlashList } from "@shopify/flash-list";

interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  rating: number;
}

interface MovieCarouselProps {
  movies: Movie[];
  onPress: (movie: Movie) => void;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies, onPress }) => {
  return (
    <View style={styles.carouselContainer}>
      <FlashList
        horizontal
        data={movies}
        estimatedItemSize={150}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            posterUrl={item.posterUrl}
            rating={item.rating}
            onPress={() => onPress(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    paddingVertical: 10,
  },
});

export default MovieCarousel;
