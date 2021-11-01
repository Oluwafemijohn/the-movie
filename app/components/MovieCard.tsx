import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { MOVIE_ENDPOINT_WITH_TOKEN } from "../store/Constants";
import { fetchMovies } from "../store/Server";
import { img_300, img_500 } from "../../config"


function MovieCard(props: any) {
  const { data, error, isLoading } = fetchMovies();

//   const IMAGE_URL = MOVIE_ENDPOINT_WITH_TOKEN + data?.data.results;
//   const movieResult = data?.data.results;
  return (
    <View>
      <FlatList
        data={data?.data.results}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri:  `${img_500}/${item.backdrop_path}` }}
              style={{width: 100, height: 100}}
            />
            <Text>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}

export default MovieCard;
