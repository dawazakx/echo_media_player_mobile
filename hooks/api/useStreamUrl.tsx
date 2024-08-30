import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PlaylistContext } from "@/providers/PlaylistProvider";

import type { Episode, Movie } from "@/types";

import { BASE_URL } from "@/constants/api";
import { QUERY_KEYS } from "@/constants";

type UseGetStreamUrlOptions = {
  movie: Movie;
};

type UseGetStreamUrlEpisodeOptions = {
  episode: Episode;
};

type UseGetStreamUrlOptionsUnion =
  | UseGetStreamUrlOptions
  | UseGetStreamUrlEpisodeOptions;

const useGetStreamUrl = (options: UseGetStreamUrlOptionsUnion) => {
  const { activePlaylist } = useContext(PlaylistContext);

  const getStreamUrl = async () => {
    let id: string | number;
    let containerExtension: string;

    if ("movie" in options) {
      id = options.movie.stream_id;
      containerExtension = options.movie.container_extension;
    } else if ("episode" in options) {
      id = options.episode.id;
      containerExtension = options.episode.container_extension;
    } else {
      throw new Error("Invalid options object");
    }

    const response = await axios.get(
      `${BASE_URL}stream-url?stream_id=${id}&stream_extension=${containerExtension}`,
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
    queryKey: [QUERY_KEYS.streamUrl],
    queryFn: getStreamUrl,
  });
};

export default useGetStreamUrl;
