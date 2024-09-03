import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { PlaylistContext } from "@/providers/PlaylistProvider";

import { BASE_URL } from "@/constants/api";

import { type Playlist } from "@/types/playlist";

type createPlaylistPayload = {
  username: string;
  nickname: string;
  password: string;
  url: string;
  device_id: string;
};

type createPlaylistResponse = {
  message: string;
  isConnected: Playlist;
}

const useCreatePlaylist = () => {
  const { setUserPlaylists, setActivePlaylist, userPlaylists } = useContext(PlaylistContext);

  async function connectXtreme( data: createPlaylistPayload): Promise<createPlaylistResponse> {
    const response = await fetch(`${BASE_URL}/connect-xstream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong!");
    }
  
    return response.json();
  }

  const setPlaylists = async (playlist: Playlist) => {
    // check if playlist exists
    const checkPlaylistExist = userPlaylists.find((p) => {
      return p.url === playlist.url && p.xtreamUserInfo.username === playlist.xtreamUserInfo.username;
    });

    if(!checkPlaylistExist) {
      setUserPlaylists((prevPlaylists) => [...prevPlaylists, playlist]);
    }
  };

  return useMutation({
    mutationFn: connectXtreme,
    onSuccess: (data) => {
      setPlaylists(data?.isConnected);
      setActivePlaylist(data?.isConnected);
      return true;
    },
    onError: (error) => {
      console.error("error creating playlist:", error);
      return error;
    },
  });
};

export default useCreatePlaylist;