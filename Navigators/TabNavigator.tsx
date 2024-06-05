import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "@/constants/Colors";
import MoviesTab from "@/screens/tabs/MoviesTab";
import LiveTvTab from "@/screens/tabs/LiveTvTab";
import TvShowsTab from "@/screens/tabs/TvShowsTab";
import SportsTab from "@/screens/tabs/SportsTab";
import React from "react";
import Header from "../components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import SettingsTab from "@/screens/tabs/SettingsTab";
import {
  MoviesStackParamList,
  SettingsStackParamList,
  TabParamList,
} from "@/constants/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetails from "@/screens/MovieDetails";
import VideoPlayer from "@/screens/VideoPlayer";
import Profile from "@/screens/tabs/settings/Profile";
import ManagePlaylist from "@/screens/tabs/settings/ManagePlaylist";
import About from "@/screens/tabs/settings/About";
import Terms from "@/screens/tabs/settings/Terms";
import Support from "@/screens/tabs/settings/Support";

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<MoviesStackParamList>();
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

const MoviesStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MoviesList" component={MoviesTabWithHeader} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
    </Stack.Navigator>
  );
};
const SettingsStackNavigator: React.FC = () => {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="index" component={SettingsTab} />
      <SettingsStack.Screen name="Manage" component={ManagePlaylist} />
      <SettingsStack.Screen name="Profile" component={Profile} />
      <SettingsStack.Screen name="About" component={About} />
      <SettingsStack.Screen name="Terms" component={Terms} />
      <SettingsStack.Screen name="Support" component={Support} />
    </SettingsStack.Navigator>
  );
};

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.white,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.background,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="LiveTV"
        component={LiveTvTabWithHeader}
        options={{
          title: "Live TV",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="live-tv"
              color={color}
              size={28}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Movies"
        component={MoviesStackNavigator}
        options={{
          title: "Movies",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="movie"
              color={color}
              size={28}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="TvShows"
        component={TvShowsTabWithHeader}
        options={{
          title: "TV Shows",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="tv"
              color={color}
              size={28}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Sports"
        component={SportsTabWithHeader}
        options={{
          title: "Sports",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="sports-soccer"
              color={color}
              size={28}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="settings"
              color={color}
              size={28}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const withHeader = (ScreenComponent) => (props) =>
  (
    <React.Fragment>
      <Header {...props} />
      <ScreenComponent {...props} />
    </React.Fragment>
  );

const MoviesTabWithHeader = withHeader(MoviesTab);
const LiveTvTabWithHeader = withHeader(LiveTvTab);
const TvShowsTabWithHeader = withHeader(TvShowsTab);
const SportsTabWithHeader = withHeader(SportsTab);
const SettingsTabWithHeader = withHeader(SettingsTab);
