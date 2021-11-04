import React from "react";
import { Image, Text, View, StyleSheet, Button, Pressable } from "react-native";
import { img_300 } from "../store/Constants";
import { fetchMoviesDetails, fetchVideosDetails } from "../store/Server";
import * as Linking from "expo-linking";
import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import defaultStyle from "../store/defaultStyle";

function MovieDetailsScreen(props: any) {
  const id = props.route.params;
  const movieDetails = fetchMoviesDetails(id);
  const videoDetails = fetchVideosDetails(id);
  const videoKey = videoDetails.data?.data.results[0].key;
  const movieContent = movieDetails.data?.data;
  movieContent?.adult;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${img_300}/${movieDetails.data?.data.backdrop_path}` }}
        style={styles.image}
      />
      <Text style={styles.text}>Title - {movieContent?.title}</Text>
      <Text style={styles.text}>
        Vote average - {movieContent?.vote_average}{" "}
      </Text>
      <Text style={styles.text}>Vote count - {movieContent?.vote_count} </Text>
      <Text style={styles.text}>
        Original language - {movieContent?.original_language}{" "}
      </Text>
      <Text style={styles.text}>Popularity - {movieContent?.popularity} </Text>
      <Text style={styles.text}>Overview - {movieContent?.overview} </Text>
      <Pressable style={styles.button} onPress={() => {}}>
        <Button
          title="Trailers"
          onPress={() => {
            Linking.openURL(`https://www.youtube.com/watch?v=${videoKey}`);
          }}
        />
      </Pressable>
      <Pressable onPress={() => {}}>
        <MaterialIcons name="favorite-border" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: defaultStyle.colors.silver,
    paddingLeft: WP(4),
    paddingRight: WP(4),
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: WP(4),
  },
  button: {},
});

export default MovieDetailsScreen;
