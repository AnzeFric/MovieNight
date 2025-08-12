import { MovieInfo } from "@/interfaces/movie";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MovieStore {
  watchedMovies: Array<MovieInfo>;
  watchlistMovies: Array<MovieInfo>;
  setWatchedMovies: (customers: Array<MovieInfo>) => void;
  setWatchlistMovies: (customers: Array<MovieInfo>) => void;
  reset: () => void;
}

const initialState = {
  watchedMovies: [],
  watchlistMovies: [],
};

const useMovieStore = create(
  persist<MovieStore>(
    (set) => ({
      ...initialState,
      setWatchedMovies: (watchedMovies: Array<MovieInfo>) => {
        set({ watchedMovies: watchedMovies });
      },
      setWatchlistMovies: (watchlistMovies: Array<MovieInfo>) => {
        set({ watchlistMovies: watchlistMovies });
      },
      reset: async () => {
        set(() => ({ ...initialState }));
        useMovieStore.persist.clearStorage();
      },
    }),
    {
      name: "movieStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useMovieStore;
