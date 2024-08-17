import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppNavigator from "./navigation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="auto" />
        <AppNavigator />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
