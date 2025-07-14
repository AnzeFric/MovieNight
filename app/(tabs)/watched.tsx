import CustomText from "@/components/global/CustomText";
import { StyleSheet, View } from "react-native";

export default function WatchedScreen() {
  return (
    <View style={styles.container}>
      <CustomText type={"lTitle"} bold>
        Watched
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
