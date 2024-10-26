import React, { createContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../constants/api";

const initialContetxt: {
  currentMovieDetails: {} | null;
  setCurrentMovieDetails: (movie: {} | null) => void;
} = {
  currentMovieDetails: null,
  setCurrentMovieDetails: () => {},
};

export const MoviesContext = createContext(initialContetxt);

export const MoviesProvider = ({ children }: any) => {
  const [currentMovieDetails, setCurrentMovieDetails] = useState<{} | null>(() => {
    const payload = AsyncStorage.getItem("@app:currentMovieDetails");
    return typeof payload === "object" ? payload : null;
  });

  return (
    <MoviesContext.Provider
      value={{
        currentMovieDetails,
        setCurrentMovieDetails,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}