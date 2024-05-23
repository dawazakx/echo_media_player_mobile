import Button from "@/components/Button";
import CustomInput from "@/components/Input";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { PLAYER_INDEX_ROUTE } from "@/constants/Routes";
import { PlaylistStackParamList, RootStackParamList } from "@/constants/types";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet } from "react-native";

export interface m3uPlaylistProps {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<PlaylistStackParamList, "m3u">,
    NativeStackNavigationProp<RootStackParamList, "Home">
  >;
}

export default function M3uForm({ navigation }: m3uPlaylistProps) {
  const [nickname, setNickname] = useState("Dawazak");
  const [url, setUrl] = useState("https://ottkiller.pro");

  return (
    <CustomView style={styles.container}>
      <CustomText type="subtitle">Connect with M3u Url</CustomText>

      <CustomInput
        placeholder="Nickname"
        // value={nickname}
        onChangeText={(text) => setNickname(text)}
      />

      <CustomInput
        placeholder="M3U Link"
        // value={url}
        onChangeText={(text) => setUrl(text)}
      />
      <CustomInput
        placeholder="EPG Link (Optional)"
        // value={url}
        onChangeText={(text) => setUrl(text)}
      />

      <CustomView style={styles.navigation}>
        <Button
          title="Back"
          borderRadius={25}
          width="48%"
          textColor={Colors.background}
          onPress={() => navigation.goBack()}
        />

        <Button
          title="Next"
          borderRadius={25}
          width="48%"
          textColor={Colors.background}
          onPress={() => navigation.navigate(PLAYER_INDEX_ROUTE)}
        />
      </CustomView>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 50,
    gap: 30,
  },

  text: {
    fontWeight: "500",
    fontSize: 20,
    color: "white",
    padding: 20,
    textAlign: "center",
  },

  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
