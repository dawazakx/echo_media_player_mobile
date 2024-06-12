import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./navigation";

import { DeviceProvider } from "./providers/DeviceProvider";
import { PlaylistProvider } from "./providers/PlaylistProvider";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DeviceProvider>
        <PlaylistProvider>
          <AppNavigator />
        </PlaylistProvider>
      </DeviceProvider>
    </GestureHandlerRootView>
  );
}
