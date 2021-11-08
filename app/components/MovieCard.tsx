import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { img_300 } from "../store/Constants";
import { widthPercentageToDP as WP } from "react-native-responsive-screen";

interface IMovieCard {
    movie: any;
    onPress: any;
}

function MovieCard<IMovieCard>({ movie, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.listContainer}>
        <Image
          source={{ uri: `${img_300}/${movie.backdrop_path}` }}
          style={styles.image}
        />
        <Text style={styles.title}>{movie.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderRadius: WP(4),
    marginBottom: WP(4),
    marginRight: WP(4),
    backgroundColor: "white",
    overflow: "hidden",
    // flex: 1,
    // flexDirection: 'row',
    // margin: 10,
    // padding: 10,
    // borderRadius: 10,
    // backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    width: WP(44),
  },
  image: {
    // width: 100,
    // height: 150,
    // borderRadius: 10,
    width: "100%",
    height: WP(50),
  },
  title: {
    // flex: 1,
    // flexDirection: 'column',
    // marginLeft: 10,
    // marginTop: 10,
    padding: WP(4),
    fontSize: WP(3),
    fontWeight: "bold",
  },
});

export default MovieCard;
