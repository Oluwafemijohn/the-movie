import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { img_300 } from "../store/Constants";
import { fetchMoviesDetails, fetchVideosDetails } from "../store/Server";
import * as Linking from "expo-linking";
import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import defaultStyle from "../store/defaultStyle";
import { useGlobalFavoriteState } from "../store/globalState";
import { useRecoilState } from "recoil";
import _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";

function MovieDetailsScreen(props: any) {
  const id = props.route.params;
  const movieDetails = fetchMoviesDetails(id);
  const videoDetails = fetchVideosDetails(id);
  const videoKey = videoDetails.data?.data.results[0].key;
  const movieContent = movieDetails.data?.data;
  const [favorite, setFavorite] = useRecoilState(useGlobalFavoriteState);
  // const  favoriteCheck = useRecoilValue(useFavoriteCheck);
  // const arr = favorite.filter(item => item.id === movieContent?.id);
  // console.log(movieContent)

  const arrCheck = favorite.filter((item) => item.id === movieContent?.id);

  const storeData = async (value: IMoveDetails[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      const val = await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  storeData(favorite);

  // const favoriteCheck = _.some(
  //   favorite,
  //   (favorite: IMoveDetails | undefined) => {
  //     return favorite === movieContent;
  //   }
  // );

  return (
    <View style={styles.container}>
      {movieDetails.isLoading ? (
        <ActivityIndicator size="large" color={defaultStyle.colors.primary} />
      ) : (
        <View>
          <Image
            source={{
              uri: `${img_300}/${movieDetails.data?.data.backdrop_path}`,
            }}
            style={styles.image}
          />
          <View style={styles.details}>
            <Text style={styles.text}>Title - {movieContent?.title}</Text>
            <Text style={styles.text}>
              Vote average - {movieContent?.vote_average}{" "}
            </Text>
            <Text style={styles.text}>
              Vote count - {movieContent?.vote_count}{" "}
            </Text>
            <Text style={styles.text}>
              Original language - {movieContent?.original_language}{" "}
            </Text>
            <Text style={styles.text}>
              Popularity - {movieContent?.popularity}{" "}
            </Text>
            <Text style={styles.text}>
              Overview - {movieContent?.overview}{" "}
            </Text>
            <Pressable
              style={styles.button}
              onPress={() => {
                Linking.openURL(`https://www.youtube.com/watch?v=${videoKey}`);
              }}
            >
              <Text style={styles.trailerText}>Trailers</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                // if (arrCheck.length === 1) {
                //   setFavorite(
                //     favorite.filter(
                //       (currentFavorite) => currentFavorite !== movieContent
                //     )
                //   );
                // } else {
                //   setFavorite([...favorite, movieContent!]);
                // }

                // !favoriteCheck
                //   ? setFavorite([...favorite, movieContent!])
                //   : setFavorite(
                //       favoriter.filter(
                //         (currentFavorite) => currentFavorite !== movieContent
                //       )
                //     );

                arrCheck.length === 1
                  ? setFavorite(
                      favorite.filter(
                        (currentFavorite) => currentFavorite !== movieContent
                      )
                    )
                  : setFavorite([...favorite, movieContent!]);
              }}
            >
              {arrCheck.length === 1 ? (
                <MaterialIcons name="favorite" size={24} color="red" />
              ) : (
                <MaterialIcons name="favorite-border" size={24} color="black" />
              )}
            </Pressable>
          </View>
        </View>
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
});

export default MovieDetailsScreen;
