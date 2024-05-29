import AppNavigator from './navigation';

import { DeviceProvider } from './providers/DeviceProvider';
import { PlaylistProvider } from './providers/PlaylistProvider';

export default function App() {
  return (
    <DeviceProvider>
      <PlaylistProvider>
        <AppNavigator />
      </PlaylistProvider>
    </DeviceProvider>
  );
}
