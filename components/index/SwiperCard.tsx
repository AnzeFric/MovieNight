import { Colors } from "@/constants/Colors";
import { MovieInfo } from "@/interfaces/movie";
import { StyleSheet, View } from "react-native";
import CustomText from "../global/CustomText";

interface Props {
  movie: MovieInfo;
}

export default function SwiperCard({ movie }: Props) {
  return (
    <View style={styles.container}>
      <CustomText type="lTitle" bold>
        {movie.name}
      </CustomText>

      <View style={styles.contentContainer}>
        {movie.year && (
          <CustomText type={"small"}>Release year: {movie.year}</CustomText>
        )}
        {movie.picker && (
          <CustomText type={"small"}>Picked by: {movie.picker}</CustomText>
        )}
        <View>
          <CustomText type={"small"}>Description:</CustomText>
          {movie.description ? (
            <CustomText type={"small"}>{movie.description}</CustomText>
          ) : (
            <CustomText type={"small"}>Not provided</CustomText>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: Colors.dark.secondaryBackground,
    alignItems: "center",
    height: "70%",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    paddingVertical: 20,
    gap: 10,
  },
});
