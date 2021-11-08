import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { FAVORITE_CACHE_KEY, img_500 } from "../store/Constants";
import { useGlobalFavoriteState } from "../store/globalState";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import defaultStyle from "../store/defaultStyle";
import _ from "lodash";
import { getData2, storeData } from "../store/cache";
import Route from "../navigation/Route";
import { MaterialIcons } from "@expo/vector-icons";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

function FavouritesScreen(props: any) {
  const [favorite, setFavorite] = useRecoilState(useGlobalFavoriteState);
  const netInfo = useNetInfo();


  const data = getData2(FAVORITE_CACHE_KEY);

  const emptyFavoritesList = _.isEmpty(favorite);

  getData2(FAVORITE_CACHE_KEY)
    .then((data) => {
      if (!netInfo.isInternetReachable) {
        setFavorite(data as IMoveDetails[]);
      }
        
      // }
      // setFavorite(data);
      console.log("data", data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <View style={styles.container}>
      {emptyFavoritesList ? (
        <Text style={styles.emptyListText}>
          Your favourite movie list is empty
        </Text>
      ) : (
        <FlatList
          data={favorite}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.navigate(Route.MOVIE_DETAILS_SCREEN, item.id);
              }}
            >
              <View style={styles.flatListContainer}>
                <Image
                  source={{ uri: `${img_500}/${item.poster_path}` }}
                  style={styles.image}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.titleText}>Title - {item.title} </Text>
                  <Text style={styles.overview}>
                    Overview - {item.overview}{" "}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setFavorite((prevState) => {
                        return prevState.filter(
                          (currentItem) => currentItem.id !== item.id
                        );
                      });
                      storeData(FAVORITE_CACHE_KEY, favorite.filter((currentItem) => currentItem !== item))
                    }}
                  >
                    <View style={styles.favorite}>
                      <MaterialIcons name="favorite" size={24} color="red" />
                    </View>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
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
  flatListContainer: {
    marginTop: WP(4),
    backgroundColor: "white",
    borderRadius: WP(2),
    paddingBottom: WP(4),
  },
  textContainer: {
    padding: WP(2),
  },
  favorite: {
    position: "absolute",
    right: WP(2),
    // top: WP(2),
  },
});

export default FavouritesScreen;
