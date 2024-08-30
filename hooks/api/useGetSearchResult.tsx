import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PlaylistContext } from "@/providers/PlaylistProvider";

import { BASE_URL } from "@/constants/api";
import { QUERY_KEYS } from "@/constants";

const useGetSearchResult = (query: string, searchInitiated: boolean) => {
  const { activePlaylist } = useContext(PlaylistContext);

  const getMovieResult = async () => {
    const response = await axios.get(`${BASE_URL}search-vod?name=${query}`, {
      headers: {
        "Content-Type": "application/json",
        deviceid: activePlaylist?.device_id,
        playlistid: activePlaylist?._id,
      },
    });

    return response.data.vod;
  };
  const getLiveTvResult = async () => {
    const response = await axios.get(`${BASE_URL}search-livetv?name=${query}`, {
      headers: {
        "Content-Type": "application/json",
        deviceid: activePlaylist?.device_id,
        playlistid: activePlaylist?._id,
      },
    });

    return response.data.liveTV;
  };
  // const getTvShowsResult = async () => {
  //   const response = await axios.get(
  //     `${BASE_URL}search-livetv?name=${query}`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         deviceid: activePlaylist?.device_id,
  //         playlistid: activePlaylist?._id,
  //       },
  //     }
  //   );

  //   return response.data.liveTV;
  // };

  return useQuery({
    queryKey: [QUERY_KEYS.searchResult, query],
    queryFn: async () => {
      const [movieResult, liveTvResult] = await Promise.all([
        getMovieResult(),
        getLiveTvResult(),
        // getTvShowsResult(),
      ]);
      return { movieResult, liveTvResult };
    },
    enabled: searchInitiated && query.length > 0,
  });
};

export default useGetSearchResult;
