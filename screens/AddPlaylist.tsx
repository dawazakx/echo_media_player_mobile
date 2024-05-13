import CustomButton from "@/components/Button";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View, Image } from "react-native";

import { SELECT_PLAYLIST_ROUTE } from "../constants/Routes";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";

const AddPlaylistScreen = () => {
  const navigation = useNavigation();

  return (
    <CustomView style={{ flex: 1, padding: 10, gap: 15 }}>
      <View
        style={{
          height: 250,
          paddingVertical: 50,
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 150, height: 120 }}
          source={require("../assets/logo.png")}
          resizeMode="contain"
        />
      </View>
      <MaterialIcons
        name="playlist-play"
        size={70}
        color={Colors.tint}
        style={{ alignSelf: "center" }}
      />
      <CustomView>
        <CustomText style={{ textAlign: "center", padding: 10 }}>
          Sparrow Player is strictly a MEDIA PLAYER It does not provide any type
          of media content To use sparrow player, add your playlist using the
          button below
        </CustomText>
      </CustomView>
      <CustomView style={{ alignItems: "center", paddingTop: 60 }}>
        <CustomButton
          title="Add playlist"
          width="70%"
          borderRadius={25}
          style={{ backgroundColor: Colors.tint }}
          iconLeft={
            <Fontisto name="plus-a" size={24} color={Colors.background} />
          }
          textColor={Colors.background}
          onPress={() => navigation.navigate(SELECT_PLAYLIST_ROUTE)}
        />
      </CustomView>
    </CustomView>
  );
};

export default AddPlaylistScreen;
