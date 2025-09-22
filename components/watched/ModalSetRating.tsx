import { Colors } from "@/constants/Colors";
import { MovieInfo } from "@/interfaces/movie";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import StarRating from "react-native-star-rating-widget";
import CustomText from "../global/CustomText";

interface Props {
  visible: boolean;
  movies: Array<MovieInfo>;
  onClose: () => void;
  onConfirm: (movieUuidRatings: Array<[string, number]>) => void;
}

export default function ModalSetRating({
  visible,
  movies = [],
  onClose,
  onConfirm,
}: Props) {
  const [rating, setRating] = useState(0);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [allRatings, setAllRatings] = useState<Array<[string, number]>>([]);

  const currentMovie = movies[currentMovieIndex];
  const isLastMovie = currentMovieIndex >= movies.length - 1;

  useEffect(() => {
    if (visible) {
      setCurrentMovieIndex(0);
      setAllRatings([]);
      setRating(0);
    }
  }, [visible]);

  const handleConfirm = () => {
    if (currentMovie && rating > 0) {
      // Save current movie rating
      const newAllRatings = allRatings;
      newAllRatings.push([currentMovie.uuid, rating]);

      if (isLastMovie) {
        // All movies rated, save to parent state
        onConfirm(newAllRatings);
      } else {
        // Move to next movie
        setAllRatings(newAllRatings);
        setCurrentMovieIndex((prev) => prev + 1);
        setRating(0);
      }
    }
  };

  const handleCancel = () => {
    setCurrentMovieIndex(0);
    setAllRatings([]);
    setRating(0);
    onClose();
  };

  const handlePrevious = () => {
    if (currentMovieIndex > 0) {
      // Restore previous rating if going back
      const previousMovieUuid = movies[currentMovieIndex - 1].uuid;
      const previousRating =
        allRatings.find(([uuid]) => uuid === previousMovieUuid)?.[1] || 0;

      setCurrentMovieIndex((prev) => prev - 1);
      setRating(previousRating);

      // Remove the rating for the previous movie from allRatings so it can be re-entered
      setAllRatings((prev) =>
        prev.filter(([uuid]) => uuid !== previousMovieUuid)
      );
    }
  };

  if (!visible || !currentMovie) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={handleCancel}
      animationType={"fade"}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Progress indicator */}
          <View style={styles.progressContainer}>
            <CustomText type={"small"} style={{ textAlign: "center" }}>
              {currentMovieIndex + 1} of {movies.length}
            </CustomText>
          </View>

          <View style={{ width: "100%" }}>
            <CustomText type={"title"} bold style={{ textAlign: "center" }}>
              How did you like
            </CustomText>
            <CustomText
              type={"normal"}
              style={{ textAlign: "center", marginTop: 8 }}
            >
              {currentMovie.name}?
            </CustomText>
          </View>

          <StarRating
            rating={rating}
            onChange={setRating}
            starSize={40}
            starStyle={{ marginHorizontal: 8 }}
          />

          <View style={styles.buttonContainer}>
            {/* Previous button (only show if not first movie) */}
            {currentMovieIndex > 0 && (
              <TouchableOpacity
                style={[styles.button, styles.previousButton]}
                onPress={handlePrevious}
              >
                <CustomText type={"small"}>Previous</CustomText>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <CustomText type={"small"}>Cancel</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.confirmButton,
                rating === 0 && styles.disabledButton,
              ]}
              onPress={handleConfirm}
              disabled={rating === 0}
            >
              <CustomText
                type={"small"}
                style={rating === 0 ? { opacity: 0.5 } : {}}
              >
                {isLastMovie ? "Finish" : "Next"}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    padding: 35,
    borderRadius: 6,
    alignItems: "center",
    width: "80%",
    backgroundColor: Colors.dark.secondaryBackground,
    gap: 30,
  },
  progressContainer: {
    width: "100%",
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingTop: 10,
    gap: 15,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
    alignItems: "center",
  },
  previousButton: {
    backgroundColor: Colors.dark.background,
  },
  cancelButton: {
    backgroundColor: Colors.dark.destroyButton,
  },
  confirmButton: {
    backgroundColor: Colors.dark.button,
  },
  disabledButton: {
    backgroundColor: Colors.dark.background,
    opacity: 0.5,
  },
});
