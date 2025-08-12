import CustomText from "@/components/global/CustomText";
import MovieItem from "@/components/watchlist/index/MovieItem";
import { useMovies } from "@/hooks/useMovies";
import useMovieStore from "@/stores/useMovieStore";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function WatchedScreen() {
  const { watchedMovies, watchlistMovies, setWatchedMovies } = useMovieStore();
  const { fetchWatchedMovies } = useMovies();

  useEffect(() => {
    const updateWatchedMovies = async () => {
      const fetchedMovies = await fetchWatchedMovies();
      setWatchedMovies(fetchedMovies ? fetchedMovies : []);
    };
    updateWatchedMovies();
  }, [watchlistMovies]);

  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      <CustomText type={"lTitle"} bold>
        Watched
      </CustomText>
      <View style={{ gap: 8 }}>
        {watchedMovies.map((movie, index) => (
          <MovieItem movie={movie} key={index} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    gap: 30,
  },
});
