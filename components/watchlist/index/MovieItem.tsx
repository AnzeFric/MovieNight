import CustomText from "@/components/global/CustomText";
import { Colors } from "@/constants/Colors";
import { MovieInfo } from "@/interfaces/movie";
import { StyleSheet, View } from "react-native";

interface Props {
  movie: MovieInfo;
}

export default function MovieItem({ movie }: Props) {
  const getReleaseYear = (year: number | null) => {
    if (!year) return;
    return `, ${year}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <CustomText type={"normal"} bold>
          {movie.name}
        </CustomText>
        <CustomText type={"small"}>{getReleaseYear(movie.year)}</CustomText>
      </View>
      <View style={styles.genreContainer}>
        {movie.genres?.map((genre, index) => (
          <View style={styles.genre} key={index}>
            <CustomText type={"extraSmall"}>{genre}</CustomText>
          </View>
        ))}
      </View>
    </View>
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
