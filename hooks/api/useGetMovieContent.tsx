import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PlaylistContext } from "@/providers/PlaylistProvider";

import type { Movie } from "@/types";

import { BASE_URL } from "@/constants/api";
import { QUERY_KEYS } from "@/constants";

const useGetMovieContent = () => {
  const { activePlaylist } = useContext(PlaylistContext);

  const getMovieContent = async (): Promise<Movie[]> => {
    const response = await axios.get(
      `${BASE_URL}vod-stream?category_id=${""}`,
      {
        headers: {
          "Content-Type": "application/json",
          deviceid: activePlaylist?.device_id,
          playlistid: activePlaylist?._id,
        },
      }
    );

    return response.data.streams;
  };

  return useQuery({
    queryKey: [QUERY_KEYS.movieContent],
    queryFn: getMovieContent,
  });
};

export default useGetMovieContent;
