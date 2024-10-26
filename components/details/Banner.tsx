import React from "react";
import { Dimensions, Image, View } from "react-native";

import { Colors } from "@/constants/Colors";
import CustomButton from "../Button";
import { CustomText } from "../Text";

import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";

interface BannerProps {
  seriesDetails: any;
  handleWatchNow: any;
  numberOfSeasons: number;
}
var { width, height } = Dimensions.get("window");

export const Banner: React.FC<BannerProps> = ({
  seriesDetails,
  handleWatchNow,
  numberOfSeasons,
}) => {
  return (
    <>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{
            uri:
              `${seriesDetails?.info?.cover}` ||
              "https://th.bing.com/th/id/R.4dc29c271625202308a26ed96d1d962d?rik=qKnKhs7roVDpXA&pid=ImgRaw&r=0",
          }}
          style={{
            width: width * 0.3,
            height: height * 0.18,
            borderRadius: 15,
          }}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <CustomText type="title" style={{ textAlign: "center" }}>
            {seriesDetails?.info.name}
          </CustomText>

          {/* Release Year, Runtime */}
          {seriesDetails?.info ? (
            <View
              style={{
                padding: 8,
                gap: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Ionicons name="stopwatch" size={16} color="white" />
                <CustomText type="extraSmall">
                  {numberOfSeasons}{" "}
                  {numberOfSeasons! > 1 ? "seasons" : "season"}
                </CustomText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Ionicons name="calendar" size={16} color="white" />
                <CustomText type="extraSmall">
                  {seriesDetails?.info.releaseDate}
                </CustomText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Ionicons name="star" size={16} color="gold" />
                <CustomText type="extraSmall">
                  {seriesDetails?.info.rating_5based}
                </CustomText>
              </View>
            </View>
          ) : null}
          <CustomButton
            iconLeft={
              <Ionicons name="play-sharp" size={24} color={Colors.background} />
            }
            title="Play"
            onPress={handleWatchNow}
            style={{
              paddingVertical: 7,
              paddingHorizontal: 10,
              marginTop: 10,
              alignSelf: "center",
            }}
            textStyle={{ fontSize: 14, fontWeight: "bold" }}
            width="50%"
            borderRadius={10}
            textColor={Colors.background}
          />
        </View>
      </View>
      <View
        style={{
          height: 38,
          marginVertical: 15,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 10,
        }}
      >
        <CustomButton
          iconLeft={<Octicons name="download" size={24} color={Colors.white} />}
          title="Download"
          onPress={handleWatchNow}
          style={{
            paddingVertical: 7,
            paddingHorizontal: 10,
            backgroundColor: "transparent",
            borderColor: "white",
            borderWidth: 1,
          }}
          textStyle={{ fontSize: 14, fontWeight: "bold" }}
          width="45%"
          borderRadius={10}
          textColor={Colors.white}
        />
        <CustomButton
          iconLeft={
            <MaterialIcons name="bookmark" size={24} color={Colors.white} />
          }
          title="Watch Later"
          onPress={handleWatchNow}
          style={{
            paddingVertical: 7,
            paddingHorizontal: 10,
            backgroundColor: "transparent",
            borderColor: "white",
            borderWidth: 1,
          }}
          textStyle={{ fontSize: 14, fontWeight: "bold" }}
          width="45%"
          borderRadius={10}
          textColor={Colors.white}
        />
      </View>
    </>
  );
};
