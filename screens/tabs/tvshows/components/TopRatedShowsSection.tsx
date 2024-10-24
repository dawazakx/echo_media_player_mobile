import React from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { CustomText } from '@/components/Text';
import { fetchTopRatedShows } from '@/providers/api';
import TopRatedShowItem from './TopRatedShowItem';

const { width } = Dimensions.get('window');
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.62 : width * 0.64;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const TopRatedShowsSection: React.FC = () => {
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const topRatedShowsQuery = useQuery({
    queryKey: ['topRatedShows'],
    queryFn: fetchTopRatedShows,
    staleTime: 20 * 60 * 1000, // 20 minutes
  });

  const topRatedShowsData = [
    { key: 'empty-left' },
    ...(topRatedShowsQuery.data || []).map((show: any) => ({
      ...show,
      key: show.id.toString(),
    })),
    { key: 'empty-right' },
  ];

  if (topRatedShowsQuery.isLoading || topRatedShowsQuery.isError) {
    return null;
  }

  return (
    <View>
      <CustomText style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>
        Top Rated TV Shows
      </CustomText>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={topRatedShowsData}
        horizontal
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        bounces={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <TopRatedShowItem item={item} index={index} scrollX={scrollX} />
        )}
        initialScrollIndex={1}
        getItemLayout={(data, index) => ({
          length: ITEM_SIZE,
          offset: ITEM_SIZE * index,
          index,
        })}
        keyExtractor={(item) => item.id?.toString() || item.key}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
      />
    </View>
  );
};

export default TopRatedShowsSection;
