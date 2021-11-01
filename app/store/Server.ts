import { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "./axios";

import {
  FETCH_MOVIE_DETAILS_KEY,
  FETCH_MOVIE_LIST_KEY,
  MOVIE_ENDPOINT_WITH_TOKEN,
} from "./Constants";

export const fetchMovies = () => {
  return useQuery<AxiosResponse<IMovieListResponseType>>(
    FETCH_MOVIE_LIST_KEY,
    () => {
      return axios.get(MOVIE_ENDPOINT_WITH_TOKEN);
    }
  );
};
export const fetchMoviesDetails = () => {
  return axios.get(FETCH_MOVIE_DETAILS_KEY);
};
