import { MovieService } from "@/database/services/MovieService";
import { MovieInfo } from "@/interfaces/movie";
import { Alert } from "react-native";

export function useMovies() {
  const fetchWatchedMovies = async () => {
    try {
      const movies = await MovieService.fetchWatchedMovies();
      return movies;
    } catch (error) {
      console.error("Error while fetching watched data: ", error);
      Alert.alert(
        "Error",
        "An error occured while fetching watched data. Try again later."
      );
    }
  };

  const fetchWatchlistMovies = async () => {
    try {
      const movies = await MovieService.fetchWatchlistMovies();
      return movies;
    } catch (error) {
      console.error("Error while fetching watchlist data: ", error);
      Alert.alert(
        "Error",
        "An error occured while fetching watchlist data. Try again later."
      );
    }
  };

  const createMovie = async (movieData: MovieInfo) => {
    try {
      await MovieService.createMovie(movieData);
      const movies = await fetchWatchlistMovies();

      return movies;
    } catch (error) {
      console.error("Error while saving data: ", error);
      Alert.alert(
        "Error",
        "An error occured while saving data. Try again later."
      );
    }
  };

  const deleteMovies = async (moviesUuid: Array<string>) => {
    try {
      await Promise.all(
        moviesUuid.map(async (uuid) => {
          await MovieService.deleteMovie(uuid);
        })
      );
      const movies = await fetchWatchlistMovies();

      return movies;
    } catch (error) {
      console.error("Error while deleting data: ", error);
      Alert.alert(
        "Error",
        "An error occured while deleting data. Try again later."
      );
    }
  };

  return {
    fetchWatchlistMovies,
    fetchWatchedMovies,
    createMovie,
    deleteMovies,
  };
}
