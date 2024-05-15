import Button from "@/components/Button";
import CustomInput from "@/components/Input";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { PLAYER_INDEX_ROUTE } from "@/constants/Routes";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";

export default function XtremeForm() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("Dawazak");
  const [password, setPassword] = useState("wcunmgpamy");
  const [url, setUrl] = useState("https://ottkiller.pro");

  return (
    <CustomView style={styles.container}>
      <CustomText type="subtitle" style={{ paddingTop: 50 }}>
        Connect with Xtreme code
      </CustomText>

      <CustomInput
        placeholder="Username"
        // value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <CustomInput
        placeholder="Password"
        // value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <CustomInput
        placeholder="Portal"
        // value={url}
        onChangeText={(text) => setUrl(text)}
      />
      <CustomInput placeholder="Nickname" />

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
    gap: 30,
  },

  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
