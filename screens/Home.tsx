import CustomButton from "@/components/Button";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View, Image } from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();

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
          title="Login and activate"
          width="70%"
          borderRadius={25}
          textColor={Colors.background}
          onPress={() => navigation.navigate("Signin")}
        />
        <CustomButton
          title="Continue with Basic"
          width="70%"
          borderRadius={25}
          textColor={Colors.background}
          onPress={() => navigation.navigate("SelectPlaylist")}
        />
      </CustomView>
    </CustomView>
  );
};

export default HomeScreen;
