import React, { useRef } from 'react';
import { View } from 'react-native';
import TvShowsCategoryGroup from '@/screens/tabs/tvshows/components/TvShowsCategoryGroup';
import { Show } from '@/types';

interface TvShowsCategoriesSectionProps {
  navigation: any;
  categories: any[];
  onShowLongPress: (show: Show) => void;
}

const TvShowsCategoriesSection: React.FC<TvShowsCategoriesSectionProps> = ({
  navigation,
  categories,
  onShowLongPress,
}) => {
  const flatListRef = useRef(null); 

  return (
    <View>
      <TvShowsCategoryGroup
        navigation={navigation}
        categories={categories}
        flatListRef={flatListRef} 
        onShowLongPress={onShowLongPress}
      />
    </View>
  );
};

export default TvShowsCategoriesSection;
