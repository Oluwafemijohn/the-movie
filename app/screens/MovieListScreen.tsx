import React, { useState, useRef, RefObject } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { fetchMovies, fetchMovies2 } from "../store/Server";
import defaultStyle from "../store/defaultStyle";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import { API_KEY, BASE_URL, img_300 } from "../store/Constants";
import axios, { AxiosResponse } from "axios";
import  { useNetInfo } from '@react-native-community/netinfo';

function MovieListScreen(props: any) {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState<IMovieListResponseType>();
  const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState([]);

  const fetchMovies2 = () => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}discover/movie${API_KEY}&page=${page}`)
      .then((response) => {
        setContent({ ...content, ...response?.data });
        setIsLoading(false);
      });
  };

  let screenRef: FlatList<IMovieList> | null;

  // const { data: response, fetchNextPage } = fetchMovies();
  React.useEffect(() => {
    // setData(response?.pages[response?.pages.length - 1].results);
    fetchMovies2();
  }, [page]);

  return (
    <View style={styles.container}>
      
      {isLoading ? (
        <ActivityIndicator style={styles.activityIndicator} size="large" color="#ff0000" />
      ) : (
        <FlatList
          ref={(ref) => {
            screenRef = ref;
          }}
          // data={data}
          data={content?.results}
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
          keyExtractor={(item) => `${item.id}`}
          onEndReachedThreshold={0}
          onEndReached={() => {
            setPage(page + 1);
            // response2 = fetchMovies2(page);
            screenRef!.scrollToOffset({
              offset: 0,
            });
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    alignSelf: "auto"
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
