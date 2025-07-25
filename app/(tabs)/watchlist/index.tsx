import CustomText from "@/components/global/CustomText";
import PlusButton from "@/components/global/PlusButton";
import MovieItem from "@/components/watchlist/index/MovieItem";
import { Colors } from "@/constants/Colors";
import { useMovies } from "@/hooks/useMovies";
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

// TODO: Filtriranje in search bar
export default function WatchListScreen() {
  const { fetchMovies, deleteMovies } = useMovies();
  const { movies, setMovies } = useMovieStore();

  const [showActionBar, setShowActionBar] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState<Array<string>>([]);

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
    const updatedMovies = await deleteMovies(selectedMovies);
    if (updatedMovies) {
      setMovies(updatedMovies);
    }
    setSelectedMovies([]);
    setShowActionBar(false);
  };

  useEffect(() => {
    const inititializeMovies = async () => {
      const fetchedMovies = await fetchMovies();
      setMovies(fetchedMovies ? fetchedMovies : []);
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
        <View style={{ gap: 8 }}>
          {movies.map((movie, index) => (
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
        <TouchableOpacity style={styles.actionItem} onPress={() => {}}>
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
