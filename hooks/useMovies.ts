import { MovieService } from "@/database/services/MovieService";
import { Alert } from "react-native";

export function useMovies() {
  const fetchMovies = async () => {
    try {
      const movies = await MovieService.fetchMovies();
      return movies;
    } catch (error) {
      console.error("Error while fetching movies: ", error);
      Alert.alert(
        "Error",
        "An error occured while fetching data. Try again later."
      );
    }
  };

  return {
    fetchMovies,
  };
}
