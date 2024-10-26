import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
} from "react-native";

import useGetMovieContent from "@/hooks/api/useGetMovieContent";
import { CustomText } from "@/components/Text";
import { Movie } from "@/types";
import { MovieItem } from "./MovieItem";
import { Colors } from "@/constants/Colors";

const ITEMS_PER_PAGE = 10;

interface MovieListProps {
  categoryId: string;
  navigation: any;
  onMovieLongPress: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({
  categoryId,
  navigation,
  onMovieLongPress,
}) => {
  const [page, setPage] = useState(1);
  const [localMovies, setLocalMovies] = useState<Movie[]>([]);

  const { data: allMovies, status, error } = useGetMovieContent(categoryId);

  useEffect(() => {
    if (allMovies) {
      const filteredMovies = allMovies.filter(
        (movie) => movie.category_id === categoryId
      );
      setLocalMovies(filteredMovies.slice(0, ITEMS_PER_PAGE));
    }
  }, [allMovies, categoryId]);

  const loadMore = useCallback(() => {
    if (allMovies) {
      const filteredMovies = allMovies.filter(
        (movie) => movie.category_id === categoryId
      );
      if (localMovies.length < filteredMovies.length) {
        const nextPage = page + 1;
        const newMovies = filteredMovies.slice(
          0,
          nextPage * ITEMS_PER_PAGE
        );
        setLocalMovies(newMovies);
        setPage(nextPage);
      }
    }
  }, [allMovies, categoryId, localMovies.length, page]);

  

  if (status === "error") {
    return <CustomText>Error loading movies: {error instanceof Error ? error.message : 'Unknown error'}</CustomText>;
  }

  return (
    <FlatList
      data={localMovies}
      renderItem={({ item }) => (
        <MovieItem
          movie={item}
          onLongPress={onMovieLongPress}
        />
      )}
      keyExtractor={(item) => item.stream_id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        localMovies.length < (
          allMovies?.filter(
            (movie) => movie.category_id === categoryId
          ).length || 0
        ) ? (
          <View>
      <ActivityIndicator size="large" color={Colors.white} />
    </View>
        ) : null
      }
    />
  );
};

export default MovieList;
