import React, { useState, useRef, RefObject } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { fetchMovies, fetchMovies2 } from "../store/Server";
import defaultStyle from "../store/defaultStyle";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import { API_KEY, BASE_URL, img_300 } from "../store/Constants";
import axios, { AxiosResponse } from "axios";

// const initialData =AxiosResponse<IMovieListResponseType, any> | undefined
function MovieListScreen(props: any) {
  const [page, setPage] = useState(1);
  // const [data, setData] = useState([]);
  const[content, setContent] = useState<IMovieListResponseType>()
  // const{ data, isLoading, error} = fetchMovies2(1);
  

   const fetchMovies2 = () => {
    // return useQuery<AxiosResponse<IMovieListResponseType>>(FETCH_MOVIE_LIST_KEY, () => {
      // return 
      axios.get(`${BASE_URL}discover/movie${API_KEY}&page=${page}`)
      .then((response) => {
        setContent({...content, ...response?.data})
      })
    // });
  };
  


  let scrollRef = useRef<FlatList<any>>(null);
  let screenRef: FlatList<IMovieList> | null;
  // const scrollRef = useRef<ScrollView>();
  // console.log(response);

  // const { data: response, fetchNextPage } = fetchMovies();
  React.useEffect(() => {
    // setData(response?.pages[response?.pages.length - 1].results);
    // setData(response?.pages);
    fetchMovies2()
    // console.log("pages", response?.pages.length);
    // console.log(response?.pageParams)
  }, [page]);

  // React.useEffect(() => {
  //   scrollRef.current?.scrollToOffset({
  //     // y: 0,
  //     // animated: true,
  //     animated: true,
  //     offset: 0
  //   });
  // }, [data]);

  // setData(response.data?.data.results)
  // let response = fetchMovies(null);
  // let page = 0
  // setDataState(data)
  let callCount = 0;
  return (
    <View style={styles.container}>
      {/* <ScrollView > */}
      <FlatList
        ref={(ref) => {
          // scrollRef = ref as unknown as RefObject<FlatList>;
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
          // fetchNextPage();
          // callCount++;
          // console.log("Callcount", callCount);
          // scrollRef.current?.scrollToOffset({
          //   // y: 0,
          //   // animated: true,
          //   animated: true,
          //   offset: 0
          // });

          setPage(page + 1);
          // response2 = fetchMovies2(page);

          screenRef.scrollToOffset({
            offset: 0,
            // animated: true,
          });
          // fetchResp(page);
        }}
      />
      {/* </ScrollView> */}
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
    fontSize: WP(4),
  },
  image: {
    width: "100%",
    height: WP(50),
  },
});

export default MovieListScreen;
