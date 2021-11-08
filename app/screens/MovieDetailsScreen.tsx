import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { FAVORITE_CACHE_KEY, img_300 } from "../store/Constants";
import { fetchMoviesDetails, fetchVideosDetails } from "../store/Server";
import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import defaultStyle from "../store/defaultStyle";
import { useGlobalFavoriteState } from "../store/globalState";
import { useRecoilState } from "recoil";
import _ from "lodash";

import { storeData } from "../store/cache";
import { Rating } from "react-native-ratings";

import Route from "../navigation/Route";

function MovieDetailsScreen(props: any) {
  const id = props.route.params;
  const movieDetails = fetchMoviesDetails(id);
  const videoDetails = fetchVideosDetails(id);
  const videoKey = videoDetails.data?.data.results[0].key;
  const movieContent = movieDetails.data?.data;
  const [favorite, setFavorite] = useRecoilState(useGlobalFavoriteState);

  const arrCheck = favorite.filter((item) => item.id === movieContent?.id);
  console.log(id)


  return (
    <View style={styles.container}>
      {movieDetails.isLoading ? (
        <ActivityIndicator size="large" color={defaultStyle.colors.primary} />
      ) : (
        <ScrollView>
          <View>
            <Image
              source={{
                uri: `${img_300}/${movieDetails.data?.data.backdrop_path}`,
              }}
              style={styles.image}
            />
            <View style={styles.details}>
              <Text style={styles.titleText}>
                Title - {movieContent?.title}
              </Text>
              <Text style={styles.text}>
                Overview - {movieContent?.overview}{" "}
              </Text>
              <View style={styles.votingAverage} >
                <Text style={styles.text}>Vote average </Text>
                <Rating
                  showRating
                  fractions={1}
                  startingValue={movieContent?.vote_average}
                  imageSize={20}
                  style={{ paddingVertical: 10 }}
                  ratingCount={10}
                />
              </View>
              <Text style={styles.text}>
                Vote count - {Math.ceil(movieContent?.vote_count! / 2)}{" "}
              </Text>
              <Text style={styles.text}>
                Original language - {movieContent?.original_language}{" "}
              </Text>
              <Text style={styles.text}>
                Popularity - {movieContent?.popularity}{" "}
              </Text>
              <View style={styles.trailerAndFavorite}>
                <Pressable
                  style={styles.button}
                  onPress={() => 
                    {
                    // Linking.openURL(
                    //   `https://www.youtube.com/watch?v=${videoKey}`
                    // );
                    props.navigation.navigate(Route.TRAILERS, videoKey)
                  
                  }
                }
                >
                  <Text style={styles.trailerText}>Trailers</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    if (arrCheck.length === 1) {
                      setFavorite(
                        favorite.filter((item) => item !== movieContent)
                      );
                      storeData(FAVORITE_CACHE_KEY,favorite.filter((item) => item !== movieContent))
                    } else {
                      setFavorite([...favorite, movieContent!]);
                      storeData(FAVORITE_CACHE_KEY,favorite)
                    }
                  }}
                >
                  <View style={styles.favorite}>
                    {arrCheck.length === 1 ? (
                      <MaterialIcons name="favorite" size={24} color="red" />
                    ) : (
                      <MaterialIcons
                        name="favorite-border"
                        size={24}
                        color="black"
                      />
                    )}
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: defaultStyle.colors.white,
  },
  details: {
    paddingLeft: WP(4),
    paddingRight: WP(4),
  },
  image: {
    width: "100%",
    height: 300,
  },
  text: {
    marginTop: WP(4),
    fontSize: WP(4),
  },
  titleText: {
    fontWeight: "bold",
    marginTop: WP(4),
    fontSize: WP(5),
  },
  button: {
    width: WP(25),
    // backgroundColor:"black"
  },
  trailerText: {
    color: "blue",
    marginTop: WP(4),
    marginBottom: WP(4),
  },
  favorite: {
    marginBottom: WP(5),
  },
  trailerAndFavorite: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: HP(8),
  },
  votingAverage: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: WP(4),
  },
});

export default MovieDetailsScreen;
