import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import { DeviceProvider } from "@/providers/DeviceProvider";
import { PlaylistProvider } from "./providers/PlaylistProvider";
import { SeriesProvider } from "./providers/SeriesProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppNavigator from "./navigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DeviceProvider>
        <QueryClientProvider client={queryClient}>
          <PlaylistProvider>
            <BottomSheetModalProvider>
              <AppNavigator/>
            </BottomSheetModalProvider>
        </PlaylistProvider>
        </QueryClientProvider>
      </DeviceProvider>
      <Toast />
    </GestureHandlerRootView>
  );
}
