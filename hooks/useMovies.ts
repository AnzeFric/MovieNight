import { MovieService } from "@/database/services/MovieService";
import { MovieInfo } from "@/interfaces/movie";
import { Alert } from "react-native";

export function useMovies() {
  const fetchMovies = async () => {
    try {
      const movies = await MovieService.fetchMovies();
      return movies;
    } catch (error) {
      console.error("Error while fetching data: ", error);
      Alert.alert(
        "Error",
        "An error occured while fetching data. Try again later."
      );
    }
  };

  const createMovie = async (movieData: MovieInfo) => {
    try {
      await MovieService.createMovie(movieData);
      const movies = await fetchMovies();

      return movies;
    } catch (error) {
      console.error("Error while saving data: ", error);
      Alert.alert(
        "Error",
        "An error occured while saving data. Try again later."
      );
    }
  };

  const deleteMovie = async (movieUuid: string) => {
    try {
      await MovieService.deleteMovie(movieUuid);
      const movies = await fetchMovies();

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
    fetchMovies,
    createMovie,
    deleteMovie,
  };
}
