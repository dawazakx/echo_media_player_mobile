import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { PlaylistContext } from "@/providers/PlaylistProvider";

import { BASE_URL } from "@/constants/api";

type createPlaylistPayload = {
  username: string;
  nickname: string;
  password: string;
  url: string;
  device_id: string;
};

type createPlaylistResponse = {
  message: string;
  isConnected: {
    device_id: string;
    url: string;
    nickname: string;
    xtreamUserInfo: {}
  };
}

const useCreatePlaylist = () => {
  const { setUserPlaylists, setActivePlaylist } = useContext(PlaylistContext);

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

  return useMutation({
    mutationFn: connectXtreme,
    onSuccess: (data) => {
      setUserPlaylists([data?.isConnected]);
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