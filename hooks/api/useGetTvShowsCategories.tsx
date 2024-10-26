import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PlaylistContext } from "@/providers/PlaylistProvider";

import type { Category } from "@/types";

import { BASE_URL } from "@/constants/api";
import { QUERY_KEYS } from "@/constants";

const useGetTvShowsCategories = () => {
  const { activePlaylist } = useContext(PlaylistContext);

  const getTvShowsCategories = async (): Promise<Category[]> => {
    const response = await axios.get(`${BASE_URL}series-category`, {
      headers: {
        "Content-Type": "application/json",
        deviceId: activePlaylist?.device_id,
        playlistid: activePlaylist?._id,
      },
    });

    return response.data.seriesCategories;
  };

  return useQuery({
    queryKey: [QUERY_KEYS.tvShowsCategories],
    queryFn: getTvShowsCategories,
  });
};

export default useGetTvShowsCategories;
