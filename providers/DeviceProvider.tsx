import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";

import { BASE_URL } from "../constants/api";

const initialContetxt: {
  deviceId: string | null;
  setDeviceId: (deviceId: string | null) => void;
} = {
  deviceId: null,
  setDeviceId: () => {},
};

export const DeviceContext = createContext(initialContetxt);

export const DeviceProvider = ({ children }) => {
  const [deviceId, setDeviceId] = useState(() => {
    const deviceId = AsyncStorage.getItem("@app:deviceId");
    return typeof deviceId === "string" ? deviceId : null;
  });

  const getDeviceId = async () => {
    try {
      const request = await fetch(`${BASE_URL}generate-device-id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceId: Device.isDevice ? Device.isDevice : null,
          type: "mobile",
          // os: Device.osName?.toLowerCase(),
          os: "android",
        }),
      });

      const response = await request.json();
      await AsyncStorage.setItem(
        "@app:deviceId",
        JSON.stringify(response?.device)
      );
      setDeviceId(response?.device);
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    if (!deviceId) {
      getDeviceId();
    }
  }, [deviceId]);

  return (
    <DeviceContext.Provider value={{ deviceId, setDeviceId }}>
      {children}
    </DeviceContext.Provider>
  );
};
