import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import { DeviceProvider } from "@/providers/DeviceProvider";
import { PlaylistProvider } from "./providers/PlaylistProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppNavigator from "./navigation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DeviceProvider>
        <PlaylistProvider>
          <QueryClientProvider client={queryClient}>
            <StatusBar style="auto" />
            <AppNavigator />
          </QueryClientProvider>
        </PlaylistProvider>
      </DeviceProvider>
    </GestureHandlerRootView>
  );
}
