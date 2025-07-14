import { Colors } from "@/constants/Colors";
import { MovieInfo } from "@/interfaces/movie";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import CustomText from "../global/CustomText";

interface Props {
  setMovie: Dispatch<SetStateAction<MovieInfo>>;
}

export default function AddMovieForm({ setMovie }: Props) {
  const [name, setName] = useState("");
  const [lengthHours, setLengthHours] = useState("");
  const [lengthMinutes, setLengthMinutes] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenres] = useState([]);
  const [director, setDirector] = useState();
  const [cast, setCast] = useState();
  const [description, setDescription] = useState("");

  useCallback(() => {
    setMovie({
      name: name,
      length: parseInt(lengthHours) * 60 + parseInt(lengthMinutes),
      year: parseInt(year),
      genres: genres,
      director: director,
      cast: cast,
      description: description,
    });
  }, [
    name,
    lengthHours,
    lengthMinutes,
    year,
    genres,
    director,
    cast,
    description,
  ]);

  const addMovie = () => {};

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.dark.secondaryText}
        placeholder={"Ime in priimek"}
        value={name}
        onChangeText={setName}
        autoCapitalize={"words"}
      />
      <View style={styles.twoOptionsContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.dark.secondaryText}
          placeholder={"Dolžina(ure)"}
          value={lengthHours}
          onChangeText={setLengthHours}
          autoCapitalize={"none"}
          keyboardType={"number-pad"}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.dark.secondaryText}
          placeholder={"Dolžina(min)"}
          value={lengthMinutes}
          onChangeText={setLengthMinutes}
          autoCapitalize={"none"}
          keyboardType={"number-pad"}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.dark.secondaryText}
        placeholder={"Leto izdaje"}
        value={year}
        onChangeText={setYear}
        autoCapitalize={"words"}
        keyboardType={"number-pad"}
      />
      <TextInput
        style={[styles.input, { height: 130, textAlignVertical: "bottom" }]}
        placeholderTextColor={Colors.dark.secondaryText}
        placeholder={"Opis"}
        value={description}
        onChangeText={setDescription}
        autoCapitalize={"sentences"}
        numberOfLines={3}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={addMovie}>
        <CustomText type={"normal"} bold>
          Dodaj
        </CustomText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
    marginBottom: 15,
    paddingVertical: 8,
    color: "#ffffff",
  },
  twoOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  button: {
    backgroundColor: Colors.dark.button,
    alignItems: "center",
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 20,
  },
});
