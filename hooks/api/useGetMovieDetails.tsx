import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { Movie, Show } from "@/types";

import { TMDB_API_KEY } from "@/constants/api";
import { QUERY_KEYS } from "@/constants";

const useGetMovieDetails = (movie: Movie) => {
  const getMovieInfo = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie.tmdb}`,
      {
        headers: {
          accept: "application/json",
          Authorization: TMDB_API_KEY,
        },
      }
    );

    return response.data;
  };
  const getMovieCast = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie.tmdb}/credits`,
      {
        headers: {
          accept: "application/json",
          Authorization: TMDB_API_KEY,
        },
      }
    );

    return response.data;
  };
  const getMovieVideos = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie.tmdb}/videos`,
      {
        headers: {
          accept: "application/json",
          Authorization: TMDB_API_KEY,
        },
      }
    );

    return response.data;
  };

  return useQuery({
    queryKey: [QUERY_KEYS.movieDetails],
    queryFn: async () => {
      const [movieInfo, movieCast, movieVideos] = await Promise.all([
        getMovieInfo(),
        getMovieCast(),
        getMovieVideos(),
      ]);
      return { movieInfo, movieCast, movieVideos };
    },
  });
};

export default useGetMovieDetails;
