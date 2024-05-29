import { Movie } from "@/screens/tabs/MoviesTab";

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

export type DrawerParamList = {
  Categories: undefined;
  About: undefined;
  Manage: undefined;
  Premium: undefined;
  Privacy: undefined;
  Terms: undefined;
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
  MovieDetails: { movie: Movie };
  VideoPlayer: { streamUrl: string };
};
