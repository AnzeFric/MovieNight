import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  enabled: boolean;
  onPress: () => void;
}

export default function PlusButton({ enabled, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.fixedAddButton,
        { backgroundColor: Colors.dark.specialBlue },
      ]}
      onPress={enabled ? onPress : () => {}}
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
