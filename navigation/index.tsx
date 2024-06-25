import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/Home";
import SearchScreen from "@/screens/SearchScreen";

import PlaylistNavigator from "@/Navigators/PlaylistNavigator";
import Tabs from "@/Navigators/TabNavigator";
import MovieDetails from "@/screens/MovieDetails";
import VideoPlayer from "@/screens/VideoPlayer";

const Stack = createNativeStackNavigator();

const SearchStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchHome" component={SearchScreen} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
    </Stack.Navigator>
  );
};

function AppNavigator() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={HomeScreen} />
          <Stack.Screen name="Playlist" component={PlaylistNavigator} />
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="MovieDetails" component={MovieDetails} />
          <Stack.Screen name="Search" component={SearchStackNavigator} />
          <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default AppNavigator;
