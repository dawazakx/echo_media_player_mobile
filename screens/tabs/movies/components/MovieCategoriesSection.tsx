import React, { useRef } from 'react';
import { View, FlatList } from 'react-native';
import MovieCategoryGroup from '@/screens/tabs/movies/components/MovieCategoryGroup';
import { Movie } from '@/types';

interface MovieCategoriesSectionProps {
  navigation: any;
  categories: any[];
  onMovieLongPress: (movie: Movie) => void;
}

const MovieCategoriesSection: React.FC<MovieCategoriesSectionProps> = ({
  navigation,
  categories,
  onMovieLongPress,
}) => {
  const flatListRef = useRef<FlatList>(null);

  return (
    <View>
      <MovieCategoryGroup
        navigation={navigation}
        categories={categories}
        onMovieLongPress={onMovieLongPress}
        flatListRef={flatListRef}
      />
    </View>
  );
};

export default MovieCategoriesSection;
