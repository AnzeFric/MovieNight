import CustomText from "@/components/global/CustomText";
import PlusButton from "@/components/global/PlusButton";
import MovieItem from "@/components/watchlist/index/MovieItem";
import { Colors } from "@/constants/Colors";
import { useMovies } from "@/hooks/useMovies";
import useMovieStore from "@/stores/useMovieStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function WatchListScreen() {
  const { fetchMovies } = useMovies();
  const { movies, setMovies } = useMovieStore();

  const [showActionBar, setShowActionBar] = useState(false);

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
    <>
      <View style={styles.container}>
        <CustomText type={"lTitle"} bold>
          Watchlist
        </CustomText>
        <View style={{ gap: 8 }}>
          {movies.map((movie, index) => (
            <MovieItem
              movie={movie}
              setShowActionBar={setShowActionBar}
              key={index}
            />
          ))}
        </View>
        <PlusButton enabled={!showActionBar} onPress={redirectToAddMovie} />
      </View>
      {showActionBar && (
        <View style={styles.actionBar}>
          <TouchableOpacity style={styles.actionItem} onPress={() => {}}>
            <Ionicons
              name={"checkmark"}
              size={30}
              color={Colors.dark.activeIcon}
            />
            <CustomText type="small">Watched</CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={() => {}}>
            <Ionicons
              name={"trash-outline"}
              size={30}
              color={Colors.dark.activeIcon}
            />
            <CustomText type="small">Delete</CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={() => {}}>
            <Ionicons
              name={"close-outline"}
              size={30}
              color={Colors.dark.activeIcon}
            />
            <CustomText type="small">Cancel</CustomText>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    flex: 1,
    gap: 15,
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
