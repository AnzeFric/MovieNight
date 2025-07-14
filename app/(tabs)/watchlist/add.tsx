import CustomText from "@/components/global/CustomText";
import { StyleSheet, View } from "react-native";

export default function AddMovie() {
  return (
    <View style={styles.container}>
      <CustomText type={"lTitle"} bold>
        Add a movie
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    flex: 1,
  },
});
