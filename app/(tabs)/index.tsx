import CustomText from "@/components/global/CustomText";
import SwiperCard from "@/components/index/SwiperCard";
import { Colors } from "@/constants/Colors";
import { MovieInfo } from "@/interfaces/movie";
import useMovieStore from "@/stores/useMovieStore";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Swiper from "react-native-deck-swiper";

export default function DiscoverScreen() {
  const { watchlistMovies } = useMovieStore();

  const [emptyList, setEmptyList] = useState(false);

  const swiperRef = useRef<Swiper<MovieInfo>>(null);

  const resetList = () => {
    setEmptyList(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText type="lTitle" bold>
          Discover Movies
        </CustomText>
        <Ionicons
          name={"refresh"}
          size={30}
          color={"#ffffff"}
          onPress={resetList}
        />
      </View>
      <View style={styles.contentContainer}>
        {!emptyList ? (
          <Swiper
            ref={swiperRef}
            cards={watchlistMovies}
            backgroundColor={"transparent"}
            renderCard={(cardData) => <SwiperCard movie={cardData} />}
            // Callback
            onSwipedAll={() => setEmptyList(true)}
            // Configuration
            stackSize={5}
            stackSeparation={0}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
            disableTopSwipe={true}
            disableBottomSwipe={true}
            // Overlay labels
            overlayOpacityHorizontalThreshold={0}
            overlayOpacityVerticalThreshold={0}
            overlayLabels={{
              left: {
                title: "NOT FEELING IT",
                style: {
                  label: {
                    backgroundColor: Colors.dark.destructiveRed,
                    borderColor: Colors.dark.destructiveRed,
                    color: "white",
                    borderWidth: 1,
                    fontSize: 20,
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    marginTop: 20,
                    marginLeft: -20,
                  },
                },
              },
              right: {
                title: "WATCH",
                style: {
                  label: {
                    backgroundColor: Colors.dark.accepted,
                    borderColor: Colors.dark.accepted,
                    color: "white",
                    borderWidth: 1,
                    fontSize: 20,
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    marginTop: 20,
                    marginLeft: 20,
                  },
                },
              },
            }}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <CustomText type={"normal"}>
              No more movies in your watchlist
            </CustomText>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentContainer: {
    justifyContent: "center",
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    marginBottom: 100,
    paddingHorizontal: 25,
  },
});
