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
    <Pressable
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 12,
        backgroundColor: Colors.tint,
      }}
    >
      <MaterialIcons name={icon} size={24} color="black" />
      <CustomText
        type="defaultSemiBold"
        style={{ marginLeft: 36, color: Colors.background }}
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
      <View
        style={{
          marginHorizontal: 12,
          marginVertical: 15,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={30}
            color={Colors.white}
          />
        </TouchableOpacity>

        <CustomText type="title">Settings</CustomText>
      </View>

      <ScrollView style={{ marginHorizontal: 12 }}>
        {/* Account Settings */}
        <View style={{ marginBottom: 12 }}>
          <CustomText type="subtitle" style={{ marginVertical: 10 }}>
            Account
          </CustomText>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: Colors.white,
            }}
          >
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
          <View
            style={{
              borderRadius: 12,
              backgroundColor: Colors.white,
            }}
          >
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
        width="35%"
        style={{ backgroundColor: Colors.tint }}
        textColor={Colors.background}
      />
    </SafeAreaView>
  );
};
export default SettingsTab;
const styles = StyleSheet.create({});
