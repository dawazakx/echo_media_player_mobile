import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/Home";
import AddPlaylistScreen from "@/screens/playlist/AddPlaylist";
import SelectPlaylistModal from "@/screens/playlist/layers/SelectPlaylist";
import XtremeForm from "@/screens/playlist/layers/xtreme";
import M3uForm from "@/screens/playlist/layers/m3u";
import LocalForm from "@/screens/playlist/layers/local";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddPlaylist" component={AddPlaylistScreen} />
          <Stack.Screen
            name="SelectPlaylist"
            component={SelectPlaylistModal}
            options={{ presentation: "modal" }}
          />
          <Stack.Screen name="xtreme" component={XtremeForm} />
          <Stack.Screen name="m3u" component={M3uForm} />
          <Stack.Screen name="local" component={LocalForm} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default AppNavigator;
