import CustomText from "@/components/global/CustomText";
import AddMovieForm from "@/components/watchlist/AddMovieForm";
import { MovieInfo } from "@/interfaces/movie";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

const defaultMovieInfo: MovieInfo = {
  name: "",
};

// TODO?: Vpišeš link pa ti vzame podatke avtomatsko
export default function AddMovie() {
  const [movie, setMovie] = useState<MovieInfo>(defaultMovieInfo);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setMovie(defaultMovieInfo);
      };
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomText type={"lTitle"} bold>
        Add a movie
      </CustomText>
      <AddMovieForm setMovie={setMovie} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    gap: 20,
  },
});
