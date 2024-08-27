import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PlaylistContext } from "@/providers/PlaylistProvider";

import type { Show } from "@/types";

import { BASE_URL } from "@/constants/api";
import { QUERY_KEYS } from "@/constants";

const useGetTvShowsContent = () => {
  const { activePlaylist } = useContext(PlaylistContext);

  const getTvShowsContent = async (): Promise<Show[]> => {
    const response = await axios.get(
      `${BASE_URL}series-streams?category_id=${""}`,
      {
        headers: {
          "Content-Type": "application/json",
          deviceid: activePlaylist?.device_id,
          playlistid: activePlaylist?._id,
        },
      }
    );

    return response.data.series;
  };

  return useQuery({
    queryKey: [QUERY_KEYS.tvShowsContent],
    queryFn: getTvShowsContent,
  });
};

export default useGetTvShowsContent;
