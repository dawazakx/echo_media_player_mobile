import AppNavigator from './navigation';

import { DeviceProvider } from './providers/DeviceProvider';

export default function App() {
  return (
    <DeviceProvider>
      <AppNavigator />
    </DeviceProvider>
  );
}
