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

  const getLength = (length: number | null) => {
    if (!length) return;

    if (length < 60) {
      var str = `00:${length.toString().padStart(2, "0")}`;
    } else {
      const lengthH = Math.floor(length / 60);
      const lengthMin = Math.abs(length - 60 * Number(lengthH)).toString();
      var str = `${lengthH.toString().padStart(2, "0")}:${lengthMin.padStart(2, "0")}`;
    }
    return str;
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <CustomText type={"normal"} bold>
          {movie.name}
        </CustomText>
        <CustomText type={"small"}>{getReleaseYear(movie.year)}</CustomText>
      </View>
      <CustomText type={"small"}>{getLength(movie.length)}</CustomText>
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
