import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPlaylistScreen from "../screens/playlist/AddPlaylist";
import XtremeForm from "../screens/playlist/layers/xtreme";
import M3uForm from "../screens/playlist/layers/m3u";
import LocalForm from "../screens/playlist/layers/local";
import SelectPlaylistModal from "../screens/playlist/layers/SelectPlaylist";

const Stack = createNativeStackNavigator();

function PlaylistNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
  );
}
export default PlaylistNavigator;
