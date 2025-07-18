import CustomText from "@/components/global/CustomText";
import { Colors } from "@/constants/Colors";
import { Genre } from "@/interfaces/movie";
import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  genres: Array<Genre>;
  setGenres: Dispatch<SetStateAction<Array<Genre>>>;
}

export default function GenreDisplay({ genres, setGenres }: Props) {
  const deleteGenre = (genreName: string) => {
    const updatedGenres = genres.filter((genre) => genre != genreName);
    setGenres(updatedGenres);
  };

  return (
    <View style={styles.container}>
      {genres.map((genre, index) => (
        <TouchableOpacity
          style={styles.button}
          onPress={() => deleteGenre(genre)}
          key={index}
        >
          <View style={styles.buttonContent}>
            <CustomText type={"small"}>{genre}</CustomText>
            <Ionicons
              name={"close"}
              size={20}
              color={Colors.dark.primaryText}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    rowGap: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: Colors.dark.secondaryBackground,
    alignSelf: "flex-start",
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
  },
});
