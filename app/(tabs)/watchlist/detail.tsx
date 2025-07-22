import CustomText from "@/components/global/CustomText";
import { Colors } from "@/constants/Colors";
import { formatLength, formatPerson } from "@/constants/Utils";
import { MovieInfo } from "@/interfaces/movie";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

export default function DetailMovie() {
  const { movie } = useLocalSearchParams();

  const movieData: MovieInfo = useMemo(() => {
    return JSON.parse(movie.toString());
  }, [movie]);

  const sectionNames = [
    "Name",
    "Release year",
    "Length",
    "Description",
    "Picked",
    "Director",
  ];

  const sectionData = [
    movieData.name,
    movieData.year ? movieData.year : "Not provided",
    formatLength(Number(movieData.length)),
    movieData.description ? movieData.description : "Not provided",
    movieData.picker,
    movieData.director ? formatPerson(movieData.director) : "Not provided",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name={"caret-back"}
          size={30}
          color={Colors.dark.activeIcon}
          onPress={() => router.back()}
        />
        <CustomText type={"lTitle"} bold>
          Movie detail
        </CustomText>
      </View>
      <View style={styles.contentContainer}>
        {sectionNames.map((sectionName, index) => (
          <View style={styles.sectionContainer} key={index}>
            <CustomText type="small">{sectionName}</CustomText>
            <CustomText type="normal" bold>
              {"    "}
              {sectionData[index]}
            </CustomText>
          </View>
        ))}
        <View style={styles.sectionContainer}>
          <CustomText type="small">Genres</CustomText>
          <View style={styles.genreContainer}>
            {movieData.genres?.map((genre, index) => (
              <View style={styles.genre} key={index}>
                <CustomText type={"extraSmall"}>{genre}</CustomText>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    gap: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
  },
  contentContainer: {
    gap: 10,
  },
  sectionContainer: {
    gap: 5,
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
