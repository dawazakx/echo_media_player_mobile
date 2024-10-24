import React, { forwardRef, useCallback } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { MaterialIcons } from '@expo/vector-icons';
import { CustomText } from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { Show } from '@/types';

interface TvShowBottomSheetProps {
  selectedShow: Show | null;
}

const TvShowBottomSheet = forwardRef<BottomSheet, TvShowBottomSheetProps>(({ selectedShow }, ref) => {
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.7}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={['30%']}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: Colors.secBackground }}
      handleIndicatorStyle={{ backgroundColor: Colors.white }}
      backdropComponent={renderBackdrop}
    >
      {selectedShow && (
        <View style={{ padding: 16 }}>
          <CustomText type="subtitle" style={{ textAlign: 'center', marginBottom: 10 }}>
            {selectedShow.name}
          </CustomText>
          <View style={styles.actionContainer}>
            <BottomSheetAction icon="play-circle" text="Play" />
            <BottomSheetAction icon="bookmark" text="Add to Watchlist" />
            <BottomSheetAction icon="download" text="Download" />
          </View>
        </View>
      )}
    </BottomSheet>
  );
});

const BottomSheetAction: React.FC<{ icon: any; text: string }> = ({ icon, text }) => (
  <>
    <Pressable style={styles.action}>
      <MaterialIcons name={icon} size={24} color={Colors.background} />
      <CustomText type="subtitle" style={{ color: Colors.background }}>
        {text}
      </CustomText>
    </Pressable>
    <View style={styles.separator} />
  </>
);

const styles = StyleSheet.create({
  actionContainer: {
    borderRadius: 15,
    gap: 9,
    padding: 20,
    backgroundColor: Colors.tint,
  },
  action: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  separator: {
    width: '88%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.secBackground,
    alignSelf: 'flex-end',
  },
});

export default TvShowBottomSheet;
