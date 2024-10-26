import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Movie } from '../../../../types'; // Assuming you have a Movie type defined
import { Image } from 'expo-image';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/constants/types';
import { CustomText } from '../../../../components/Text';
import { RootStackParamList } from '@/constants/types';

interface MovieItemProps {
  movie: Movie;
  onLongPress: (movie: Movie) => void;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";


export const MovieItem: React.FC<MovieItemProps> = ({ movie, onLongPress }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('MovieDetails', { movie });
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.movieItem,
        { opacity: pressed ? 0.5 : 1 },
      ]}
      onLongPress={() => onLongPress(movie)}
      onPress={handlePress}
      delayLongPress={250}
    >
      <Image
        source={{ uri: movie.stream_icon }}
        placeholder={{blurhash }}
        style={styles.movieImage}
        accessibilityLabel={movie.name}
        alt={movie.name}
      />
      <CustomText
        type="extraSmall"
        style={styles.movieTitle}
      >
        {movie.name}
      </CustomText>

      <View style={styles.ratingTag}>
        <CustomText type="extraSmall">
          {Number(movie.rating).toFixed(1)}
        </CustomText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    width: 120,
    height: 180,
    marginHorizontal: 5,
  },
  movieImage: {
    width: "100%",
    height: "90%",
    marginBottom: 3,
    borderRadius: 10,
  },
  movieTitle: {
    textAlign: 'center',
    color: '#9ca3af',
  },
  ratingTag: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "rgb(190 18 60)",
    borderRadius: 4,
    padding: 2,
  },
});
