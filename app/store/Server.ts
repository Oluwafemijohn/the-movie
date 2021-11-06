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

// const api = async (key: any, page: number = 1) => {
//   const res = await axios.get(
//     `${BASE_URL}discover/movie${API_KEY}&page=${page}`
//   );
//   //   console.log("api", res.data);
//   return res.data;
// };
// export const fetchMovies = () => {
//   return useInfiniteQuery(
//     FETCH_MOVIE_LIST_KEY,
//     async ({ pageParam = 1 }) => {
//       const res = await axios.get(
//         `${BASE_URL}discover/movie${API_KEY}&page=${pageParam}`
//       );
//       // console.log('page param', pageParam)
//       return res;
//     },
//     {
//       getNextPageParam: (lastPage: any) => {
//         console.log("last page", lastPage.page);
//         return lastPage.page < 500 ? lastPage.page + 1 : false;
//       },
//     }
//   );
// };

// export const fetchMovies2 = (page: number) => {
//   return useQuery<AxiosResponse<IMovieListResponseType>>(FETCH_MOVIE_LIST_KEY, () => {
//     return axios.get(`${BASE_URL}discover/movie${API_KEY}&page=${page}`);
//   });
// };

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
