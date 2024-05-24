import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { BASE_URL } from "@/constants/api";
import { TabParamList } from "@/constants/types";
import { DeviceContext } from "@/providers/DeviceProvider";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";

export interface MoviesProps {
  navigation: BottomTabScreenProps<TabParamList, "Movies">;
  route: RouteProp<TabParamList, "Movies">;
}

const MoviesTab: React.FC<MoviesProps> = ({ navigation, route }) => {
  const deviceId = useContext(DeviceContext);
  // console.log(deviceId);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!deviceId || typeof deviceId !== "string") {
        throw new Error("Invalid device ID");
      }

      try {
        const response = await fetch(`${BASE_URL}vod-stream-category`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            device_id: deviceId,
          },
        });

        // if (!response.ok) {
        //   throw new Error(
        //     `Network response was not ok: ${response.statusText}`
        //   );
        // }

        const jsonData = await response.json();
        console.log(jsonData);
        // setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [deviceId]);

  if (isLoading)
    return <CustomText style={{ color: "black" }}>Loading...</CustomText>;
  if (error)
    return (
      <CustomText style={{ color: "black" }}>Error: {error.message}</CustomText>
    );

  console.log("API Response:", data);

  return (
    <CustomView
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background,
        height: "100%",
      }}
    >
      <CustomText type="title" style={{ textAlign: "center" }}>
        Movies Tab
      </CustomText>
    </CustomView>
  );
};
export default MoviesTab;
