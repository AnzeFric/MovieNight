import CustomText from "@/components/global/CustomText";
import PlusButton from "@/components/global/PlusButton";
import MovieItem from "@/components/watchlist/index/MovieItem";
import { useMovies } from "@/hooks/useMovies";
import useMovieStore from "@/stores/useMovieStore";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function WatchListScreen() {
  const { fetchMovies } = useMovies();
  const { movies, setMovies } = useMovieStore();

  const redirectToAddMovie = () => {
    router.push("/(tabs)/watchlist/add");
  };

  useEffect(() => {
    const inititializeMovies = async () => {
      const fetchedMovies = await fetchMovies();
      setMovies(fetchedMovies ? fetchedMovies : []);
    };
    inititializeMovies();
  }, []);

  return (
    <View style={styles.container}>
      <CustomText type={"lTitle"} bold>
        Watchlist
      </CustomText>
      <View style={{ gap: 8 }}>
        {movies.map((movie, index) => (
          <MovieItem movie={movie} key={index} />
        ))}
      </View>
      <PlusButton onPress={redirectToAddMovie} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    flex: 1,
    gap: 15,
  },
});
