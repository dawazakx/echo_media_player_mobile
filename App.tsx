import React from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from './navigation';

import { store } from './store';
import { Provider } from 'react-redux';

import { DeviceProvider } from './providers/DeviceProvider';
import { PlaylistProvider } from './providers/PlaylistProvider';

export default function App() {
  return (
   <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <DeviceProvider>
        <PlaylistProvider>
          <AppNavigator />
        </PlaylistProvider>
      </DeviceProvider>
     </Provider>
    </GestureHandlerRootView>
  );
}
