import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Video from "react-native-video";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { MoviesStackParamList } from "@/constants/types";

type VideoPlayerProps = {
  route: RouteProp<MoviesStackParamList, "VideoPlayer">;
  navigation: NativeStackNavigationProp<MoviesStackParamList, "VideoPlayer">;
};

const { width, height } = Dimensions.get("window");

const VideoPlayer: React.FC<VideoPlayerProps> = ({ route }) => {
  const { streamUrl } = route.params;

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: streamUrl }}
        style={styles.video}
        controls={true}
        resizeMode="contain"
        onBuffer={() => console.log("Buffering...")}
        onError={(error) => console.log("Error:", error)}
      />
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
    height: height * 0.4,
  },
});

export default VideoPlayer;
