import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PlaylistContext } from "@/providers/PlaylistProvider";
import type { LiveStream } from "@/types";
import { BASE_URL } from "@/constants/api";
import { QUERY_KEYS } from "@/constants";

const useGetLiveTvStreamUrl = (stream: LiveStream) => {
  const { activePlaylist } = useContext(PlaylistContext);

  const getStreamUrl = async () => {
    const response = await axios.get(
      `${BASE_URL}live-url?stream_id=${stream.stream_id}&stream_extension=mkv`,
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
    queryKey: [QUERY_KEYS.streamUrl, stream.stream_id],
    queryFn: getStreamUrl,
    retry: false,
  });
};

export default useGetLiveTvStreamUrl;
