import CustomButton from "@/components/Button";
import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { TabParamList } from "@/constants/types";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface SettingsProps {
  navigation: BottomTabScreenProps<TabParamList, "Settings">;
  route: RouteProp<TabParamList, "Settings">;
}

const SettingsTab: React.FC<SettingsProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  const navigateToSupport = () => {
    navigation.navigate("Support");
  };

  const navigateToTerms = () => {
    navigation.navigate("Terms");
  };
  const navigateToAbout = () => {
    navigation.navigate("About");
  };

  const navigateToManagePlaylist = () => {
    navigation.navigate("Manage");
  };

  const logout = () => {
    console.log("Logout");
  };

  const accountItems = [
    {
      icon: "manage-accounts",
      text: "Profile",
      action: navigateToProfile,
    },
    {
      icon: "playlist-play",
      text: "Manage Playlists",
      action: navigateToManagePlaylist,
    },
  ];

  const supportItems = [
    {
      icon: "info-outline",
      text: "About",
      action: navigateToAbout,
    },
    { icon: "help-outline", text: "Help & Support", action: navigateToSupport },
    {
      icon: "policy",
      text: "Terms and Policies",
      action: navigateToTerms,
    },
  ];

  const actionsItems = [{ icon: "logout", text: "Log out", action: logout }];

  const renderSettingsItem = ({ icon, text, action }) => (
    <Pressable onPress={action} style={styles.renderItem}>
      <MaterialIcons name={icon} size={24} color={Colors.background} />
      <CustomText
        type="defaultSemiBold"
        style={{ marginLeft: 15, color: Colors.background }}
      >
        {text}{" "}
      </CustomText>
    </Pressable>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: 20,
        paddingHorizontal: 8,
        backgroundColor: Colors.secBackground,
      }}
    >
      <View style={styles.header}>
        <Pressable
          style={styles.backBtn}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back" size={32} color={Colors.white} />
        </Pressable>

        <CustomText type="title">Settings</CustomText>
      </View>

      <ScrollView style={styles.container}>
        {/* Account Settings */}
        <View
          style={{
            marginBottom: 12,
          }}
        >
          <CustomText type="subtitle" style={{ marginVertical: 10 }}>
            Account
          </CustomText>
          <View style={styles.renderItemContainer}>
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Support and About settings */}
        <View style={{ marginBottom: 12 }}>
          <CustomText type="subtitle" style={{ marginVertical: 10 }}>
            Support & About{" "}
          </CustomText>
          <View style={styles.renderItemContainer}>
            {supportItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
      <CustomButton
        title="Log Out"
        onPress={() => {
          console.log("logout");
        }}
        iconLeft={
          <MaterialIcons name="logout" size={24} color={Colors.background} />
        }
        width="30%"
        borderRadius={12}
        style={{
          backgroundColor: Colors.tint,
          bottom: 20,
          left: 12,
        }}
        textColor={Colors.background}
      />
    </SafeAreaView>
  );
};
export default SettingsTab;
const styles = StyleSheet.create({
  header: {
    marginHorizontal: 12,
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  container: {
    marginHorizontal: 12,
    marginTop: 15,
  },
  renderItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingLeft: 12,
  },
  backBtn: {
    left: 0,
    backgroundColor: "transparent",
  },
  renderItemContainer: {
    borderRadius: 12,
    backgroundColor: Colors.tint,
  },
});
