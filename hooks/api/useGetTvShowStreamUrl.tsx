import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PlaylistContext } from "@/providers/PlaylistProvider";
import type { Episode } from "@/types";
import { BASE_URL } from "@/constants/api";
import { QUERY_KEYS } from "@/constants";

const useGetTvShowStreamUrl = (episode: Episode) => {
  const { activePlaylist } = useContext(PlaylistContext);

  const getStreamUrl = async () => {
    const response = await axios.get(
      `${BASE_URL}series-url?stream_id=${episode.id}&stream_extension=${episode.container_extension}`,
      {
        headers: {
          "Content-Type": "application/json",
          deviceid: activePlaylist?.device_id,
          playlistid: activePlaylist?._id,
        },
      }
    );
    return response.data.url; // Updated to return response.data.url
  };

  return useQuery({
    queryKey: [QUERY_KEYS.streamUrl, episode.id],
    queryFn: getStreamUrl,
    retry: false,
  });
};

export default useGetTvShowStreamUrl;
