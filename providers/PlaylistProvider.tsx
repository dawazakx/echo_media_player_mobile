import { createContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../constants/api";

const initialContetxt: {
  currentPlaylist: {
    device_id: string;
    nickname: string;
    url: string;
  } | null;
  setCurrentPlaylist: (movie: {} | null) => void;
} = {
  currentPlaylist: null,
  setCurrentPlaylist: () => {},
};

export const PlaylistContext = createContext(initialContetxt);

export const PlaylistProvider = ({ children }: any) => {
  const [currentPlaylist, setCurrentPlaylist] = useState<{} | null>(() => {
    const payload = AsyncStorage.getItem("@app:currentPlaylist");
    return typeof payload === "object" ? payload : null;
  });

  return (
    <PlaylistContext.Provider
      value={{
        currentPlaylist,
        setCurrentPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}