import React, { useContext, useEffect } from "react";
import { View, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import CustomButton from "@/components/Button";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";

import { DeviceContext } from "@/providers/DeviceProvider";
import { PlaylistContext } from "@/providers/PlaylistProvider";

import useGenerateDeviceId from "@/hooks/api/useGenerateDeviceId";

import { Colors } from "@/constants/Colors";
import { RootStackParamList } from "@/constants/types";
import {
  SIGNIN_ROUTE,
  ADD_PLAYLIST_ROUTE,
  PLAYER_INDEX_ROUTE,
} from "@/constants/Routes";

export interface HomeProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}

const HomeScreen: React.FC<HomeProps> = ({ navigation }) => {
  const { deviceId } = useContext(DeviceContext);
  const { activePlaylist } = useContext(PlaylistContext);

  const { mutate: generateDeviceId } = useGenerateDeviceId();

  const checkActivePlaylist = async () => {
    console.log(activePlaylist);
    if (await activePlaylist?._id) {
      navigation.navigate(PLAYER_INDEX_ROUTE);
    }
  };

  const onGenerateDeviceId = async () => {
    console.log(deviceId);
    if (!deviceId) {
      generateDeviceId({
        type: "mobile",
        os: "android",
      });
    }
  };

  useEffect(() => {
    checkActivePlaylist();
    onGenerateDeviceId();
  }, []);

  return (
    <CustomView style={{ flex: 1, padding: 10 }}>
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
      <CustomText
        type="title"
        style={{ color: Colors.tint, textAlign: "center", paddingBottom: 15 }}
      >
        Premium Features
      </CustomText>
      <CustomView>
        <CustomText type="subtitle" style={{ textAlign: "center", padding: 5 }}>
          Recording
        </CustomText>
        <CustomText type="subtitle" style={{ textAlign: "center", padding: 5 }}>
          Catch up
        </CustomText>
        <CustomText type="subtitle" style={{ textAlign: "center", padding: 5 }}>
          V.O.D recording
        </CustomText>
        <CustomText type="subtitle" style={{ textAlign: "center", padding: 5 }}>
          Multiple playlists
        </CustomText>
        <CustomText type="subtitle" style={{ textAlign: "center", padding: 5 }}>
          Synchronise playlists & favorites
        </CustomText>
      </CustomView>
      <CustomView style={{ alignItems: "center", paddingTop: 80, gap: 12 }}>
        <CustomButton
          title="Continue"
          width="70%"
          borderRadius={25}
          textColor={Colors.background}
          onPress={() => navigation.navigate(ADD_PLAYLIST_ROUTE)}
        />
      </CustomView>
    </CustomView>
  );
};

export default HomeScreen;
