import { MovieInfo } from "@/interfaces/movie";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MovieStore {
  movies: Array<MovieInfo>;
  setMovies: (customers: Array<MovieInfo>) => void;
  reset: () => void;
}

const initialState = {
  movies: [],
};

const useMovieStore = create(
  persist<MovieStore>(
    (set) => ({
      ...initialState,
      setMovies: (movies: Array<MovieInfo>) => {
        set({ movies: movies });
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
