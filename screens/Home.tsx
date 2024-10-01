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
import { Feather } from "@expo/vector-icons";

export interface HomeProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}

const HomeScreen: React.FC<HomeProps> = ({ navigation }) => {
  const { deviceId } = useContext(DeviceContext);
  const { activePlaylist, userPlaylists } = useContext(PlaylistContext);

  const { mutate: generateDeviceId } = useGenerateDeviceId();

  const checkActivePlaylist = async () => {
    console.log(activePlaylist);
    if (await activePlaylist?._id) {
      navigation.navigate(PLAYER_INDEX_ROUTE);
    }
  };

  const onGenerateDeviceId = async () => {
    // console.log(deviceId);
    if (!deviceId) {
      generateDeviceId({
        type: "mobile",
        os: "android",
      });
    }
  };

  useEffect(() => {
    // checkActivePlaylist();
    onGenerateDeviceId();
  }, []);

  return (
    <CustomView
      style={{ flex: 1, justifyContent: "space-between", padding: 10 }}
    >
      <View
        style={{
          height: 250,
          paddingVertical: 150,
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 150, height: 120 }}
          source={require("../assets/logo.png")}
          resizeMode="contain"
        />
      </View>

      <CustomView style={{ alignItems: "center", paddingTop: 70, gap: 12 }}>
        <CustomButton
          title="Purchase or Activate"
          width="70%"
          borderRadius={10}
          style={{ backgroundColor: Colors.tint }}
          textColor={Colors.background}
          iconLeft={<Feather name="star" size={18} color={Colors.background} />}
          onPress={() => navigation.navigate(ADD_PLAYLIST_ROUTE)}
        />
        <CustomButton
          title="Continue with basic"
          width="70%"
          borderRadius={10}
          textColor={Colors.background}
          iconLeft={
            <Feather name="clock" size={18} color={Colors.background} />
          }
          onPress={() => {
            if (userPlaylists.length > 0) {
              navigation.navigate("Select");
            } else {
              navigation.navigate(ADD_PLAYLIST_ROUTE);
            }
          }}
        />
      </CustomView>

      <CustomView style={{ alignItems: "center", paddingTop: 90 }}>
        <CustomText type="extraSmall" style={{ color: "gray" }}>
          Device ID: {deviceId}
        </CustomText>
      </CustomView>
    </CustomView>
  );
};

export default HomeScreen;
