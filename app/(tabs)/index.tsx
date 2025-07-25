import CustomText from "@/components/global/CustomText";
import { StyleSheet, View } from "react-native";

export default function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <CustomText type={"lTitle"} bold>
        Movies
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
});
