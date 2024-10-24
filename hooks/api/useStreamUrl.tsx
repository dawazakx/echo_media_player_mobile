import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PlaylistContext } from "@/providers/PlaylistProvider";

import type { Episode, Movie, LiveStream } from "@/types";

import { BASE_URL } from "@/constants/api";
import { QUERY_KEYS } from "@/constants";

type UseGetStreamUrlStreamOptions = {
  stream: LiveStream;
};

type UseGetStreamUrlOptions = {
  movie: Movie;
};

type UseGetStreamUrlEpisodeOptions = {
  episode: Episode;
};

type UseGetStreamUrlOptionsUnion =
  | UseGetStreamUrlStreamOptions
  | UseGetStreamUrlOptions
  | UseGetStreamUrlEpisodeOptions;

const useGetStreamUrl = (options: UseGetStreamUrlOptionsUnion) => {
  const { activePlaylist } = useContext(PlaylistContext);

  const getStreamUrl = async () => {
    let id: string | number;
    let containerExtension: string;
    let endpoint: string;

    if ("movie" in options) {
      id = options.movie.stream_id;
      containerExtension = options.movie.container_extension;
      endpoint = `${BASE_URL}stream-url`;
    } else if ("episode" in options) {
      id = options.episode.id;
      containerExtension = options.episode.container_extension;
      endpoint = `${BASE_URL}series-url`;
    } else if ("stream" in options) {
      id = options.stream.stream_id;
      containerExtension = "mkv";
      endpoint = `${BASE_URL}live-url`;
    } else {
      throw new Error("Invalid options object");
    }

    const response = await axios.get(
      `${endpoint}?stream_id=${id}&stream_extension=${containerExtension}`,
      {
        headers: {
          "Content-Type": "application/json",
          deviceid: activePlaylist?.device_id,
          playlistid: activePlaylist?._id,
        },
      }
    );
    console.log("stream-id", id);
    return response.data.streamURL;
  };

  const queryKey =
    "episode" in options
      ? [QUERY_KEYS.streamUrl, options.episode.id]
      : [QUERY_KEYS.streamUrl];

  return useQuery({
    queryKey,
    queryFn: getStreamUrl,
  });
};

export default useGetStreamUrl;
