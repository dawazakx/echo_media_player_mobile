import React from 'react';
import { View, Image, Dimensions, Platform } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import { CustomText } from '@/components/Text';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.62 : width * 0.64;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

interface TopRatedShowItemProps {
  item: any;
  index: number;
  scrollX: Animated.SharedValue<number>;
}

const TopRatedShowItem: React.FC<TopRatedShowItemProps> = ({ item, index, scrollX }) => {
  if (!item.poster_path) {
    return <View style={{ width: EMPTY_ITEM_SIZE }} />;
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollX.value,
          [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE],
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
            alignItems: 'center',
            borderRadius: 8,
            backgroundColor: 'transparent',
            flex: 1,
          },
          animatedStyle,
        ]}
      >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/original${item.poster_path}` }}
          style={{
            width: '100%',
            height: ITEM_SIZE * 1.2,
            resizeMode: 'cover',
            borderRadius: 10,
            margin: 0,
            marginBottom: 10,
          }}
        />
        <CustomText type="extraSmall" style={{ color: Colors.white }} numberOfLines={1}>
          {item.name}
        </CustomText>
      </Animated.View>
    </View>
  );
};

export default TopRatedShowItem;
