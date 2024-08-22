import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ReactChildrenProps } from "@/types";

import { STORAGE_KEYS } from "@/constants";

type PlaylistProps = {
  _id?: string;
  device_id: string;
  nickname: string;
  url: string;
}

type PlaylistContextProps = {
  activePlaylist: PlaylistProps | null;
  userPlaylists: PlaylistProps[];
  setActivePlaylist: Dispatch<SetStateAction<PlaylistProps | null>>;
  setUserPlaylists: Dispatch<SetStateAction<PlaylistProps[]>>;
}

const initialContext: PlaylistContextProps = {
  activePlaylist: null,
  setActivePlaylist: () => {},
  userPlaylists: [],
  setUserPlaylists: () => {},
};

export const PlaylistContext = createContext(initialContext);

export const PlaylistProvider = ({ children }: ReactChildrenProps) => {
  const [activePlaylist, setActivePlaylist] = useState<PlaylistProps | null>(null);
  const [userPlaylists, setUserPlaylists] = useState<PlaylistProps[]>([]);

  useEffect(() => {
    AsyncStorage
      .getItem(STORAGE_KEYS.activePlaylist)
      .then((value) => {
        if (value) {
          setActivePlaylist(JSON.parse(value));
        }
      });

    AsyncStorage
      .getItem(STORAGE_KEYS.userPlaylists)
      .then((value) => {
        if (value) {
          setUserPlaylists(JSON.parse(value));
        }
      });
  }, []);

  useEffect(() => {
    if(activePlaylist !== initialContext.activePlaylist) {
      AsyncStorage.setItem(STORAGE_KEYS.activePlaylist, JSON.stringify(activePlaylist));
    }
  }, [activePlaylist]);

  useEffect(() => {
    if(userPlaylists !== initialContext.userPlaylists) {
      AsyncStorage.setItem(STORAGE_KEYS.userPlaylists, JSON.stringify(userPlaylists));
    }
  }, [userPlaylists]);

  return (
    <PlaylistContext.Provider
      value={{
        activePlaylist,
        setActivePlaylist,
        userPlaylists,
        setUserPlaylists
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}