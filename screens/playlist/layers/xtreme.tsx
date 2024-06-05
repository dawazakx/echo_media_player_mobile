import { useContext, useState } from "react";
import { Alert, StyleSheet, View, Pressable } from "react-native";

import { DeviceContext } from "@/providers/DeviceProvider";
import { PlaylistContext } from "@/providers/PlaylistProvider";

import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

import Button from "@/components/Button";
import CustomInput from "@/components/Input";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";

import { Colors } from "@/constants/Colors";
import { PLAYER_INDEX_ROUTE } from "@/constants/Routes";
import { BASE_URL } from "@/constants/api";
import { PlaylistStackParamList, RootStackParamList } from "@/constants/types";


export interface XtremePlaylistProps {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<PlaylistStackParamList, "xtreme">,
    NativeStackNavigationProp<RootStackParamList, "Home">
  >;
}

type dataProps = {
  username: string;
  nickname: string;
  password: string;
  url: string;
};

async function connectXtreme(
  data: dataProps & { device_id: string | null }
): Promise<any> {
  const response = await fetch(`${BASE_URL}/connect-xstream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong!");
  }

  return response.json();
}

export default function XtremeForm({ navigation }: XtremePlaylistProps) {
  const [username, setUsername] = useState("Dawazak");
  const [nickname, setNickname] = useState("Dawazak");
  const [password, setPassword] = useState("wcunmgpamy");
  const [url, setUrl] = useState("https://ottkiller.pro");
  // const [username, setUsername] = useState("");
  // const [nickname, setNickname] = useState("");
  // const [password, setPassword] = useState("");
  // const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { deviceId } = useContext(DeviceContext);
  const { setCurrentPlaylist } = useContext(PlaylistContext);

  const validateForm = () => {
    return username && password && url && nickname;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    setIsLoading(true);

    try {
      const requestAddPlaylist = await connectXtreme({
        username,
        password,
        url,
        nickname,
        device_id: deviceId,
      });

      setCurrentPlaylist(requestAddPlaylist?.isConnected);
      navigation.navigate(PLAYER_INDEX_ROUTE);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
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
