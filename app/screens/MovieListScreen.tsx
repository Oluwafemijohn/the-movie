import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import defaultStyle from "../store/defaultStyle";
import { widthPercentageToDP as WP } from "react-native-responsive-screen";
import { API_KEY, img_300 } from "../store/Constants";
import axios from "axios";

function MovieListScreen(props: any) {
  const [page, setPage] = useState(1);
  const [newData, setNewData] = useState<IMovieList[]>([]);
  const [pageNumber, setPageNumber] = useState(2);
  const [isLoading, setIsLoading] = useState(false);



  const fetchMovies = () => {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
      )
      .then((response) => {
        setNewData([...newData!, ...response?.data?.results]);
        setPageNumber(response?.data.total_pages);
        console.log("call");
        setIsLoading(false);
      });
  };

  const fetchMore = () => {
    if (page < pageNumber) {
      setPage(page + 1);
      console.log(page);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <View style={styles.container}>
      <FlatList
        data={newData}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate("MovieDetailsScreen", item.id);
            }}
          >
            <View style={styles.listContainer}>
              <Image
                source={{ uri: `${img_300}/${item.backdrop_path}` }}
                style={styles.image}
              />

              <Text style={styles.detailContainer}>{item.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => fetchMore()}
        onEndReachedThreshold={20}
        ListHeaderComponent={() => {
          return (
            <View>
              {isLoading && (
                <ActivityIndicator
                  style={styles.activityIndicator}
                  size="large"
                  color="#ff0000"
                />
              )}
            </View>
          );
        }}
   
      />
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    alignSelf: "auto",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: defaultStyle.colors.silver,
    paddingLeft: WP(4),
    paddingRight: WP(4),
    paddingTop: WP(2),
  },
  listContainer: {
    borderRadius: WP(4),
    marginBottom: WP(4),
    backgroundColor: "white",
    overflow: "hidden",
  },
  detailContainer: {
    padding: WP(4),
    fontSize: WP(5),
  },
  image: {
    width: "100%",
    height: WP(50),
  },
});

export default MovieListScreen;
