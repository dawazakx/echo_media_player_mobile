import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./navigation";

import { store } from "./store";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { DeviceProvider } from "./providers/DeviceProvider";
import { PlaylistProvider } from "./providers/PlaylistProvider";
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <DeviceProvider>
            <PlaylistProvider>
              <StatusBar style="auto" />
              <AppNavigator />
            </PlaylistProvider>
          </DeviceProvider>
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
