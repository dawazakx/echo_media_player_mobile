import React from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface HeaderImageProps {
  seriesDetails: any;
  navigation: any;
}
const IMG_HEIGHT = 262;
var { width, height } = Dimensions.get("window");

export const HeaderImage: React.FC<HeaderImageProps> = ({
  seriesDetails,
  navigation,
}) => {
  return (
    <View style={{ marginTop: 0 }}>
      <View
        style={{
          position: "absolute",
          top: 40,
          left: 12,
          zIndex: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "transparent",
            padding: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Image
          source={{
            uri:
              `${seriesDetails?.info?.backdrop_path[0]}` ||
              "https://th.bing.com/th/id/R.4dc29c271625202308a26ed96d1d962d?rik=qKnKhs7roVDpXA&pid=ImgRaw&r=0",
          }}
          style={{
            width,
            height: IMG_HEIGHT,
          }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(23,23,23,0.6)", "rgba(23,23,23,1)"]}
          style={{
            width: "100%",
            height: height * 0.4,
            position: "absolute",
            bottom: 0,
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </View>
    </View>
  );
};
