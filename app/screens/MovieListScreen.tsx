import React from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { fetchMovies } from "../store/Server";
import { img_300 } from "../../config";
import defaultStyle from "../store/defaultStyle";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";

function MovieListScreen(props: any) {
  const { data, error, isLoading } = fetchMovies();
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.data.results}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={()=>{
              props.navigation.navigate("MovieDetailsScreen", item.id)
          }} >
            <View style={styles.listContainer}>
              <Image
                source={{ uri: `${img_300}/${item.backdrop_path}` }}
                style={styles.image}
              />
              <Text style={styles.detailContainer}>{item.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: defaultStyle.colors.silver,
    paddingLeft: WP(4),
    paddingRight: WP(4),
  },
  listContainer: {
    borderRadius: WP(4),
    marginBottom: WP(4),
    backgroundColor: "white",
    overflow: "hidden",
  },
  detailContainer: {
    padding: WP(4),
    fontSize: WP(4),
  },
  image: {
    width: "100%",
    height: WP(50),
  },
});

export default MovieListScreen;
