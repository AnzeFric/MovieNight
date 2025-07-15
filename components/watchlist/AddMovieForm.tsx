import { Colors } from "@/constants/Colors";
import { Genre, MovieInfo, Person } from "@/interfaces/movie";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import CustomText from "../global/CustomText";
import GenreDisplay from "./genre/GenreDisplay";
import GenrePicker from "./genre/GenrePicker";
import PersonInput from "./people/PersonInput";

interface Props {
  setMovie: Dispatch<SetStateAction<MovieInfo>>;
}

export default function AddMovieForm({ setMovie }: Props) {
  const [name, setName] = useState("");
  const [lengthHours, setLengthHours] = useState("");
  const [lengthMinutes, setLengthMinutes] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenres] = useState<Array<Genre>>([]);
  const [director, setDirector] = useState<Person>();
  const [description, setDescription] = useState("");

  useCallback(() => {
    setMovie({
      name: name,
      length: parseInt(lengthHours) * 60 + parseInt(lengthMinutes),
      year: parseInt(year),
      genres: genres,
      director: director,
      description: description,
    });
  }, [name, lengthHours, lengthMinutes, year, genres, director, description]);

  const addMovie = () => {};

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.dark.secondaryText}
        placeholder={"Movie name"}
        value={name}
        onChangeText={setName}
        autoCapitalize={"words"}
      />
      <View style={styles.twoOptionsContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholderTextColor={Colors.dark.secondaryText}
          placeholder={"Length(h)"}
          value={lengthHours}
          onChangeText={setLengthHours}
          autoCapitalize={"none"}
          keyboardType={"number-pad"}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholderTextColor={Colors.dark.secondaryText}
          placeholder={"Length(min)"}
          value={lengthMinutes}
          onChangeText={setLengthMinutes}
          autoCapitalize={"none"}
          keyboardType={"number-pad"}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.dark.secondaryText}
        placeholder={"Release year"}
        value={year}
        onChangeText={setYear}
        autoCapitalize={"words"}
        keyboardType={"number-pad"}
      />
      <TextInput
        style={styles.largeInput}
        placeholderTextColor={Colors.dark.secondaryText}
        placeholder={"Description"}
        value={description}
        onChangeText={setDescription}
        autoCapitalize={"sentences"}
        numberOfLines={5}
        multiline
      />

      <GenrePicker setGenres={setGenres} />
      <GenreDisplay genres={genres} setGenres={setGenres} />

      <CustomText type={"normal"}>Director</CustomText>
      <PersonInput setPerson={setDirector} />

      <TouchableOpacity style={styles.button} onPress={addMovie}>
        <CustomText type={"normal"} bold>
          Add
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
  largeInput: {
    height: 130,
    textAlignVertical: "bottom",
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
