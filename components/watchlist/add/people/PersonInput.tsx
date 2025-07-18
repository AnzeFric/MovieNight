import { Colors } from "@/constants/Colors";
import { Person } from "@/interfaces/movie";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface Props {
  person?: Person;
  setPerson: Dispatch<SetStateAction<Person | null>>;
}

export default function PersonInput({ person, setPerson }: Props) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  useCallback(() => {
    const updatedPerson: Person = {
      firstname: firstname,
      lastname: lastname,
    };
    setPerson(updatedPerson);
  }, [firstname, lastname]);

  useEffect(() => {
    if (person) {
      setFirstname(person.firstname);
      setLastname(person.lastname);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.dark.secondaryText}
        placeholder={"Name"}
        value={firstname}
        onChangeText={setFirstname}
        autoCapitalize={"words"}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.dark.secondaryText}
        placeholder={"Surname"}
        value={lastname}
        onChangeText={setLastname}
        autoCapitalize={"words"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  input: {
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
    marginBottom: 15,
    paddingVertical: 8,
    color: "#ffffff",
    flex: 1,
  },
});
