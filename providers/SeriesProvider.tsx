import React, { createContext, useState } from "react";

const initialContetxt: {
  activeSeriesDetails: {} | null;
  setActiveSeriesDetails: (movie: {} | null) => void;
} = {
  activeSeriesDetails: null,
  setActiveSeriesDetails: () => {},
};

export const SeriesContext = createContext(initialContetxt);

export const SeriesProvider = ({ children }: any) => {
  const [activeSeriesDetails, setActiveSeriesDetails] = useState<{} | null>({});

  return (
    <SeriesContext.Provider
      value={{
        activeSeriesDetails,
        setActiveSeriesDetails,
      }}
    >
      {children}
    </SeriesContext.Provider>
  );
}