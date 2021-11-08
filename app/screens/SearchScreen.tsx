import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import AppTextInput from "../components/AppTextInput";
import axios from "axios";
import { API_KEY } from "../store/Constants";
import MovieCard from "../components/MovieCard";
import Route from "../navigation/Route";
import _ from "lodash";

function SearchScreen(props: any) {
  const [searchResults, setSearchResults] = useState<IMovieList[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSearchResults = async (searchTerm: string) => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchTerm}`
      )
      .then((res) => {
        setSearchResults(res.data.results);
        // console.log(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchSearchResults(searchTerm);
  }, [searchTerm]);

  const isEmpty = _.isEmpty(searchResults);

  return (
    <View style={styles.textInput}>
      <AppTextInput
        onChangeText={(searchWord: string) => {
          setSearchTerm(searchWord);
        }}
        value={searchTerm}
        icon="search1"
        placeholder="Search"
      />
      {isEmpty ? (
        <Text style={styles.isEmpty}>Please type to search</Text>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <MovieCard
              onPress={() =>
                props.navigation.navigate(Route.MOVIE_DETAILS_SCREEN, item.id)
              }
              movie={item}
            />
          )}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  isEmpty: {
    fontSize: 20,
    marginLeft: "auto",
    marginRight: "auto",

  },
});

export default SearchScreen;
