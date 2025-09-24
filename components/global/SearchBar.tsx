import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {};

  const handleFilter = () => {};

  const handleChangeText = (text: string) => {
    setSearchText(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
          <Ionicons name={"search-outline"} size={20} color={"#666666"} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder={"Search"}
          placeholderTextColor={"#999999"}
          value={searchText}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSearch}
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
      <TouchableOpacity onPress={handleFilter}>
        <Ionicons
          name={"funnel-outline"}
          size={30}
          color={"#d9d9d9"}
          style={styles.filterIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
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
