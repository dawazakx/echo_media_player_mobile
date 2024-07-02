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

"num": 1,
            "name": "القديسة",
            "series_id": 3671,
            "cover": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/jIWI3n2OvVGZ9mnoZPNAoRMjQVb.jpg",
            "plot": "قصة جديدة فريدة من نوعها مصنفة رعب",
            "cast": "Tamila Sinan, Haider Abo AlAbbas, Hafez Laeeby, Tayseer Ahmed, Batoul Aziz, Nour Ghandour, Ghaith Abbas, Saif Ghazi",
            "director": "Muhannad Abu Khumra",
            "genre": "جريمة",
            "releaseDate": "",
            "last_modified": "1718920563",
            "rating": "6",
            "rating_5based": "3",
            "backdrop_path": [
                "https://image.tmdb.org/t/p/w1280/4eGfZuZMINj9lZoqqMOxqm6teTi.jpg",
                "https://image.tmdb.org/t/p/w1280/kAVu6PHz2dEAVjNkPmHyh94kdbZ.jpg"
            ],
            "youtube_trailer": "",
            "tmdb": "248478",
            "episode_run_time": "0",
            "category_id": "580",
            "category_ids": [
                580
            ]

export type LiveStream = {
  num: number,
  name: string,
  stream_type: string,
  stream_id: number,
  stream_icon: string,
  epg_channel_id: string,
  added: string,
  is_adult: number,
  category_id: string,
  category_name: string,
  category_ids: number[],
  custom_sid: string | number | null,
  tv_archive: number,
  direct_source: string,
  tv_archive_duration: number
};
