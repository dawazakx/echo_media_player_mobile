import Button from "@/components/Button";
import { useState } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import CustomInput from "@/components/Input";
import { CustomText } from "@/components/Text";
import { Colors } from "@/constants/Colors";
import { CompositeNavigationProp } from "@react-navigation/native";
import { CustomView } from "@/components/View";
import { PLAYER_INDEX_ROUTE } from "@/constants/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PlaylistStackParamList, RootStackParamList } from "@/constants/types";

export interface localPlaylistProps {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<PlaylistStackParamList, "m3u">,
    NativeStackNavigationProp<RootStackParamList, "Home">
  >;
}

export default function LocalForm({ navigation }: localPlaylistProps) {
  const [nickname, setNickname] = useState("Dawazak");
  const [url, setUrl] = useState("https://ottkiller.pro");

  const pickFile = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: "application/x-mpegURL", // Filter for M3U files
      });

      console.log(docRes);
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };

  return (
    <CustomView style={styles.container}>
      <CustomText type="subtitle">Upload M3U File</CustomText>

      <Pressable onPress={pickFile} style={styles.uploadButton}>
        <CustomText type="subtitle" style={{ color: Colors.background }}>
          Click to Select File
        </CustomText>
      </Pressable>

      <CustomInput
        placeholder="Nickname"
        // value={nickname}
        onChangeText={(text) => setNickname(text)}
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

  uploadButton: {
    backgroundColor: Colors.tint,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderRadius: 20,
    borderColor: "white",
  },

  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
