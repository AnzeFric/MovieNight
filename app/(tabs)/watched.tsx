import CustomText from "@/components/global/CustomText";
import ModalPrompt from "@/components/global/ModalPrompt";
import SearchBar from "@/components/global/SearchBar";
import MovieItem from "@/components/watchlist/index/MovieItem";
import { useMovies } from "@/hooks/useMovies";
import { MovieInfo } from "@/interfaces/movie";
import useMovieStore from "@/stores/useMovieStore";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function WatchedScreen() {
  const { watchedMovies, watchlistMovies, setWatchedMovies } = useMovieStore();
  const { fetchWatchedMovies, deleteMovies } = useMovies();

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [searchText, setSearchText] = useState("");

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

  const filteredData: Array<MovieInfo> = useMemo(() => {
    if (searchText.trim() === "") return watchedMovies;

    return watchedMovies.filter((movie) => {
      const searchLower = searchText.toLowerCase();

      const movieMatch =
        movie.name.toLowerCase().includes(searchLower) ||
        movie.length?.toString().includes(searchLower) ||
        movie.rating?.toString().includes(searchLower) ||
        movie.year?.toString().includes(searchLower) ||
        movie.description?.toLowerCase().includes(searchLower) ||
        movie.picker?.toLowerCase().includes(searchLower) ||
        movie.watchedDate?.toLocaleString().includes(searchLower) ||
        movie.director?.firstname?.toLowerCase().includes(searchLower) ||
        movie.director?.lastname?.toLowerCase().includes(searchLower);

      const genreMatch = movie.genres?.some((genre) =>
        genre.toLowerCase().includes(searchLower)
      );

      return movieMatch || genreMatch;
    });
  }, [watchedMovies, searchText]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomText type={"lTitle"} bold>
          Watched
        </CustomText>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <View style={{ gap: 8 }}>
          {filteredData.map((movie, index) => (
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
