import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface Props {
  searchText: string;
  setSearchText: (searchText: string) => void;
}

export default function SearchBar({ searchText, setSearchText }: Props) {
  const handleChangeText = (text: string) => {
    setSearchText(text);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.searchIcon}>
        <Ionicons name={"search-outline"} size={20} color={"#666666"} />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder={"Search"}
        placeholderTextColor={"#999999"}
        value={searchText}
        onChangeText={handleChangeText}
      />
      {searchText.length > 0 && (
        <TouchableOpacity
          onPress={() => setSearchText("")}
          style={styles.clearIcon}
        >
          <Ionicons name={"close-circle"} size={24} color={"#666666"} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.dark.inputLightBorder,
    borderRadius: 8,
    backgroundColor: Colors.dark.inputLightBackground,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.dark.inputLightText,
  },
  clearIcon: {
    marginLeft: 8,
  },
  filterIcon: {
    marginLeft: 12,
    padding: 8,
  },
});
