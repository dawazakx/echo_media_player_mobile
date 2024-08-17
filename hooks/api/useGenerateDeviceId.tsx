import { useMutation } from '@tanstack/react-query';
import axios from "axios";

import { useAsyncStorage } from "@/hooks/useAsyncStorage";

import { BASE_URL } from "@/constants/api";
import { STORAGE_KEYS } from "@/constants";

type GenerateDeviceIdPayload = {
  type: string;
  os: string;
};

type GenerateDeviceIdResponse = {
  device: string;
};

const useGenerateDeviceId = () => {
  const storage = useAsyncStorage();
  const generateDeviceId = async ({ type, os }: GenerateDeviceIdPayload): Promise<GenerateDeviceIdResponse | undefined> => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${BASE_URL}generate-device-id`,
        data: JSON.stringify({
          type, 
          os
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  return useMutation({
    mutationFn: generateDeviceId,
    onSuccess: async (data) => {
      if(data) {
        storage.setItem(STORAGE_KEYS.deviceId, data?.device);
      }
    },
    onError: (error) => {
      console.error("error", error);
    }
  });
}

export default useGenerateDeviceId;