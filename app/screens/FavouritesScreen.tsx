import React from "react";
import { FlatList, Text, View, StyleSheet, Image } from "react-native";
import { useRecoilValue } from "recoil";
import { FAVORITE_CACHE_KEY, img_500 } from "../store/Constants";
import { useGlobalFavoriteState } from "../store/globalState";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import defaultStyle from "../store/defaultStyle";
import _ from "lodash";
import ListItemSeparator from "../components/ListItemSeparator";
import { getData2 } from "../store/cache";

function FavouritesScreen() {

  const favorites = useRecoilValue(useGlobalFavoriteState);
  const data = getData2(FAVORITE_CACHE_KEY)
  

  const emptyFavoritesList = _.isEmpty(favorites);

  return (
    <View style={styles.container}>
      {emptyFavoritesList ? (
        <Text style={styles.emptyListText}>
          Your favourite movie list is empty
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <View style={styles.flatListContainer}>
              <Image
                source={{ uri: `${img_500}/${item.poster_path}` }}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Title - {item.title} </Text>
                <Text style={styles.overview}>Overview - {item.overview} </Text>
              </View>
            </View>
          )}
        //   ItemSeparatorComponent={()=>(
        //      <ListItemSeparator /> 
        //   )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: WP(4),
    paddingRight: WP(4),
    backgroundColor: defaultStyle.colors.silver,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: WP(2),
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  overview: {
    marginTop: WP(2),
  },
  emptyListText: {
    marginTop: "auto",
    marginBottom: "auto",
    alignSelf: "center",
    fontStyle: "italic",
    fontSize: 20,
  },
  flatListContainer:{
      marginTop: WP(4),
      backgroundColor: "white",
      borderRadius: WP(2),
  },
  textContainer:{
      padding: WP(2)
  }
});

export default FavouritesScreen;
