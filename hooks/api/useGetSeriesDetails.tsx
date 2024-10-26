import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PlaylistContext } from "@/providers/PlaylistProvider";

import type { SeriesResponse, Show } from "@/types";

import { BASE_URL } from "@/constants/api";
import { QUERY_KEYS } from "@/constants";

const useGetSeriesDetails = (SeriesId: number) => {
  const { activePlaylist } = useContext(PlaylistContext);

  const getSeriesDetails = async () => {
    const response = await axios.get<{ seriesInfo: SeriesResponse }>(
      `${BASE_URL}series-info?series_id=${SeriesId}`,
      {
        headers: {
          "Content-Type": "application/json",
          deviceid: activePlaylist?.device_id,
          playlistid: activePlaylist?._id,
        },
      }
    );

    return response.data.seriesInfo;
  };

  return useQuery({
    queryKey: [QUERY_KEYS.seriesDetails, SeriesId],
    queryFn: getSeriesDetails,
  });
};

export default useGetSeriesDetails;
