import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAsyncStorage } from "@/hooks/useAsyncStorage";

import { BASE_URL } from "@/constants/api";
import { STORAGE_KEYS } from "@/constants";

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
  const storage = useAsyncStorage();

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
      storage.setItem(STORAGE_KEYS.activePlaylist, JSON.stringify(data?.isConnected));
      return true;
    },
    onError: (error) => {
      console.error("error creating playlist:", error);
      return error;
    },
  });
};

export default useCreatePlaylist;