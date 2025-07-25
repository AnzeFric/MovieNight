import CustomText from "@/components/global/CustomText";
import { Colors } from "@/constants/Colors";
import { formatLength, formatReleaseYear } from "@/constants/Utils";
import { MovieInfo } from "@/interfaces/movie";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  movie: MovieInfo;
  showActionBar?: boolean;
  selected?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}

export default function MovieItem({
  movie,
  showActionBar = false,
  selected = false,
  onPress = undefined,
  onLongPress = undefined,
}: Props) {
  const handleOnPress = () => {
    if (onPress && showActionBar) {
      onPress();
    } else {
      router.push({
        pathname: "/(tabs)/watchlist/detail",
        params: {
          movie: JSON.stringify(movie),
        },
      });
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleOnPress}
      onLongPress={onLongPress}
    >
      {showActionBar && (
        <Checkbox color={Colors.dark.specialBlue} value={selected} />
      )}
      <View>
        <CustomText
          type={"normal"}
          bold
          style={{
            flexWrap: "wrap",
          }}
        >
          {movie.name} {formatReleaseYear(movie.year)}
        </CustomText>
        <CustomText type={"small"}>{movie.picker}</CustomText>
        <CustomText type={"small"}>{formatLength(movie.length)}</CustomText>

        <View style={styles.genreContainer}>
          {movie.genres?.map((genre, index) => (
            <View style={styles.genre} key={index}>
              <CustomText type={"extraSmall"}>{genre}</CustomText>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingStart: 15,
    paddingEnd: 35,
    borderRadius: 6,
    borderColor: Colors.dark.border,
    borderWidth: 0.5,
    backgroundColor: Colors.dark.secondaryBackground,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
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
