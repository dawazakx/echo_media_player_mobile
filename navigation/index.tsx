import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PlaylistNavigator from "@/Navigators/PlaylistNavigator";
import Tabs from "@/Navigators/TabNavigator";

import HomeScreen from "@/screens/Home";
import SearchScreen from "@/screens/SearchScreen";
import VideoPlayer from "@/screens/VideoPlayer";
import LiveStreamDetails from "@/screens/tabs/livetv/LiveStreamDetails";
import TvSeriesDetails from "@/screens/tabs/tvshows/TvSeriesDetails";

import { RootStackParamList } from "@/constants/types";
import MovieDetails from "@/screens/tabs/movies/MovieDetails";

const Stack = createNativeStackNavigator<RootStackParamList>();

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
          <Stack.Screen name="TvSeriesDetails" component={TvSeriesDetails} />
          <Stack.Screen
            name="LiveStreamDetails"
            component={LiveStreamDetails}
          />
          <Stack.Screen name="Search" component={SearchStackNavigator} />
          <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default AppNavigator;
