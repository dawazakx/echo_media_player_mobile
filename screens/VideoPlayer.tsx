import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { MoviesStackParamList } from "@/constants/types";

import { VLCPlayer, VlCPlayerView } from "react-native-vlc-media-player";
import ScreenOrientation from 'expo-screen-orientation';
import NetInfo from "@react-native-community/netinfo";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

type VideoPlayerProps = {
  route: RouteProp<MoviesStackParamList, "VideoPlayer">;
  navigation: NativeStackNavigationProp<MoviesStackParamList, "VideoPlayer">;
};

const { width, height } = Dimensions.get("window");

const ErrorScreen = () => {
  return (
    <View style={styles.errorBlock}>
      <Text style={styles.errorText}>
        Network connection lost. Please check your internet connection.
      </Text>
    </View>
  );
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ route, navigation }) => {
  const { streamUrl, title } = route.params;

  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const checkNetworkConnection = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      checkNetworkConnection();
    };
  }, []);


  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      {/* <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={30} color="white" />
      </TouchableOpacity> */}

      {!isConnected && <ErrorScreen />}
      
      <VlCPlayerView
        style={[styles.video]}
        showBack={true}
        isFull={true}
        autoplay={true}
        url={streamUrl}
        showTitle={true}
        title={title}
        Orientation="landscape"
        volume={1.0}
        seek={0.7}
        volumeStep={1.0}
        showLeftButton={false}
        onProgress={({ currentTime, duration }: { currentTime: number; duration: number }) => {
          setCurrentTime(currentTime);
          setDuration(duration);
        }}
      />

      {/* <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={currentTime / duration}
        onSlidingComplete={handleSeek}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        thumbTintColor="#FFFFFF"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width,
    height: height,
  },
  backButtonContainer: {
    position: "absolute",
    zIndex: 10,
    top: 50,
    right: 10,
  },
  slider: {
    position: "absolute",
    zIndex: 10,
    bottom: 50,
    // right: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  errorBlock: {
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderRadius: 10,
    position: "absolute",
    top: 0,
    zIndex: 11,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    gap: 5,
    backgroundColor: "white",
  },
});

export default VideoPlayer;
