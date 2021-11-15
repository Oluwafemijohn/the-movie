import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import MovieCard from "../components/MovieCard";
import Route from "../navigation/Route";
import { API_KEY } from "../store/Constants";
import defaultStyle from "../store/defaultStyle";
import { widthPercentageToDP as WP } from "react-native-responsive-screen";

function PopularMovieScreen(props:any) {
  const [page, setPage] = useState(1);
  const [newData, setNewData] = useState<IPopularMovieList[]>([]);
  const [pageNumber, setPageNumber] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = () => {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular${API_KEY}&language=en-US&page=${page}`
      )
      .then((response) => {
        setNewData([...newData!, ...response?.data?.results]);
        setPageNumber(response?.data.total_pages);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);
  return (
    <View style={styles.container}>
    <FlatList
      data={newData}
      renderItem={({ item }) => (
      
          <MovieCard 
          onPress={() => {
            props.navigation.navigate(Route.MOVIE_DETAILS_SCREEN, item.id);
          }}
          movie={item}   />
     
      )}
      keyExtractor={(item) => item.id.toString()}

      onEndReached={() => {
        if (page < pageNumber) {
          setPage(page + 1);
        }
      }}
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
      numColumns={2}
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
});

export default PopularMovieScreen;
