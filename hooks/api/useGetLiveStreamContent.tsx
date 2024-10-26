import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PlaylistContext } from "@/providers/PlaylistProvider";

import type { LiveStream } from "@/types";

import { BASE_URL } from "@/constants/api";
import { QUERY_KEYS } from "@/constants";

const useGetLiveStreamContent = ({ categoryId }: { categoryId: string}) => {
  const { activePlaylist } = useContext(PlaylistContext);

  const getLiveStreamContent = async(): Promise<LiveStream[]> => {
    const response = await axios.get(`${BASE_URL}live-stream?category_id=${categoryId}`, {
      headers: {
        "Content-Type": "application/json",
        "deviceid": activePlaylist?.device_id,
        "playlistid": activePlaylist?._id
      },
    });

    return response.data.streams;
  };

  return useQuery({
    queryKey: [QUERY_KEYS.liveStreamContent],
    queryFn: getLiveStreamContent,
  });
};

export default useGetLiveStreamContent;