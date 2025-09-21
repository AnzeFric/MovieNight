export interface MovieInfo {
  uuid: string;
  name: string;
  length: number | null; // min
  rating: number | null;
  year: number | null;
  genres: Array<Genre> | null;
  director: Person | null;
  description: string | null;
  picker: string; // Who chose the movie
  watchedDate: Date | null;
}

export interface Person {
  firstname: string;
  lastname: string;
}

export const genresArray = [
  "action",
  "adventure",
  "animation",
  "anime",
  "biography",
  "cartoon",
  "comedy",
  "crime",
  "cyberpunk",
  "darkComedy",
  "documentary",
  "drama",
  "ecchi",
  "educational",
  "erotic",
  "experimental",
  "fantasy",
  "family",
  "gameShow",
  "gore",
  "harem",
  "historical",
  "horror",
  "idol",
  "isekai",
  "josei",
  "legal",
  "magicalGirl",
  "martialArts",
  "mecha",
  "military",
  "mockumentary",
  "mystery",
  "music",
  "musical",
  "neoNoir",
  "noir",
  "parody",
  "political",
  "postApocalyptic",
  "procedural",
  "psychological",
  "reality",
  "reverseHarem",
  "romance",
  "romcom",
  "sciFi",
  "seinen",
  "shonen",
  "shojo",
  "sitcom",
  "sketchComedy",
  "sliceOfLife",
  "soapOpera",
  "spaceOpera",
  "sports",
  "supernatural",
  "survival",
  "talkShow",
  "teen",
  "thriller",
  "timeTravel",
  "tournament",
  "war",
  "western",
  "yaoi",
  "yuri",
  "zombie",
];

export type Genre = (typeof genresArray)[number];
