import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  onPress: () => void;
}

export default function PlusButton({ onPress }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.fixedAddButton,
        { backgroundColor: Colors.dark.specialBlue },
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={"add"}
        size={40}
        color={Colors.dark.iconWithDarkBackground}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fixedAddButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
