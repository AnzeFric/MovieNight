import CustomText from "@/components/global/CustomText";
import { Colors } from "@/constants/Colors";
import { Genre, genresArray } from "@/interfaces/movie";
import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  setGenres: Dispatch<SetStateAction<Array<Genre>>>;
}

export default function GenrePicker({ setGenres }: Props) {
  const [newGenre, setNewGenre] = useState("");
  const [dropDownVisible, setDropDownVisible] = useState(false);

  const filteredGenres = useMemo(() => {
    return genresArray.filter((genre) =>
      genre.toLowerCase().startsWith(newGenre.toLowerCase())
    );
  }, [newGenre]);

  const addGenre = () => {
    setGenres((prev) => ({
      ...prev,
      newGenre,
    }));
    setNewGenre("");
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.dark.secondaryText}
          placeholder={"Genre"}
          value={newGenre}
          onChangeText={setNewGenre}
          autoCapitalize={"none"}
          onFocus={() => setDropDownVisible(true)}
          onBlur={() => setDropDownVisible(false)}
        />
        <Ionicons
          name={"checkmark-circle"}
          size={28}
          onPress={addGenre}
          color={Colors.dark.accepted}
          style={{ paddingHorizontal: 10 }}
        />
      </View>
      {dropDownVisible && (
        <ScrollView
          style={[
            styles.optionsContainer,
            { backgroundColor: Colors.dark.secondaryBackground },
          ]}
          nestedScrollEnabled
          keyboardShouldPersistTaps={"handled"}
        >
          {filteredGenres.map((item, index) => (
            <TouchableOpacity
              style={styles.option}
              onPress={() => setNewGenre(item)}
              key={index}
            >
              <CustomText type={"small"}>{item}</CustomText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  optionsContainer: {
    borderWidth: 0.5,
    borderRadius: 4,
    maxHeight: 200,
  },
  option: {
    borderBottomWidth: 0.8,
    paddingVertical: 12,
    marginHorizontal: 15,
    borderStyle: "dashed",
  },
});
