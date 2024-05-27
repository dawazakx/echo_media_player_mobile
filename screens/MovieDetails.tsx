// MovieDetailsScreen.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { MoviesStackParamList } from "@/constants/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "@/constants/Colors";
import { CustomView } from "@/components/View";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

type MovieDetailsProps = {
  route: RouteProp<MoviesStackParamList, "MovieDetails">;
  navigation: NativeStackNavigationProp<MoviesStackParamList, "MovieDetails">;
};

const MovieDetails: React.FC<MovieDetailsProps> = ({ route, navigation }) => {
  const { movie } = route.params;

  return (
    <CustomView style={{ width: "100%" }}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: Colors.tint,
            padding: 8,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="caretleft" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: Colors.tint,
            padding: 8,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => {}}>
            <MaterialIcons name="favorite" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: movie.stream_icon || "url_to_placeholder_image" }}
          style={styles.image}
        />
        <Text style={styles.title}>{movie.name}</Text>
        <Text style={styles.details}>Category: {movie.category_id}</Text>
        <Text style={styles.details}>Rating: {movie.rating}</Text>
        <Text style={styles.details}>
          Added: {new Date(movie.added).toDateString()}
        </Text>
        {/* Add more details as needed */}
      </View>
    </CustomView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 12,
    backgroundColor: Colors.secBackground,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  details: {
    fontSize: 18,
    marginTop: 5,
  },
});

export default MovieDetails;
