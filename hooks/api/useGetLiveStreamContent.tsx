import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useAsyncStorage } from "../useAsyncStorage";

import type { LiveStream } from "@/types";

import { BASE_URL } from "@/constants/api";
import { QUERY_KEYS, STORAGE_KEYS } from "@/constants";

const useGetLiveStreamContent = () => {
  const storage = useAsyncStorage();
  const deviceId = storage.getItem(STORAGE_KEYS.deviceId);

  const getLiveStreamContent = async ({ queryKey }: { queryKey: string[] }): Promise<LiveStream[]> => {
    const categoryId = queryKey[1];

    const response = await axios.get(`${BASE_URL}live-stream?category_id=${categoryId}`, {
      headers: {
        "Content-Type": "application/json",
        "device-id": await deviceId,
      },
    });

    return response.data.categories;
  };

  return useQuery({
    queryKey: [QUERY_KEYS.liveStreamContent],
    queryFn: getLiveStreamContent,
  });
};

export default useGetLiveStreamContent;