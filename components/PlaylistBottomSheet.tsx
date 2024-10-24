import React, { forwardRef, useCallback, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { CustomText } from './Text';
import { PlaylistContext } from '@/providers/PlaylistProvider';
import { Colors } from '@/constants/Colors';

const PlaylistBottomSheet = forwardRef<BottomSheetModal>((props, ref) => {
  const { userPlaylists, activePlaylist, switchPlaylist, isPlaylistChanging } = useContext(PlaylistContext);

  const handlePlaylistSelect = useCallback(async (playlistId: string) => {
    await switchPlaylist(playlistId);
    (ref as React.RefObject<BottomSheetModal>).current?.dismiss();
  }, [switchPlaylist]);

  const renderPlaylistItem = useCallback(({ item }) => (
    <Pressable
      style={[
        styles.playlistItem,
        item._id === activePlaylist?._id && styles.activePlaylistItem,
      ]}
      onPress={() => handlePlaylistSelect(item._id)}
      disabled={isPlaylistChanging}
    >
      <CustomText type="defaultSemiBold" style={styles.playlistName}>
        {item.nickname}
      </CustomText>
      {isPlaylistChanging && item._id === activePlaylist?._id && (
        <ActivityIndicator size="small" color={Colors.white} />
      )}
    </Pressable>
  ), [activePlaylist, handlePlaylistSelect, isPlaylistChanging]);

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={['20%', '30%']}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: Colors.secBackground }}
      handleIndicatorStyle={{ backgroundColor: Colors.white }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
    >
      <View style={styles.container}>
        <CustomText type="defaultSemiBold" style={styles.title}>Select Playlist</CustomText>
        <FlatList
          data={userPlaylists}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
    bottomSheetBackground: {
      backgroundColor: Colors.secBackground,
    },
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: Colors.secBackground,
    },
    title: {
      marginBottom: 16,
      color: 'white',
      textAlign: 'center'
    },
    listContainer: {
      flexGrow: 1,
    },
    playlistItem: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#374151',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    activePlaylistItem: {
      backgroundColor: '#374151',
      borderRadius: 10,
    },
    playlistName: {
      color: 'white',
      textAlign: 'center',
    },
  });
export default PlaylistBottomSheet;
