import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "@/constants/Colors";
import LiveTvTab from "@/screens/tabs/livetv/LiveTvTab";
import TvShowsTab from "@/screens/tabs/tvshows/TvShowsTab";
import SportsTab from "@/screens/tabs/SportsTab";
import React from "react";
import Header from "../components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import SettingsTab from "@/screens/tabs/SettingsTab";
import {
  MoviesStackParamList,
  SettingsStackParamList,
  TabParamList,
  TvShowsStackParamList,
} from "@/constants/types";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "@/screens/tabs/settings/Profile";
import About from "@/screens/tabs/settings/About";
import Terms from "@/screens/tabs/settings/Terms";
import Support from "@/screens/tabs/settings/Support";
import AllMovies from "@/screens/tabs/movies/AllMovies";
import PlaylistNavigator from "./PlaylistNavigator";
import ManagePlaylist from "@/screens/tabs/settings/managePlaylist/ManagePlaylist";
import PlaylistDetails from "@/screens/tabs/settings/managePlaylist/PlaylistDetails";

import { useNavigationState } from "@react-navigation/native";
import AllTvShows from "@/screens/tabs/tvshows/AllTvShows";
import MoviesTab from "@/screens/tabs/movies/MoviesTab";
import { Image } from "expo-image";
import { View } from "react-native";

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<MoviesStackParamList>();
const TvStack = createNativeStackNavigator<TvShowsStackParamList>();
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();
const PlaylistManagerStack = createNativeStackNavigator();

const MoviesStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MoviesList" component={MoviesTabWithHeader} />
      <Stack.Screen name="AllMovies" component={AllMovies} />
      {/* <Stack.Screen name="MovieDetails" component={MovieDetails} /> */}
    </Stack.Navigator>
  );
};
const TvShowsStackNavigator: React.FC = () => {
  return (
    <TvStack.Navigator screenOptions={{ headerShown: false }}>
      <TvStack.Screen name="TvShowsList" component={TvShowsTabWithHeader} />
      <TvStack.Screen name="AllTvShows" component={AllTvShows} />
      {/* <TvStack.Screen name="MovieDetails" component={MovieDetails} /> */}
    </TvStack.Navigator>
  );
};
const PlaylistManagerNavigator: React.FC = () => {
  return (
    <PlaylistManagerStack.Navigator screenOptions={{ headerShown: false }}>
      <PlaylistManagerStack.Screen
        name="playlist-manager"
        component={ManagePlaylist}
      />
      <PlaylistManagerStack.Screen
        name="PlaylistDetails"
        component={PlaylistDetails}
      />
      <PlaylistManagerStack.Screen
        name="add-playlist"
        component={PlaylistNavigator}
      />
    </PlaylistManagerStack.Navigator>
  );
};
const SettingsStackNavigator: React.FC = () => {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="index" component={SettingsTab} />
      <SettingsStack.Screen
        name="Manage"
        component={PlaylistManagerNavigator}
      />
      <SettingsStack.Screen name="Profile" component={Profile} />
      <SettingsStack.Screen name="About" component={About} />
      <SettingsStack.Screen name="Terms" component={Terms} />
      <SettingsStack.Screen name="Support" component={Support} />
    </SettingsStack.Navigator>
  );
};

export default function Tabs() {
  const routeName = useNavigationState(
    (state) => state?.routes[state.index]?.name
  );
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
        tabBarInactiveTintColor: Colors.white,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1f2937F2",
          borderTopColor: "transparent",
          paddingBottom: 5,
          position: "absolute",
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
      <Tab.Screen
        name="TvShows"
        component={TvShowsStackNavigator}
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
      />
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
          tabBarStyle: { display: "none" },
          tabBarIcon: () => (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/logo.png")}
                style={{ width: 28, height: 28 }}
              />
            </View>
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
