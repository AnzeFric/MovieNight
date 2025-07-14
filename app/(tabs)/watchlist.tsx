import { StyleSheet, Text, View } from "react-native";

export default function WatchListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Watchlist</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
