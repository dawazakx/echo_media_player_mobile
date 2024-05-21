import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ViewStyle,
} from "react-native";

interface MovieCardProps {
  title: string;
  posterUrl: string;
  rating: number;
  onPress: () => void;
  style?: ViewStyle;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  posterUrl,
  rating,
  onPress,
  style,
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.card, style]}>
      <Image source={{ uri: posterUrl }} style={styles.poster} />
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
      {/* <Text style={styles.title}>{title}</Text> */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFF",
    elevation: 3, // Adds shadow for Android
    shadowColor: "#000", // Adds shadow for iOS
    shadowOpacity: 0.2, // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Adds shadow for iOS
    shadowRadius: 8, // Adds shadow for iOS
  },
  poster: {
    width: 100,
    height: 150,
  },
  ratingContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 5,
    borderRadius: 4,
  },
  ratingText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  title: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default MovieCard;
