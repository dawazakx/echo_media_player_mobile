export interface Category {
  category_id: string;
  category_name: string;
  parent_id: number;
}

export type Movie = {
  added: Date;
  category_id: string;
  category_name: string;
  container_extension: string;
  custom_sid: string;
  direct_source: string;
  epg_channel_id: string;
  stream_icon: string;
  stream_id: number;
  url: string;
  name: string;
  num: number;
  rating: number;
  rating_5based: number;
  tv_archive: number;
  tv_archive_duration: number;
  stream_type: string;
  tmdb: string;
};
export type Show = {
  num: number;
  releaseDate: Date;
  category_id: string;
  category_ids: string[];
  genre: string;
  youtube_trailer: string;
  cover: string;
  plot: string;
  last_modified: string;
  cast: string;
  series_id: number;
  director: string;
  name: string;
  rating: number;
  rating_5based: number;
  episode_run_time: number;
  backdrop_path: string[];
  tmdb: string;
};

export interface EpisodeInfo {
  air_date: string;
  crew: string;
  rating: number;
  id: number;
  movie_image: string;
}

export interface Episode {
  id: string;
  episode_num: number;
  title: string;
  container_extension: string;
  info: EpisodeInfo;
  custom_sid: string | null;
  added: string;
  season: number;
  direct_source: string;
}

export interface Episodes {
  [seasonNumber: string]: Episode[];
}

export interface Season {
  name: string;
  episode_count: string;
  overview: string;
  air_date: string;
  cover: string;
  cover_tmdb: string;
  season_number: number;
  cover_big: string;
  releaseDate: string;
  duration: string;
}

export interface Info {
  name: string;
  cover: string;
  plot: string;
  cast: string;
  director: string;
  genre: string;
  releaseDate: string;
  last_modified: string;
  rating: string;
  rating_5based: string;
  backdrop_path: string[];
  tmdb: string;
  youtube_trailer: string;
  episode_run_time: string;
  category_id: string;
  category_ids: number[];
}

export interface SeriesResponse {
  seasons: Season[];
  info: Info;
  episodes: Episodes;
}

export type LiveStream = {
  num: number;
  name: string;
  stream_type: string;
  stream_id: number;
  stream_icon: string;
  epg_channel_id: string;
  added: string;
  is_adult: number;
  category_id: string;
  category_name: string;
  category_ids: number[];
  custom_sid: string | number | null;
  tv_archive: number;
  direct_source: string;
  tv_archive_duration: number;
};

export type ReactChildrenProps = {
  children: string | JSX.Element | JSX.Element[];
};
