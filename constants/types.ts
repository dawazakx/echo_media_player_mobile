import { Movie } from "@/types";

export type RootStackParamList = {
  Welcome: undefined;
  Playlist: undefined;
  Home: undefined;
  Search: undefined;
};

export type PlaylistStackParamList = {
  AddPlaylist: undefined;
  SelectPlaylist: undefined;
  xtreme: undefined;
  m3u: undefined;
  local: undefined;
};

export type TabParamList = {
  LiveTV: undefined;
  Movies: undefined;
  TvShows: undefined;
  Sports: undefined;
  Settings: undefined;
};

export type MoviesStackParamList = {
  MoviesList: undefined;
  AllMovies: undefined;
  MovieDetails: { movie: Movie };
  VideoPlayer: { streamUrl: string };
};
export type SettingsStackParamList = {
  index: undefined;
  About: undefined;
  Manage: undefined;
  Profile: undefined;
  Terms: undefined;
  Support: undefined;
};
