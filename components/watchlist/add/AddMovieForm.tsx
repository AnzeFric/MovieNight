import { Colors } from "@/constants/Colors";
import { useMovies } from "@/hooks/useMovies";
import { Genre, MovieInfo, Person } from "@/interfaces/movie";
import useMovieStore from "@/stores/useMovieStore";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import CustomText from "../../global/CustomText";
import GenreDisplay from "./genre/GenreDisplay";
import GenrePicker from "./genre/GenrePicker";
import PersonInput from "./people/PersonInput";

export default function AddMovieForm() {
  const { createMovie } = useMovies();
  const { setMovies } = useMovieStore();

  const [name, setName] = useState("");
  const [lengthHours, setLengthHours] = useState("");
  const [lengthMinutes, setLengthMinutes] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenres] = useState<Array<Genre>>([]);
  const [director, setDirector] = useState<Person | null>(null);
  const [description, setDescription] = useState("");
  const [picker, setPicker] = useState(true);

  const person1: string = process.env.EXPO_PUBLIC_PERSON1 || "person1";
  const person2: string = process.env.EXPO_PUBLIC_PERSON2 || "person2";

  useFocusEffect(
    useCallback(() => {
      return () => {
        setName("");
        setLengthHours("");
        setLengthMinutes("");
        setYear("");
        setGenres([]);
        setDirector(null);
        setDescription("");
      };
    }, [])
  );

  const addMovie = async () => {
    const newMovie: MovieInfo = {
      uuid: uuid.v4(),
      name: name,
      length: parseInt(lengthHours) * 60 + parseInt(lengthMinutes),
      rating: 0,
      year: parseInt(year),
      genres: genres,
      director: director,
      description: description,
      picker: picker ? person2 : person1,
      watched: false,
    };

    const updatedMovies = await createMovie(newMovie);
    setMovies(updatedMovies ? updatedMovies : []);

    router.back();
  };

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
      <View style={styles.personPickerContainer}>
        <CustomText type={"normal"}>{person1}</CustomText>
        <Switch
          value={picker}
          onValueChange={setPicker}
          trackColor={{ true: Colors.dark.track, false: Colors.dark.track }}
          thumbColor={Colors.dark.thumb}
        />
        <CustomText type={"normal"}>{person2}</CustomText>
      </View>
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
  personPickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
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
