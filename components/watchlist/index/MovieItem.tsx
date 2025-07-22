import CustomText from "@/components/global/CustomText";
import { Colors } from "@/constants/Colors";
import { formatLength, formatReleaseYear } from "@/constants/Utils";
import { useMovies } from "@/hooks/useMovies";
import { MovieInfo } from "@/interfaces/movie";
import useMovieStore from "@/stores/useMovieStore";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  movie: MovieInfo;
  setShowActionBar: Dispatch<SetStateAction<boolean>>;
}

export default function MovieItem({ movie, setShowActionBar }: Props) {
  const { deleteMovie } = useMovies();
  const { setMovies } = useMovieStore();

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() => setShowActionBar(true)}
    >
      <View style={styles.title}>
        <CustomText type={"normal"} bold>
          {movie.name}
        </CustomText>
        <CustomText type={"small"}>{formatReleaseYear(movie.year)}</CustomText>
      </View>
      <CustomText type={"small"}>{formatLength(movie.length)}</CustomText>
      <View style={styles.genreContainer}>
        {movie.genres?.map((genre, index) => (
          <View style={styles.genre} key={index}>
            <CustomText type={"extraSmall"}>{genre}</CustomText>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    borderColor: Colors.dark.border,
    borderWidth: 0.5,
    backgroundColor: Colors.dark.secondaryBackground,
  },
  title: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginVertical: 10,
  },
  genre: {
    backgroundColor: Colors.dark.background,
    alignSelf: "flex-start",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});
