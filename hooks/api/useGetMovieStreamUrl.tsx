import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PlaylistContext } from "@/providers/PlaylistProvider";
import type { Movie } from "@/types";
import { BASE_URL } from "@/constants/api";
import { QUERY_KEYS } from "@/constants";

const useGetMovieStreamUrl = (movie: Movie) => {
  const { activePlaylist } = useContext(PlaylistContext);

  const getStreamUrl = async () => {
    const response = await axios.get(
      `${BASE_URL}stream-url?stream_id=${movie.stream_id}&stream_extension=${movie.container_extension}`,
      {
        headers: {
          "Content-Type": "application/json",
          deviceid: activePlaylist?.device_id,
          playlistid: activePlaylist?._id,
        },
      }
    );
    return response.data.streamURL;
  };

  return useQuery({
    queryKey: [QUERY_KEYS.streamUrl, movie.stream_id],
    queryFn: getStreamUrl,
    retry: false,
  });
};

export default useGetMovieStreamUrl;
