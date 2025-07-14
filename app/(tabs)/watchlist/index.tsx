import CustomText from "@/components/global/CustomText";
import PlusButton from "@/components/global/PlusButton";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function WatchListScreen() {
  const redirectToAddMovie = () => {
    router.push("/(tabs)/watchlist/add");
  };

  return (
    <View style={styles.container}>
      <CustomText type={"lTitle"} bold>
        Watchlist
      </CustomText>
      <PlusButton onPress={redirectToAddMovie} />
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
