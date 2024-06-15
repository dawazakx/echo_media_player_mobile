export const BASE_URL =
  "https://shaky-work-tedious-island-beta.pipeops.app/api/v1/";

export const TMDB_API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OWRmYmJlZGRkNzAyYjI3NjMwNmFiMjM4MjEyZDU3NiIsInN1YiI6IjY2NTQ4YzUzYTFmYjA1MzBhMTAzZjMzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TCZ537IZMAdRfnzdci_F6A-HTtexodlFs2jF_0efebY";

export const image500 = (posterpath: string) =>
  posterpath ? "https://image.tmdb.org/t/p/w500" + posterpath : null;
