import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/Home";
import SearchScreen from "@/screens/SearchScreen";

import PlaylistNavigator from "@/Navigators/PlaylistNavigator";
import SideDrawer from "@/Navigators/DrawerNavigator";

const Stack = createNativeStackNavigator();

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
          <Stack.Screen name="Home" component={SideDrawer} />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default AppNavigator;
