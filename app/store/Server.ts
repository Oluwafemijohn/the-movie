import { AxiosResponse } from "axios";
import {
  useQuery,
  useInfiniteQuery,
} from "react-query";
import axios from "./axios";

import {
  FETCH_MOVIE_DETAILS_KEY,
  FETCH_MOVIE_LIST_KEY,
  BASE_URL,
  API_KEY,
  FETCH_MOVIE_VIDEO_DETAILS_KEY,
} from "./Constants";


export const fetchMoviesDetails = (id: number) => {
  return useQuery<AxiosResponse<IMoveDetails>>(FETCH_MOVIE_DETAILS_KEY, () => {
    return axios.get(`${BASE_URL}movie/${id}${API_KEY}`);
  });
};

export const fetchVideosDetails = (movie_id: number) => {
  const endpoint = `${BASE_URL}movie/${movie_id}/videos${API_KEY}`;
  return useQuery<AxiosResponse<VideoResponse>>(
    FETCH_MOVIE_VIDEO_DETAILS_KEY,
    () => {
      return axios.get(endpoint);
    }
  );
};
