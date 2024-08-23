import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PlaylistContext } from "@/providers/PlaylistProvider";

import type { Category } from "@/types";

import { BASE_URL } from "@/constants/api";
import { QUERY_KEYS } from "@/constants";

const useGetMovieCategories = () => {
  const { activePlaylist } = useContext(PlaylistContext);

  const getMovieCategories = async (): Promise<Category[]> => {
    const response = await axios.get(`${BASE_URL}vod-stream-category`, {
      headers: {
        "Content-Type": "application/json",
        deviceId: activePlaylist?.device_id,
        playlistid: activePlaylist?._id,
      },
    });

    return response.data.vodCategories;
  };

  return useQuery({
    queryKey: [QUERY_KEYS.movieCategories],
    queryFn: getMovieCategories,
  });
};

export default useGetMovieCategories;
