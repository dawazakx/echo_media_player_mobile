import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Show } from '../../../../types'; // Assuming you have a Show type defined
import { Image } from 'expo-image';
import { CustomText } from '../../../../components/Text';
import { RootStackParamList } from '@/constants/types';

interface TvShowItemProps {
  tvshow: Show;
  onLongPress: (tvshow: Show) => void;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const TvShowItem: React.FC<TvShowItemProps> = ({ tvshow, onLongPress }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('TvSeriesDetails', { tvshow });
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.tvShowItem,
        { opacity: pressed ? 0.5 : 1 },
      ]}
      onLongPress={() => onLongPress(tvshow)}
      onPress={handlePress}
      delayLongPress={250}
    >
      <Image
        source={{ uri: tvshow.cover }}
        placeholder={{ blurhash }}
        style={styles.tvShowImage}
        accessibilityLabel={tvshow.name}
        alt={tvshow.name}
      />
      <CustomText
        type="extraSmall"
        style={styles.tvShowTitle}
      >
        {tvshow.name}
      </CustomText>

      <View style={styles.ratingTag}>
        <CustomText type="extraSmall">
          {Number(tvshow.rating).toFixed(1)}
        </CustomText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tvShowItem: {
    width: 120,
    height: 180,
    marginHorizontal: 5,
  },
  tvShowImage: {
    width: "100%",
    height: "90%",
    marginBottom: 3,
    borderRadius: 10,
  },
  tvShowTitle: {
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
