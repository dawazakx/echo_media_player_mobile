import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import {
  LOCAL_PLAYLIST_ROUTE,
  M3U_PLAYLIST_ROUTE,
  XTREME_PLAYLIST_ROUTE,
  ADD_PLAYLIST_ROUTE,
} from "@/constants/Routes";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

export default function SelectPlaylistModal() {
  const navigation = useNavigation();
  return (
    <CustomView style={styles.container}>
      <Pressable
        style={styles.backBtn}
        onPress={() => {
          navigation.navigate(ADD_PLAYLIST_ROUTE);
        }}
      >
        <MaterialIcons name="arrow-back" size={32} color={Colors.tint} />
      </Pressable>

      <CustomView style={styles.innerContainer}>
        <CustomView style={styles.modalContainer}>
          <Pressable
            style={styles.modalContent}
            onPress={() => {
              navigation.navigate(XTREME_PLAYLIST_ROUTE);
            }}
          >
            <MaterialIcons
              name="playlist-add"
              size={20}
              color={Colors.background}
            />
            <CustomText style={{ color: Colors.background }}>
              XTREME CODES
            </CustomText>
          </Pressable>

          <Pressable
            style={styles.modalContent}
            onPress={() => {
              navigation.navigate(M3U_PLAYLIST_ROUTE);
            }}
          >
            <MaterialIcons
              name="playlist-add"
              size={20}
              color={Colors.background}
            />
            <CustomText style={{ color: Colors.background }}>
              M3U CODES
            </CustomText>
          </Pressable>
          <Pressable
            style={styles.modalContent}
            onPress={() => {
              navigation.navigate(LOCAL_PLAYLIST_ROUTE);
            }}
          >
            <MaterialIcons
              name="playlist-add"
              size={20}
              color={Colors.background}
            />
            <CustomText style={{ color: Colors.background }}>
              LOCAL M3U FILE
            </CustomText>
          </Pressable>
        </CustomView>

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </CustomView>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtn: {
    marginTop: 50,
    marginLeft: 15,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContent: {
    flexDirection: "row",
    gap: 12,
    padding: 18,
  },
  modalContainer: {
    backgroundColor: Colors.tint,
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    width: "80%",
  },
});
