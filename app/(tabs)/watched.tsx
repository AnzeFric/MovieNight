import CustomText from "@/components/global/CustomText";
import ModalPrompt from "@/components/global/ModalPrompt";
import SearchBar from "@/components/global/SearchBar";
import MovieItem from "@/components/watchlist/index/MovieItem";
import { useMovies } from "@/hooks/useMovies";
import useMovieStore from "@/stores/useMovieStore";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function WatchedScreen() {
  const { watchedMovies, watchlistMovies, setWatchedMovies } = useMovieStore();
  const { fetchWatchedMovies, deleteMovies } = useMovies();

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState("");

  useEffect(() => {
    const updateWatchedMovies = async () => {
      const fetchedMovies = await fetchWatchedMovies();
      setWatchedMovies(fetchedMovies ? fetchedMovies : []);
    };
    updateWatchedMovies();
  }, [watchlistMovies]);

  const onLongPress = (movieUuid: string) => {
    setShowModal(true);
    setSelectedMovie(movieUuid);
  };

  const onCofirm = async () => {
    const fetchWatched = true;
    const updatedMovies = await deleteMovies([selectedMovie], fetchWatched);

    setWatchedMovies(updatedMovies ? updatedMovies : []);
    setSelectedMovie("");
    setShowModal(false);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomText type={"lTitle"} bold>
          Watched
        </CustomText>
        <SearchBar />
        <View style={{ gap: 8 }}>
          {watchedMovies.map((movie, index) => (
            <MovieItem
              movie={movie}
              onLongPress={() => {
                onLongPress(movie.uuid);
              }}
              key={index}
            />
          ))}
        </View>
      </ScrollView>
      <ModalPrompt
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        onConfirm={onCofirm}
        message={"Permanently delete watched movie?"}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    gap: 30,
  },
});
