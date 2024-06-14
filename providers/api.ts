import axios from "axios";

import { BASE_URL } from "@/constants/api";

import { type Category, type LiveStream, type Movie } from "@/types";

export const fetchLiveStreamCategories = async (
  deviceId: string | null
): Promise<Category[]> => {
  if (!deviceId || typeof deviceId !== "string") {
    throw new Error("Invalid device ID");
  }
  try {
    const response = await axios.get(`${BASE_URL}live-stream-category`, {
      headers: {
        "Content-Type": "application/json",
        "device-id": deviceId,
      },
    });
    return response.data.categories;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchLiveStreams = async (
  deviceId: string | null,
  categories: Category[]
): Promise<{ [key: string]: LiveStream[] }> => {
  try {
    const allStreams = await Promise.all(
      categories.map(async (category) => {
        const response = await axios.get(
          `${BASE_URL}live-stream?category_id=${category.category_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "device-id": deviceId,
            },
          }
        );
        return {
          [category.category_id]: {
            ...response.data.streams,
            category_name: category.category_name,
          },
        };
      })
    );

    return allStreams.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const fetchCategories = async (
  deviceId: string | null
): Promise<Category[]> => {
  if (!deviceId || typeof deviceId !== "string") {
    throw new Error("Invalid device ID");
  }
  try {
    const response = await axios.get(`${BASE_URL}vod-stream-category`, {
      headers: {
        "Content-Type": "application/json",
        "device-id": deviceId,
      },
    });
    return response.data.vodCategories;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchAllMovies = async (
  deviceId: string | null,
  categories: Category[]
) => {
  try {
    const allMovies = await Promise.all(
      categories.map(async (category) => {
        const response = await axios.get<{ streams: Movie[] }>(
          `${BASE_URL}vod-stream?category_id=${category.category_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "device-id": deviceId,
            },
          }
        );
        return { [category.category_id]: response.data.streams };
      })
    );
    return allMovies.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const fetchStreamUrl = async (
  deviceId: string | null,
  movie: Movie
): Promise<string | null> => {
  if (!deviceId || typeof deviceId !== "string") {
    throw new Error("Invalid device ID");
  }

  if (!movie.stream_id || !movie.container_extension) {
    throw new Error("Invalid movie details");
  }

  try {
    const response = await axios.get(
      `${BASE_URL}stream-url?stream_id=${movie.stream_id}&stream_extension=${movie.container_extension}`,
      {
        headers: {
          "Content-Type": "application/json",
          "device-id": deviceId,
        },
      }
    );
    console.log("Stream URL response:", response.data);
    return response.data.streamURL;
  } catch (error) {
    console.error(error);
    return null; // Return null in case of error
  }
};
export const searchLiveTV = async (deviceId: string | null, query: string) => {
  if (!deviceId || typeof deviceId !== "string") {
    throw new Error("Invalid device ID");
  }
  try {
    const response = await axios.get(`${BASE_URL}search-livetv?name=${query}`, {
      headers: {
        "Content-Type": "application/json",
        "device-id": deviceId,
      },
    });
    return response.data.liveTV;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchMovies = async (deviceId: string | null, query: string) => {
  if (!deviceId || typeof deviceId !== "string") {
    throw new Error("Invalid device ID");
  }
  try {
    const response = await axios.get(`${BASE_URL}search-vod?name=${query}`, {
      headers: {
        "Content-Type": "application/json",
        "device-id": deviceId,
      },
    });
    return response.data.vod;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchMoviesByCategory = async (
  deviceId: string,
  categoryId: string
) => {
  try {
    const response = await axios.get<{ streams: Movie[] }>(
      `${BASE_URL}vod-stream?category_id=${categoryId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "device-id": deviceId,
        },
      }
    );
    return response.data.streams;
  } catch (error) {
    console.error(error);
    return [];
  }
};
