import CustomText from "@/components/global/CustomText";
import AddMovieForm from "@/components/watchlist/AddMovieForm";
import { MovieInfo } from "@/interfaces/movie";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

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
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 50}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <CustomText type={"lTitle"} bold>
          Add a movie
        </CustomText>
        <AddMovieForm setMovie={setMovie} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    gap: 20,
    flexGrow: 1,
  },
});
