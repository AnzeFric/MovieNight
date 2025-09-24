import CustomText from "@/components/global/CustomText";
import PlusButton from "@/components/global/PlusButton";
import SearchBar from "@/components/global/SearchBar";
import ModalSetRating from "@/components/watched/ModalSetRating";
import MovieItem from "@/components/watchlist/index/MovieItem";
import { Colors } from "@/constants/Colors";
import { useMovies } from "@/hooks/useMovies";
import { MovieInfo } from "@/interfaces/movie";
import useMovieStore from "@/stores/useMovieStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function WatchListScreen() {
  const { fetchWatchlistMovies, deleteMovies, setMoviesToWatched } =
    useMovies();
  const { watchlistMovies, setWatchlistMovies, setWatchedMovies } =
    useMovieStore();

  const [showActionBar, setShowActionBar] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState<Array<string>>([]);

  const [modalRating, setModalRating] = useState(false);
  const [moviesToRate, setMoviesToRate] = useState<Array<MovieInfo>>([]);

  const actionBarTranslateY = useRef(new Animated.Value(100)).current;
  const actionBarOpacity = useRef(new Animated.Value(0)).current;
  const plusButtonScale = useRef(new Animated.Value(1)).current;

  const redirectToAddMovie = () => {
    router.push("/(tabs)/watchlist/add");
  };

  const onPress = (uuid: string) => {
    setSelectedMovies((prev) =>
      prev.includes(uuid)
        ? prev.filter((selected) => selected !== uuid)
        : [...prev, uuid]
    );
  };

  const onLongPress = (uuid: string) => {
    setShowActionBar(true);
    onPress(uuid);
  };

  const cancelActionBar = () => {
    setSelectedMovies([]);
    setShowActionBar(false);
  };

  const deleteActionBar = async () => {
    const fetchWatched = false;
    const updatedMovies = await deleteMovies(selectedMovies, fetchWatched);

    setWatchlistMovies(updatedMovies ? updatedMovies : []);
    setSelectedMovies([]);
    setShowActionBar(false);
  };

  const watchedActionBar = async () => {
    setModalRating(true);

    const movies = watchlistMovies.filter((movie) =>
      selectedMovies.includes(movie.uuid)
    );
    setMoviesToRate(movies);
  };

  const confirmRatingModal = async (
    movieUuidRatings: Array<[string, number]>
  ) => {
    const watchedMovies = await setMoviesToWatched(movieUuidRatings);
    setWatchedMovies(watchedMovies ? watchedMovies : []);

    const updatedMovies = await fetchWatchlistMovies();
    setWatchlistMovies(updatedMovies ? updatedMovies : []);

    cancelRatingModal();
  };

  const cancelRatingModal = () => {
    setSelectedMovies([]);
    setShowActionBar(false);
    setModalRating(false);
  };

  useEffect(() => {
    const inititializeMovies = async () => {
      const fetchedMovies = await fetchWatchlistMovies();
      setWatchlistMovies(fetchedMovies ? fetchedMovies : []);
    };
    inititializeMovies();
  }, []);

  useEffect(() => {
    if (showActionBar) {
      // Action bar slides up and fades in
      Animated.parallel([
        Animated.timing(actionBarTranslateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(actionBarOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        // Plus button scales down and fades
        Animated.timing(plusButtonScale, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Action bar slides down and fades out
      Animated.parallel([
        Animated.timing(actionBarTranslateY, {
          toValue: 100,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(actionBarOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        // Plus button scales back up
        Animated.timing(plusButtonScale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showActionBar]);

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          showActionBar && { paddingBottom: 80 },
        ]}
      >
        <CustomText type={"lTitle"} bold>
          Watchlist
        </CustomText>
        <SearchBar />
        <View style={{ gap: 8 }}>
          {watchlistMovies.map((movie, index) => (
            <MovieItem
              movie={movie}
              showActionBar={showActionBar}
              selected={selectedMovies.includes(movie.uuid)}
              onPress={() => onPress(movie.uuid)}
              onLongPress={() => onLongPress(movie.uuid)}
              key={index}
            />
          ))}
        </View>
      </ScrollView>
      <Animated.View
        style={{
          transform: [{ scale: plusButtonScale }],
        }}
      >
        <PlusButton enabled={!showActionBar} onPress={redirectToAddMovie} />
      </Animated.View>
      <Animated.View
        style={[
          styles.actionBar,
          {
            opacity: actionBarOpacity,
            transform: [{ translateY: actionBarTranslateY }],
          },
        ]}
        pointerEvents={showActionBar ? "auto" : "none"}
      >
        <TouchableOpacity style={styles.actionItem} onPress={watchedActionBar}>
          <Ionicons
            name={"checkmark"}
            size={20}
            color={Colors.dark.activeIcon}
          />
          <CustomText type="small">Watched</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem} onPress={deleteActionBar}>
          <Ionicons
            name={"trash-outline"}
            size={20}
            color={Colors.dark.activeIcon}
          />
          <CustomText type="small">Delete</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem} onPress={cancelActionBar}>
          <Ionicons
            name={"close-circle-outline"}
            size={20}
            color={Colors.dark.activeIcon}
          />
          <CustomText type="small">Cancel</CustomText>
        </TouchableOpacity>
      </Animated.View>

      <ModalSetRating
        visible={modalRating}
        movies={moviesToRate}
        onClose={cancelRatingModal}
        onConfirm={confirmRatingModal}
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
  actionBar: {
    height: 64,
    width: "100%",
    bottom: 0,
    backgroundColor: Colors.dark.background,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
