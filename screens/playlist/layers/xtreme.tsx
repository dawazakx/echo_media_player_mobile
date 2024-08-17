import React, { useState } from "react";
import { Alert, StyleSheet, View, Pressable } from "react-native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";

import Button from "@/components/Button";
import CustomInput from "@/components/Input";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";

import useCreatePlaylist from "@/hooks/api/useCreatePlaylist";

import { Colors } from "@/constants/Colors";
import { PLAYER_INDEX_ROUTE } from "@/constants/Routes";
import { PlaylistStackParamList, RootStackParamList } from "@/constants/types";
import { STORAGE_KEYS } from "@/constants";

import { MaterialIcons } from "@expo/vector-icons";

export interface XtremePlaylistProps {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<PlaylistStackParamList, "xtreme">,
    NativeStackNavigationProp<RootStackParamList, "Home">
  >;
}

export default function XtremeForm({ navigation }: XtremePlaylistProps) {
  const storage = useAsyncStorage();
  const deviceId = storage.getItem(STORAGE_KEYS.deviceId);
  
  const [username, setUsername] = useState("Dawazak");
  const [nickname, setNickname] = useState("Dawazak");
  const [password, setPassword] = useState("wcunmgpamy");
  const [url, setUrl] = useState("https://ottkiller.pro");
  // const [username, setUsername] = useState("");
  // const [nickname, setNickname] = useState("");
  // const [password, setPassword] = useState("");
  // const [url, setUrl] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  
  const { 
    mutate: connectXtreme, 
    isPending: isLoading, 
    isSuccess: createPlaylistSuccess, 
    error: createPlaylistError
  } = useCreatePlaylist();

  const validateForm = () => {
    return username && password && url && nickname;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return Alert.alert("Validation Error", "All fields are required.");
    }

    try {
      await connectXtreme({
        username,
        password,
        url,
        nickname,
        device_id: await deviceId || "",
      });

      if(createPlaylistError) {
        Alert.alert("Error", createPlaylistError.message);
      }

      if(createPlaylistSuccess) {
        navigation.navigate(PLAYER_INDEX_ROUTE);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <CustomView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialIcons name="arrow-back" size={32} color={Colors.white} />
        </Pressable>

        <CustomText type="subtitle">
          Connect with Xtreme code
        </CustomText>
      </View>
      

      <CustomInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <CustomInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <CustomInput
        placeholder="Portal"
        value={url}
        onChangeText={(text) => setUrl(text)}
      />
      <CustomInput
        placeholder="Nickname"
        value={nickname}
        onChangeText={(text) => setNickname(text)}
      />

      <Button
        title="Next"
        borderRadius={25}
        width="100%"
        textColor={Colors.background}
        onPress={handleSubmit}
        disabled={isLoading}
        loading={isLoading}
      />
    </CustomView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    gap: 30,
  },

  header: {
    marginTop: 50,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
