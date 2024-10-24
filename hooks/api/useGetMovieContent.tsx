import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PlaylistContext } from "@/providers/PlaylistProvider";

import type { Movie } from "@/types";

import { BASE_URL } from "@/constants/api";
import { QUERY_KEYS } from "@/constants";

const useGetMovieContent = (categoryId: string) => {
  const { activePlaylist } = useContext(PlaylistContext);

  const getMovieContent = async (): Promise<Movie[]> => {
    const response = await axios.get(
      `${BASE_URL}vod-stream?category_id=${categoryId}`,
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
    queryKey: [QUERY_KEYS.movieContent, categoryId],
    queryFn: getMovieContent,
    enabled: !!categoryId, // Only run query if categoryId is provided
  });
};

export default useGetMovieContent;
