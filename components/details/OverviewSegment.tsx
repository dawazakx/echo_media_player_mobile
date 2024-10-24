import React from "react";
import { Dimensions, View } from "react-native";

import { CustomText } from "../Text";

import WebView from "react-native-webview";

interface OverviewSegmentProps {
  seriesDetails: any;
}
var { width, height } = Dimensions.get("window");

export const OverviewSegment: React.FC<OverviewSegmentProps> = ({
  seriesDetails,
}) => {
  return (
    <View style={{ padding: 5 }}>
      <View style={{ marginHorizontal: 16, marginVertical: 5, gap: 5 }}>
        <CustomText type="subtitle">Synopsis</CustomText>
        <CustomText
          type="extraSmall"
          style={{
            letterSpacing: 0.4,
            color: "rgb(163 163 163)",
          }}
        >
          {seriesDetails?.info.plot}
        </CustomText>
      </View>
      <View style={{ marginHorizontal: 16, marginVertical: 10, gap: 5 }}>
        <CustomText>Genres</CustomText>
        <CustomText
          style={{
            flexDirection: "row",
          }}
        >
          <CustomText
            type="extraSmall"
            style={{
              fontWeight: "600",
              textAlign: "auto",
              marginHorizontal: 16,
              color: "rgb(163 163 163)",
            }}
          >
            {seriesDetails?.info.genre}
          </CustomText>
        </CustomText>
      </View>
      <View style={{ marginHorizontal: 16, marginVertical: 10, gap: 5 }}>
        <CustomText>Cast</CustomText>
        {seriesDetails?.info?.cast ? (
          <CustomText
            type="extraSmall"
            style={{
              fontWeight: "600",
              lineHeight: 20,
              textAlign: "auto",
              color: "rgb(163 163 163)",
            }}
          >
            {seriesDetails?.info?.cast}
          </CustomText>
        ) : (
          <CustomText type="subtitle">No Cast data available</CustomText>
        )}
      </View>
      <View style={{ marginHorizontal: 16, marginVertical: 16, gap: 5 }}>
        <CustomText>Trailers and Videos</CustomText>

        {seriesDetails?.info.youtube_trailer ? (
          <WebView
            style={{
              width: width - 74,
              height: 180,
              marginVertical: 10,
              marginRight: 15,
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{
              uri: `https://www.youtube.com/embed/${seriesDetails?.info.youtube_trailer}`,
            }}
          />
        ) : (
          <CustomText type="subtitle">No trailers available</CustomText>
        )}
      </View>
    </View>
  );
};
