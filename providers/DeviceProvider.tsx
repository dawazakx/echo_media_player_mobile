import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ReactChildrenProps } from "@/types";

import { STORAGE_KEYS } from "@/constants";

type InitialContextProps = {
  deviceId: null | string;
  setDeviceId: Dispatch<SetStateAction<null | string>>;
}

const initialContext: InitialContextProps = {
  deviceId: null,
  setDeviceId: () => {},
};

export const DeviceContext = createContext(initialContext);

export const DeviceProvider = ({ children }: ReactChildrenProps) => {
  const [deviceId, setDeviceId] = useState<null | string>(null);

  useEffect(() => {
    AsyncStorage
      .getItem(STORAGE_KEYS.deviceId)
      .then((value) => {
        if (value) {
          setDeviceId(value);
        }
      })
  }, []);

  useEffect(() => {
    if(deviceId !== initialContext.deviceId) {
      AsyncStorage.setItem(STORAGE_KEYS.deviceId, deviceId || "");
    }
  }, [deviceId]);

  return (
    <DeviceContext.Provider value={{ deviceId, setDeviceId }}>
      {children}
    </DeviceContext.Provider>
  );
};
