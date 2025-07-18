import CustomText from "@/components/global/CustomText";
import AddMovieForm from "@/components/watchlist/add/AddMovieForm";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

// TODO?: Vpišeš link pa ti vzame podatke avtomatsko
export default function AddMovie() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 50}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <CustomText type={"lTitle"} bold>
          Add a movie
        </CustomText>
        <AddMovieForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    gap: 20,
    flexGrow: 1,
  },
});
