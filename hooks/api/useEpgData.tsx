import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PlaylistContext } from "@/providers/PlaylistProvider";

import type { LiveStream } from "@/types";

import { BASE_URL } from "@/constants/api";
import { QUERY_KEYS } from "@/constants";

const useEpgData = ({ channelId }: { channelId: string }) => {
  const { activePlaylist } = useContext(PlaylistContext);

  const getLiveStreamEpg = async () => {
    const response = await axios.get(
      `${BASE_URL}live-stream-epg?channelId=${channelId}`,
      {
        headers: {
          "Content-Type": "application/json",
          deviceid: activePlaylist?.device_id,
          playlistid: activePlaylist?._id,
        },
      }
    );

    return response.data.epgData;
  };

  return useQuery({
    queryKey: [QUERY_KEYS.liveStreamEpg],
    queryFn: getLiveStreamEpg,
  });
};

export default useEpgData;
