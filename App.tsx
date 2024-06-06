import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppNavigator from "./navigation";

import { DeviceProvider } from "./providers/DeviceProvider";
import { PlaylistProvider } from "./providers/PlaylistProvider";
import React = require("react");

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DeviceProvider>
        <PlaylistProvider>
          <AppNavigator />
        </PlaylistProvider>
      </DeviceProvider>
    </QueryClientProvider>
  );
}
