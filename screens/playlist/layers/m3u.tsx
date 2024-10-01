import Button from "@/components/Button";
import CustomInput from "@/components/Input";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { PLAYER_INDEX_ROUTE } from "@/constants/Routes";
import { PlaylistStackParamList, RootStackParamList } from "@/constants/types";
import { MaterialIcons } from "@expo/vector-icons";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

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
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back" size={32} color={Colors.white} />
        </Pressable>

        <CustomText type="subtitle">Connect with M3u Url</CustomText>
      </View>

      <CustomInput
        containerStyle={{ width: "85%", alignSelf: "center" }}
        placeholder="Nickname"
        // value={nickname}
        onChangeText={(text) => setNickname(text)}
      />

      <CustomInput
        containerStyle={{ width: "85%", alignSelf: "center" }}
        placeholder="M3U Link"
        // value={url}
        onChangeText={(text) => setUrl(text)}
      />
      <CustomInput
        containerStyle={{ width: "85%", alignSelf: "center" }}
        placeholder="EPG Link (Optional)"
        // value={url}
        onChangeText={(text) => setUrl(text)}
      />

      <Button
        title="Next"
        borderRadius={10}
        width="85%"
        style={{ alignSelf: "center" }}
        textColor={Colors.background}
        onPress={() => navigation.navigate(PLAYER_INDEX_ROUTE)}
      />
    </CustomView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 30,
    backgroundColor: Colors.secBackground,
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 35,
  },

  text: {
    fontWeight: "500",
    fontSize: 20,
    color: "white",
    padding: 20,
    textAlign: "center",
  },
});
